// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {config} from "https://deno.land/x/dotenv/mod.ts"
import {sendConfirmationEmail} from "../email-verify/index.ts"

interface BusinessSignupRequest {
  email: string
  business_name: string
  business_type: 'Restaurant' | 'Food Truck' | 'Private Chef' | 'Pop-up'
  pos_system?: 'Square' | 'Toast' | 'Clover' | 'Other'
}

// Get environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

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

    // Parse request body
    const body: BusinessSignupRequest = await req.json()

    // Validate required fields
    if (!body.email?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!body.business_name?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Business name is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!body.business_type) {
      return new Response(
        JSON.stringify({ error: 'Business type is required' }),
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

    // Insert business data
    const { data: business, error: businessError } = await supabaseClient
      .from('businesses')
      .insert([{
        email: body.email.toLowerCase().trim(),
        business_name: body.business_name.trim(),
        business_type: body.business_type,
        pos_system: body.pos_system
      }])
      .select()
      .single()

    if (businessError) {
      console.error('Insert error details:', {
        error: businessError,
        code: businessError.code,
        status: businessError.status,
        statusText: businessError.statusText,
        details: businessError.details,
        hint: businessError.hint,
        message: businessError.message
      })

      // Check for duplicate email error
      if (businessError.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Email already registered' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Handle other database errors
      throw new Error(`Database operation failed: ${businessError.message || 'Unknown error'}`)
    }

    // Send confirmation email
    const emailResponse = await sendConfirmationEmail({ 
      email: business.email,
      name: business.business_name // Include business name in email
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
          email: business.email,
          business_name: business.business_name,
          business_type: business.business_type,
          pos_system: business.pos_system,
          signup_date: business.signup_date
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

  curl -i --location --request POST 'http://localhost:54321/functions/v1/business-signup' \
    --header 'Authorization: Bearer your-anon-key-here' \
    --header 'Content-Type: application/json' \
    --data '{
      "email": "business@example.com",
      "business_name": "Food Truck Example",
      "business_type": "Food Truck",
      "pos_system": "Square"
    }'

*/
