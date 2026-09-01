import nodemailer from "nodemailer";

/**
 * Minimal SMTP-based email notifier used to alert the team when a new
 * project inquiry comes in. Configure via env vars (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, LEAD_NOTIFICATION_EMAIL
 *
 * If SMTP isn't configured, this silently no-ops (with a console warning)
 * rather than throwing — a missing mail setup should never block a lead
 * from being saved to the database.
 */

let _transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
let _attemptedInit = false;

function getTransporter() {
  if (_attemptedInit) return _transporter;
  _attemptedInit = true;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[Email] SMTP not configured — lead notifications will be skipped. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your environment.",
    );
    return null;
  }

  _transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return _transporter;
}

export type LeadNotificationInput = {
  name: string;
  business?: string | null;
  email: string;
  phone?: string | null;
  service: string;
  details: string;
};

export async function sendLeadNotificationEmail(lead: LeadNotificationInput): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;

  const to = process.env.LEAD_NOTIFICATION_EMAIL || process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!to || !from) {
    console.warn("[Email] LEAD_NOTIFICATION_EMAIL / SMTP_FROM missing — skipping notification.");
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
    await transporter.sendMail({
      to,
      from,
      replyTo: lead.email,
      subject: `New Zorbit project inquiry — ${lead.name}`,
      text: lines,
    });
  } catch (error) {
    // A failed notification email should never fail the lead submission —
    // the lead is already saved in the database by this point.
    console.error("[Email] Failed to send lead notification:", error);
  }
}
