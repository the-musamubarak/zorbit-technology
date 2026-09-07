import type { VercelRequest, VercelResponse } from "@vercel/node";
/**
 * POST /api/inquiry
 *
 * Handles the homepage project-inquiry form. Deployed automatically by
 * Vercel as a serverless function — no separate backend hosting needed.
 * Deliberately stateless: nothing is saved to a database, it just sends
 * two emails via Resend (team notification + visitor auto-reply) and
 * returns success/failure.
 */

function readString(value: unknown, maxLength: number, required = false): string | undefined {
  if (typeof value !== "string") return required ? undefined : "";
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength ? trimmed : undefined;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body && typeof req.body === "object" ? req.body as Record<string, unknown> : {};
  const name = readString(body.name, 190, true);
  const business = readString(body.business, 190);
  const email = readString(body.email, 320, true);
  const phone = readString(body.phone, 40);
  const service = readString(body.service, 120, true);
  const details = readString(body.details, 10000, true);
  if (!name || !email || !isValidEmail(email) || !service || !details) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  const input = {
    name,
    business: business || null,
    email,
    phone: phone || null,
    service,
    details,
  };

  try {
    // Both emails are best-effort — see email.ts: a missing RESEND_API_KEY
    // just logs a warning rather than throwing, so this still returns
    // success as long as the request itself was valid.
    const { sendLeadAutoReplyEmail, sendLeadNotificationEmail } = await import("./_lib/email");
    await Promise.all([sendLeadNotificationEmail(input), sendLeadAutoReplyEmail(input)]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[api/inquiry] Unexpected failure:", error);
    return res.status(500).json({ error: "Something went wrong sending your inquiry." });
  }
}
