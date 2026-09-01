import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { createLead } from "./db";
import { sendLeadNotificationEmail } from "./_core/email";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const inquiryInput = z.object({
  name: z.string().trim().min(1).max(190),
  business: z.string().trim().max(190).optional(),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().min(1).max(120),
  details: z.string().trim().min(1),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submit: publicProcedure.input(inquiryInput).mutation(async ({ input }) => {
      const saved = await createLead({
        name: input.name,
        business: input.business || null,
        email: input.email,
        phone: input.phone || null,
        service: input.service,
        details: input.details,
      });

      // Fire the notification regardless of whether the DB write landed —
      // a configured mailbox should still hear about the inquiry even if
      // DATABASE_URL isn't set in this environment yet.
      await sendLeadNotificationEmail(input);

      return { success: true, saved } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
