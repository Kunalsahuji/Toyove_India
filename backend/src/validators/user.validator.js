import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1, 'First name is required').optional(),
    lastName: z.string().trim().min(1, 'Last name is required').optional(),
    phone: z.string().trim()
      .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
      .optional()
      .or(z.literal('')), // allow empty strings to clear phone
  })
});

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  })
});
