import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * Receives Resend's email.received webhook and forwards the message to the
 * team's Gmail inbox. The token in the webhook URL prevents arbitrary callers
 * from using this endpoint to send mail through the domain.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const expectedToken = process.env.RESEND_INBOUND_WEBHOOK_TOKEN;
  const receivedToken = Array.isArray(req.query.token) ? req.query.token[0] : req.query.token;
  if (!expectedToken || receivedToken !== expectedToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const event = req.body as {
    type?: string;
    data?: { email_id?: string };
  };

  if (event.type !== "email.received" || !event.data?.email_id) {
    return res.status(400).json({ error: "Unsupported or incomplete Resend event" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error("[Resend inbound] RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL, or EMAIL_FROM is missing.");
    return res.status(500).json({ error: "Email configuration is incomplete" });
  }

  try {
    const resend = new Resend(apiKey);
    const receivedResponse = await fetch(`https://api.resend.com/emails/receiving/${event.data.email_id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const received = (await receivedResponse.json()) as {
      id?: string;
      from?: string;
      to?: string | string[];
      subject?: string;
      text?: string;
      html?: string;
      message?: string;
    };
    if (!receivedResponse.ok || !received.from) {
      console.error("[Resend inbound] Could not retrieve received email:", received.message);
      return res.status(502).json({ error: "Could not retrieve received email" });
    }

    const body = received.text || received.html || "(No message body)";
    await resend.emails.send({
      to,
      from,
      replyTo: received.from,
      subject: `Forwarded email: ${received.subject || "(no subject)"}`,
      text: [`From: ${received.from}`, `To: ${received.to || ""}`, "", body].join("\n"),
    });

    await resend.emails.send({
      to: received.from,
      from,
      subject: "Thanks for contacting Zorbit Technology",
      text: [
        "Thanks for contacting Zorbit Technology.",
        "",
        "We've received your email and will get back to you within 24 hours.",
      ].join("\n"),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Resend inbound] Failed to forward received email:", error);
    return res.status(500).json({ error: "Could not forward received email" });
  }
}