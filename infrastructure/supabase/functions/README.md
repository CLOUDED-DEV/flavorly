# Flavorly Supabase Edge Functions

This directory contains the Edge Functions that power Flavorly's waitlist system. These functions are designed to run on Supabase's Edge Functions platform, providing serverless functionality for waitlist management.

## Current Progress (December 13, 2024)

### Achievements

1. Set up basic Edge Functions structure
2. Created initial waitlist-signup function with:
   - Input validation
   - Error handling
   - CORS support
   - Type safety
   - Detailed logging
3. Created SQL schema for users table
4. Implemented database permissions for different roles (anon, authenticated, dashboard_user)
5. Successfully verified table existence in psql
6. Successfully implemented and tested waitlist-signup API:
   - Database connection issues resolved
   - Successful user insertion verified
   - Error handling tested and working
   - CORS functionality confirmed
   - Input validation working as expected

### Previous Issues (Now Resolved)

1. Database Connection Issue:
   - ✅ Edge Function can now successfully connect to users table
   - ✅ Database operations working as expected
   - ✅ Permissions properly configured

2. Environment Configuration:
   - ✅ Local development environment properly configured
   - ✅ Environment variables correctly detected and working
   - ✅ Database connection successful in both local and production environments

### Recent Changes

1. Enhanced Error Logging:
   - Added detailed error object logging
   - Added environment variable verification
   - Added database connection testing
   - Added more context to error messages

2. Authentication Updates:
   - Successfully implemented authentication flow
   - Verified permissions for the users table
   - Confirmed proper key usage

3. Documentation:
   - Added detailed local development instructions
   - Added troubleshooting section
   - Updated environment variable handling instructions

## Next Steps

1. Email Verification:
   - Design and implement email verification flow
   - Create email templates
   - Set up email service integration

2. Referral System:
   - Design referral tracking schema
   - Implement referral code generation
   - Create referral tracking endpoints

3. Monitoring:
   - Set up error tracking
   - Implement usage analytics
   - Create monitoring dashboard

## Functions Overview

### 1. waitlist-signup

Handles new user signups for the waitlist.

- **Endpoint**: `/waitlist-signup`
- **Method**: POST
- **Request Body**:

  ```typescript
  {
    name: string
    email: string
    preferences?: string[]
    creator_interest: boolean
  }
  ```

- **Response**:
  - Success (201):

    ```typescript
    {
      message: string
      data: {
        name: string
        email: string
        creator_interest: boolean
        signup_date: string
      }
    }
    ```

  - Error (400/500):

    ```typescript
    {
      error: string
      details?: string
    }
    ```

## Local Development

### Prerequisites

1. Install Supabase CLI:

   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:

   ```bash
   supabase login
   ```

### Running Locally

1. Start the Supabase services:

   ```bash
   supabase start
   ```

2. Get your project keys:

   ```bash
   supabase status
   ```

   This will show your anon key and service role key.

3. The edge functions env variables are stored in the .env file within the functions folder.  This is standard practice for supabase:

   ```bash
   SUPABASE_URL=your_project_url SUPABASE_ANON_KEY=your_anon_key supabase functions serve
   ```

4. Test the function locally:

   ```bash
   curl -L -X POST 'http://localhost:54321/functions/v1/waitlist-signup' \
     -H 'Authorization: Bearer <insert-bearer-token>' \ 
     -H 'Content-Type: application/json' \
     --data '{
       "name": "Trey User",
       "email": "treyoung12@yahoo.com",
       "preferences": ["Italian", "Food Trucks"],
       "creator_interest": false
     }'
   ```

5. Test the function in prod:

   ```bash
   curl -L -X POST 'https://kkenewikugbzhbeeubcm.supabase.co/functions/v1/waitlist-signup' \
   -H 'Authorization: Bearer <insert-bearer-token> \
   -H 'Content-Type: application/json' \
   --data '{
      "name": "Test User",
      "email": "test2@example.com",
      "preferences": ["Italian", "Food Trucks"],
      "creator_interest": false
   }'
   ```

### Development Workflow

1. Make changes to your function code
2. The development server will automatically detect changes
3. Test your changes using curl or your preferred API client
4. Repeat until satisfied with the implementation

## Deployment

Deploy all functions to production:

```bash
supabase functions deploy
```

Or deploy a specific function:

```bash
supabase functions deploy waitlist-signup
```

## Troubleshooting

### Function Not Found

1. Ensure you've started Supabase services
2. Ensure you're running the functions server
3. Check function directory name matches endpoint
4. Verify port number (default: 54321)

### Database Connection Issues

1. Verify table exists: `\dt public.users` in psql
2. Check permissions: `\d+ public.users` in psql
3. Verify environment variables are correct
4. Check database URL format
5. Try both anon key and service role key

### Authentication Failed

1. Get fresh keys using `supabase status`
2. Use correct key format in Authorization header
3. Verify permissions are properly set

## Next Steps

1. ✅ Resolve database connection issue (Completed)
2. Implement email verification function
3. Implement referral tracking function
4. Set up monitoring and logging
5. Implement client-side integration
