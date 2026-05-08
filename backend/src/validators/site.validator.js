import { z } from 'zod';

export const updateStorefrontSettingsSchema = z.object({
  body: z.object({
    announcementMessages: z.array(z.string().trim().min(1).max(160)).min(1).max(10),
  }),
});

export const updatePurchasePopupSettingsSchema = z.object({
  body: z.object({
    enabled: z.boolean().optional(),
    initialDelaySeconds: z.coerce.number().int().min(0).max(600).optional(),
    repeatDelaySeconds: z.coerce.number().int().min(30).max(3600).optional(),
    visibleDurationSeconds: z.coerce.number().int().min(5).max(60).optional(),
    maskNames: z.boolean().optional(),
  }),
});
