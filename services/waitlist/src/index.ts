import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import waitlistRoutes from './api/routes';
import { WaitlistConfig } from './types/waitlist.types';

// Load environment variables
dotenv.config();

// Validate environment variables
const config: WaitlistConfig = {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    port: parseInt(process.env.PORT || '3000', 10)
};

if (!config.supabaseUrl || !config.supabaseAnonKey) {
    throw new Error('Missing required environment variables');
}

// Create Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Apply routes
app.use('/api/waitlist', waitlistRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(config.port, () => {
    console.log(`Waitlist service running on port ${config.port}`);
});

export default app;
