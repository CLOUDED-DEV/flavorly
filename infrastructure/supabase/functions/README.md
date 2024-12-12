# Flavorly Supabase Edge Functions

This directory contains the Edge Functions that power Flavorly's waitlist system. These functions are designed to run on Supabase's Edge Functions platform, providing serverless functionality for waitlist management.

## Current Progress (December 11, 2024)

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

### Current Issues

1. Database Connection Issue:
   - Edge Function cannot find the users table ("relation 'public.users' does not exist")
   - Table is visible and accessible via psql
   - Attempted solutions:
     - Using service role key instead of anon key
     - Adding explicit schema reference
     - Verifying environment variables
     - Adding additional error logging
     - Granting permissions to anon role

2. Environment Configuration:
   - Local development environment might be using different database context
   - Need to verify correct URL and key usage
   - Environment variables are being detected but might not be connecting to correct instance

### Recent Changes

1. Enhanced Error Logging:
   - Added detailed error object logging
   - Added environment variable verification
   - Added database connection testing
   - Added more context to error messages

2. Authentication Updates:
   - Tried both anon key and service role key
   - Added explicit schema reference in queries
   - Updated permissions for the users table

3. Documentation:
   - Added detailed local development instructions
   - Added troubleshooting section
   - Updated environment variable handling instructions

## Next Steps

1. Database Connection:
   - Verify database schema and table structure via psql
   - Double-check all permissions
   - Verify connection string format
   - Test with different authentication methods

2. Local Development:
   - Verify local development environment setup
   - Ensure correct database instance is being accessed
   - Test connection with minimal query

3. Documentation:
   - Document all attempted solutions
   - Add detailed troubleshooting guide
   - Update environment setup instructions

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
   curl -i --location --request POST 'http://localhost:54321/functions/v1/waitlist-signup' \
     --header 'Authorization: Bearer <enter-anon-token>' \ 
     --header 'Content-Type: application/json' \
     --data '{
       "name": "Test User",
       "email": "test@example.com",
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

1. Resolve database connection issue
2. Implement email verification function
3. Implement referral tracking function
4. Set up monitoring and logging
5. Implement client-side integration
