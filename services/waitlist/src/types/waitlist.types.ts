/**
 * Type definitions for the waitlist service
 */

// Main database model representing a waitlist user
export interface WaitlistUser {
    id: string;
    name: string;
    email: string;
    preferences?: string[];
    creator_interest: boolean;
    signup_date: Date;
    verified?: boolean;
}

// Standard response format for waitlist operations
export interface WaitlistResponse {
    success: boolean;
    message: string;
    data?: WaitlistUser;
    error?: string;
}

// Error codes for waitlist operations
export enum WaitlistErrorCodes {
    DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
    INVALID_INPUT = 'INVALID_INPUT',
    DATABASE_ERROR = 'DATABASE_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    VERIFICATION_FAILED = 'VERIFICATION_FAILED'
}

// Environment variables interface
export interface WaitlistConfig {
    supabaseUrl: string;
    supabaseAnonKey: string;
    port: number;
}
