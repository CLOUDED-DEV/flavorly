// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {config} from "https://deno.land/x/dotenv/mod.ts"
import {sendConfirmationEmail} from "../email-verify/index.ts"

interface SocialMediaHandle {
  platform: 'X' | 'Instagram' | 'TikTok'
  handle: string
}

interface SignupRequest {
  email: string
  creator_interest: boolean
  social_media?: SocialMediaHandle[]
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

    // Validate email
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

    // Validate social media handles if creator_interest is true
    if (body.creator_interest && (!body.social_media || body.social_media.length === 0)) {
      return new Response(
        JSON.stringify({ error: 'Social media handles are required for content creators' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create Supabase client
    console.log('Creating Supabase client...')
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

    // Start a transaction
    const { data: foodie, error: foodieError } = await supabaseClient
      .from('foodies')
      .insert([{
        email: body.email.toLowerCase().trim(),
        creator_interest: !!body.creator_interest,
      }])
      .select()
      .single()

    if (foodieError) {
      console.error('Insert error details:', {
        error: foodieError,
        code: foodieError.code,
        status: foodieError.status,
        statusText: foodieError.statusText,
        details: foodieError.details,
        hint: foodieError.hint,
        message: foodieError.message
      })

      // Check for duplicate email error
      if (foodieError.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Email already registered' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Handle other database errors
      throw new Error(`Database operation failed: ${foodieError.message || 'Unknown error'}`)
    }

    // If creator_interest is true, insert social media handles
    if (body.creator_interest && body.social_media && body.social_media.length > 0) {
      const socialMediaData = body.social_media.map(handle => ({
        foodie_id: foodie.id,
        platform: handle.platform,
        handle: handle.handle
      }))

      const { error: socialError } = await supabaseClient
        .from('social_media_handles')
        .insert(socialMediaData)

      if (socialError) {
        console.error('Social media insert error:', socialError)
        // Continue with success response but log the social media insert failure
      }
    }

    // Send confirmation email
    const emailResponse = await sendConfirmationEmail({ 
      email: foodie.email
    });

    // Check if email sending failed
    if (emailResponse.status !== 201) {
      console.error('Failed to send confirmation email:', await emailResponse.json());
      // Continue with success response but log the email failure
    }

    // Return success response
    return new Response(
      JSON.stringify({
        message: 'Successfully joined waitlist',
        data: {
          email: foodie.email,
          creator_interest: foodie.creator_interest,
          signup_date: foodie.signup_date
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
      "email": "test@example.com",
      "creator_interest": true,
      "social_media": [
        {
          "platform": "Instagram",
          "handle": "foodie_test"
        }
      ]
    }'

*/
