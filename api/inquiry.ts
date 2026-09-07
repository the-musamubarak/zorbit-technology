import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { sendLeadAutoReplyEmail, sendLeadNotificationEmail } from "./_lib/email";

/**
 * POST /api/inquiry
 *
 * Handles the homepage project-inquiry form. Deployed automatically by
 * Vercel as a serverless function — no separate backend hosting needed.
 * Deliberately stateless: nothing is saved to a database, it just sends
 * two emails via Resend (team notification + visitor auto-reply) and
 * returns success/failure.
 */

const inquiryInput = z.object({
  name: z.string().trim().min(1).max(190),
  business: z.string().trim().max(190).optional(),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().min(1).max(120),
  details: z.string().trim().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = inquiryInput.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid submission", details: parsed.error.flatten() });
  }

  const input = {
    name: parsed.data.name,
    business: parsed.data.business || null,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    service: parsed.data.service,
    details: parsed.data.details,
  };

  try {
    // Both emails are best-effort — see email.ts: a missing RESEND_API_KEY
    // just logs a warning rather than throwing, so this still returns
    // success as long as the request itself was valid.
    await Promise.all([sendLeadNotificationEmail(input), sendLeadAutoReplyEmail(input)]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[api/inquiry] Unexpected failure:", error);
    return res.status(500).json({ error: "Something went wrong sending your inquiry." });
  }
}
