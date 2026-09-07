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
    });
  } catch (error) {
    console.error("[Email] Failed to send visitor auto-reply:", error);
  }
}
