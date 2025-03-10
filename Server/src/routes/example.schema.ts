import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        username: z.string()
            .min(3, 'Username must be at least 3 characters long')
            .max(50, 'Username cannot exceed 50 characters'),
        email: z.string()
            .email('Invalid email address'),
        wallet: z.string()
            .regex(/^[a-z1-5.]{1,12}$/, 'Invalid WAX wallet address')
    })
});

export const updateUserSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        username: z.string()
            .min(3, 'Username must be at least 3 characters long')
            .max(50, 'Username cannot exceed 50 characters')
            .optional(),
        email: z.string()
            .email('Invalid email address')
            .optional(),
        wallet: z.string()
            .regex(/^[a-z1-5.]{1,12}$/, 'Invalid WAX wallet address')
            .optional()
    })
}); 