import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id');

const categoryPayload = {
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(160).optional(),
  parentCategory: objectId.nullable().optional(),
  description: z.string().trim().max(1000).optional().or(z.literal('')),
  bannerImage: z.object({
    url: z.string().url().optional().or(z.literal('')),
    publicId: z.string().optional().or(z.literal('')),
    alt: z.string().optional().or(z.literal('')),
  }).optional(),
  icon: z.string().trim().optional().or(z.literal('')),
  sortOrder: z.number().int().min(0).optional(),
  showInNavbar: z.boolean().optional(),
  showInAllCategories: z.boolean().optional(),
  isActive: z.boolean().optional(),
  seoTitle: z.string().trim().max(160).optional().or(z.literal('')),
  seoDescription: z.string().trim().max(220).optional().or(z.literal('')),
};

export const createCategorySchema = z.object({
  body: z.object(categoryPayload),
});

export const updateCategorySchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object(categoryPayload).partial(),
});

export const categoryIdParamSchema = z.object({
  params: z.object({ id: objectId }),
});

export const toggleNavbarSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    showInNavbar: z.boolean(),
  }),
});

export const reorderCategoriesSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      id: objectId,
      sortOrder: z.number().int().min(0),
    })).min(1),
  }),
});
