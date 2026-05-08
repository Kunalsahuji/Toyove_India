import { z } from 'zod';

export const createContactMessageSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email(),
    phone: z.string().trim().max(20).optional().or(z.literal('')),
    subject: z.string().trim().min(3).max(120),
    message: z.string().trim().min(5).max(2000),
    type: z.enum(['contact', 'support', 'newsletter']).optional(),
  }),
});

export const messageStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id'),
  }),
  body: z.object({
    status: z.enum(['Unread', 'Read', 'Closed']),
  }),
});
