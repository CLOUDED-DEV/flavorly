import { Request, Response } from 'express';
import { WaitlistService } from '../service/waitlist.service';
import { validateRequest, signupSchema, verificationSchema, referralSchema } from './validation';

export class WaitlistController {
    private waitlistService: WaitlistService;

    constructor() {
        this.waitlistService = new WaitlistService();
    }

    /**
     * Handle waitlist signup
     */
    signup = async (req: Request, res: Response) => {
        try {
            // Validate request body
            const validatedData = validateRequest(signupSchema, req.body);

            // Process signup
            const result = await this.waitlistService.createUser(validatedData);

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(201).json(result);
        } catch (error) {
            console.error('Signup error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to process signup',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    /**
     * Handle email verification
     */
    verifyEmail = async (req: Request, res: Response) => {
        try {
            // Validate request body
            const validatedData = validateRequest(verificationSchema, req.body);

            // Process verification
            const result = await this.waitlistService.verifyEmail(
                validatedData.email,
                validatedData.token
            );

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error('Verification error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to verify email',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    /**
     * Handle referral
     */
    handleReferral = async (req: Request, res: Response) => {
        try {
            // Validate request body
            const validatedData = validateRequest(referralSchema, req.body);

            // Process referral
            const result = await this.waitlistService.handleReferral(
                validatedData.referrer_email,
                validatedData.referred_email
            );

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error('Referral error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to process referral',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}
