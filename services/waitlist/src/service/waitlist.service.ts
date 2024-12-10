import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WaitlistErrorCodes } from '../types/waitlist.types';

export class WaitlistService {
    private supabase: SupabaseClient;

    constructor() {
        // Initialize Supabase client
        this.supabase = createClient(
            process.env.SUPABASE_URL || '',
            process.env.SUPABASE_ANON_KEY || ''
        );
    }

    /**
     * Create a new waitlist user
     */
    async createUser(userData: {
        name: string;
        email: string;
        preferences?: string[];
        creator_interest?: boolean;
    }) {
        try {
            // Check if user already exists
            const { data: existingUser } = await this.supabase
                .from('users')
                .select('email')
                .eq('email', userData.email)
                .single();

            if (existingUser) {
                throw new Error(WaitlistErrorCodes.DUPLICATE_EMAIL);
            }

            // Insert new user
            const { data, error } = await this.supabase
                .from('users')
                .insert([{
                    name: userData.name,
                    email: userData.email,
                    preferences: userData.preferences || [],
                    creator_interest: userData.creator_interest || false,
                    signup_date: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) throw error;

            return {
                success: true,
                message: 'Successfully joined waitlist',
                data
            };
        } catch (error) {
            if (error instanceof Error) {
                return {
                    success: false,
                    message: 'Failed to join waitlist',
                    error: error.message
                };
            }
            return {
                success: false,
                message: 'An unexpected error occurred',
                error: WaitlistErrorCodes.DATABASE_ERROR
            };
        }
    }

    /**
     * Verify user's email
     */
    async verifyEmail(email: string, token: string) {
        try {
            // In a real implementation, we would:
            // 1. Verify the token against stored token
            // 2. Update user's verification status
            // 3. Handle token expiration

            const { data, error } = await this.supabase
                .from('users')
                .update({ verified: true })
                .eq('email', email)
                .select()
                .single();

            if (error) throw error;

            return {
                success: true,
                message: 'Email verified successfully',
                data
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to verify email',
                error: WaitlistErrorCodes.VERIFICATION_FAILED
            };
        }
    }

    /**
     * Handle referral
     */
    async handleReferral(referrerEmail: string, referredEmail: string) {
        try {
            // In a real implementation, we would:
            // 1. Verify both emails exist
            // 2. Create referral record
            // 3. Update referral counts/points

            const { data, error } = await this.supabase
                .from('users')
                .select('email')
                .eq('email', referrerEmail)
                .single();

            if (error || !data) {
                throw new Error(WaitlistErrorCodes.NOT_FOUND);
            }

            // Additional referral logic would go here

            return {
                success: true,
                message: 'Referral recorded successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to process referral',
                error: WaitlistErrorCodes.DATABASE_ERROR
            };
        }
    }
}
