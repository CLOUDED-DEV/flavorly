import { Router } from 'express';
import { WaitlistController } from './controller';

const router = Router();
const waitlistController = new WaitlistController();

// Waitlist routes
router.post('/signup', waitlistController.signup);
router.post('/verify', waitlistController.verifyEmail);
router.post('/referral', waitlistController.handleReferral);

export default router;
