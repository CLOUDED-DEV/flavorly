// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {config} from "https://deno.land/x/dotenv/mod.ts"
import {sendConfirmationEmail} from "../email-verify/index.ts"

interface SignupRequest {
  name: string
  email: string
  preferences?: string[]
  creator_interest: boolean
}

// Get environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

// // Log environment status and values for local testing (uncomment for local testing)
// console.log('Environment Check:')
// console.log('SUPABASE_URL exists:', supabaseUrl)
// console.log('SUPABASE_ANON_KEY exists:', supabaseAnonKey)

Deno.serve(async (req) => {
  try {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // // Check for required environment variables (uncomment for local testing)
    // if (!supabaseUrl || !supabaseAnonKey) {
    //   throw new Error('Missing required environment variables')
    // }

    // Parse request body
    const body: SignupRequest = await req.json()
    // console.log('Request body:', body) (uncomment for local testing)

    // Validate required fields (name and email)
    if (!body.name || !body.name.trim()) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!body.email || !body.email.trim()) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create Supabase client
    console.log('Creating Supabase client...')
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

    // Verify database connection
    console.log('Verifying database connection...')
    const { data: testData, error: testError } = await supabaseClient
      .from('users')
      .select('*')

    if (testError) {
      console.error('Database connection test failed:', {
        error: testError,
        status: testError.status,
        statusText: testError.statusText,
        details: testError.details,
        hint: testError.hint,
        message: testError.message
      })
      throw new Error(`Database connection failed: ${testError.message}`)
    }

    console.log('Database connection verified')

    // Prepare user data
    const userData = {
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      preferences: body.preferences || [],
      creator_interest: !!body.creator_interest,
      signup_date: new Date().toISOString()
    }

    console.log('Attempting to insert user data:', userData)

    // Insert into users table
    const { data, error } = await supabaseClient
      .from('users')
      .insert([userData])
      .select()
      .single()

    if (error) {
      console.error('Insert error details:', {
        error: error,
        code: error.code,
        status: error.status,
        statusText: error.statusText,
        details: error.details,
        hint: error.hint,
        message: error.message
      })

      // Check for duplicate email error
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Email already registered' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Handle other database errors
      throw new Error(`Database operation failed: ${error.message || 'Unknown error'}`)
    }

    console.log('Insert successful:', data)

    // Insert email verification logic here.
    


    // Return success response
    return new Response(
      JSON.stringify({
        message: 'Successfully joined waitlist',
        data: {
          name: data.name,
          email: data.email,
          creator_interest: data.creator_interest,
          signup_date: data.signup_date
        }
      }),
      { 
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error: any) {
    // Log unexpected errors with full details
    console.error('Unexpected error details:', {
      error: error,
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })

    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message || 'Unknown error occurred'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. In another terminal, run:
     SUPABASE_URL=your_project_url SUPABASE_ANON_KEY=your_anon_key supabase functions serve

  3. Make an HTTP request using your anon key as the Bearer token:

  curl -i --location --request POST 'http://localhost:54321/functions/v1/waitlist-signup' \
    --header 'Authorization: Bearer your-anon-key-here' \
    --header 'Content-Type: application/json' \
    --data '{
      "name": "Test User",
      "email": "test@example.com",
      "preferences": ["Italian", "Food Trucks"],
      "creator_interest": false
    }'

*/
