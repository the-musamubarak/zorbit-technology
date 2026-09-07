/**
 * Email notifications via Resend. Configure via env vars (see .env.example):
 *   RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL, EMAIL_FROM
 *
 * If RESEND_API_KEY isn't configured, both functions silently no-op (with
 * a console warning) rather than throwing — a missing mail setup should
 * never crash the inquiry endpoint.
 */

export type LeadNotificationInput = {
  name: string;
  business?: string | null;
  email: string;
  phone?: string | null;
  service: string;
  details: string;
};

type ResendEmail = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
};

async function sendResendEmail(email: ResendEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set — emails will be skipped. Set it in your Vercel project's environment variables.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: email.to,
      from: email.from,
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend rejected the email with status ${response.status}`);
  }
}

/** Notifies the Zorbit team that a new inquiry came in. */
export async function sendLeadNotificationEmail(lead: LeadNotificationInput): Promise<void> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!to || !from) {
    console.warn("[Email] LEAD_NOTIFICATION_EMAIL / EMAIL_FROM missing — skipping team notification.");
    return;
  }

  const lines = [
    `Name: ${lead.name}`,
    `Business: ${lead.business || "Not specified"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "Not specified"}`,
    `Service needed: ${lead.service}`,
    "",
    "Project details:",
    lead.details,
  ].join("\n");

  try {
    await sendResendEmail({
      to,
      from,
      replyTo: lead.email,
      subject: `New Zorbit project inquiry — ${lead.name}`,
      text: lines,
    });
  } catch (error) {
    console.error("[Email] Failed to send lead notification:", error);
  }
}

/** Confirms receipt to the person who submitted the inquiry, setting a 24-hour reply expectation. */
export async function sendLeadAutoReplyEmail(lead: LeadNotificationInput): Promise<void> {
  const from = process.env.EMAIL_FROM;
  if (!from) {
    console.warn("[Email] EMAIL_FROM missing — skipping visitor auto-reply.");
    return;
  }

  const firstName = lead.name.trim().split(/\s+/)[0] || lead.name;
  const escapedFirstName = firstName.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] || character);
  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to Zorbit Technology — we've received your project brief and will get back to you within 24 hours.",
    "",
    "Here's a copy of what you sent us:",
    `Service needed: ${lead.service}`,
    lead.details,
    "",
    "If anything changes in the meantime or you'd like to add more detail, just reply directly to this email.",
    "",
    "— Zorbit Technology",
  ].join("\n");

  try {
    await sendResendEmail({
      to: lead.email,
      from,
      subject: "We've received your project inquiry — Zorbit Technology",
      text,
      html: `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;background-color:#000000;color:#FAF7F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:155%;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;">
      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#000000;color:#FAF7F4;">
          <tr><td style="padding:24px 0;">
            <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;">Hi <strong>${escapedFirstName},</strong></p>
            <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;">Thanks for reaching out to <strong>Zorbit Technology.</strong></p>
            <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;">Your enquiry has been received successfully. Our team will review your message and get back to you within <strong>24 hours</strong>.</p>
            <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;">If your request is urgent, you can also reach us directly on <a href="https://wa.me/message/46GKY26SZUWDL1" style="color:rgb(37, 211, 102);text-decoration:underline;font-weight:700;"><strong><u>WhatsApp</u></strong></a> for a faster response.</p>
            <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;">We appreciate your interest in Zorbit Technology and look forward to helping you.</p>
            <h2 style="margin:0;padding:0;font-size:1.8em;line-height:1.44em;padding-top:0.389em;font-weight:600;"><span style="color:#E8571A;"><strong>Zorbit Technology</strong></span><br /><span style="color:#e8571a">Technology. Data. Digital Solutions.</span></h2>
            <img alt="A stylized orange letter Z with a yellow diagonal line is enclosed in a circle against a black background." height="65" src="https://resend-attachments.s3.amazonaws.com/469d08b3-5513-475d-867a-8265aa261834" style="display:block;outline:none;border:none;text-decoration:none;border-radius:8px;" width="65" />
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
    });
  } catch (error) {
    console.error("[Email] Failed to send visitor auto-reply:", error);
  }
}
