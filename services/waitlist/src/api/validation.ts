import { z } from 'zod';

/**
 * Validation schemas for waitlist API endpoints
 */

// Schema for waitlist signup requests
export const signupSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name must be less than 100 characters'),
    email: z.string()
        .email('Invalid email format')
        .max(255, 'Email must be less than 255 characters'),
    preferences: z.array(z.string())
        .optional(),
    creator_interest: z.boolean()
        .optional()
        .default(false)
});

// Schema for email verification requests
export const verificationSchema = z.object({
    email: z.string()
        .email('Invalid email format'),
    token: z.string()
        .min(1, 'Verification token is required')
});

// Schema for referral requests
export const referralSchema = z.object({
    referrer_email: z.string()
        .email('Invalid referrer email format'),
    referred_email: z.string()
        .email('Invalid referred email format')
});

// Helper function to validate request body against a schema
export const validateRequest = <T extends z.ZodType>(schema: T, data: unknown): z.infer<T> => {
    return schema.parse(data);
};
