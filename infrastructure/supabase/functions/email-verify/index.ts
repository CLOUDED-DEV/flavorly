import { Resend } from "npm:resend@1.0.0";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// CORS headers (moved outside to be accessible everywhere)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "contact@cullinarylocals.com"; // Configurable from email

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is required");
}

const resend = new Resend(RESEND_API_KEY);

interface EmailData {
  email: string;
  name?: string;
}

export async function sendConfirmationEmail({ email }: EmailData): Promise<Response> {
  try {
    // Prepare email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Flavorly Waitlist</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #fe7f2d;">Welcome to Flavorly! 🎉</h1>
            <p>Hi there'},</p>
            <p>Thank you for joining the Flavorly waitlist! We're excited to have you on board.</p>
            <p>Flavorly is a modern dining platform designed to connect you with unique local experiences, from restaurants and food trucks to private chefs and pop-up events.</p>
            <h2 style="color: #619b8a;">What's Next?</h2>
            <ul>
              <li>You'll be among the first to know when we launch</li>
              <li>Get early access to our platform</li>
              <li>Receive exclusive updates about our progress</li>
            </ul>
            <p>Stay tuned for more updates coming your way!</p>
            <p>Best regards,<br>The Flavorly Team</p>
          </div>
        </body>
      </html>
    `;

    console.log("Attempting to send confirmation email to:", email);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "Welcome to Flavorly Waitlist! 🎉",
        html: htmlContent,
      }),
    });

    const resData = await res.json();

    // Check for specific Resend API errors
    if (!res.ok) {
      console.error("Resend API error:", resData);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email",
          details: resData.message || "Unknown error occurred"
        }),
        {
          status: res.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Confirmation email sent successfully to:", email);

    return new Response(
      JSON.stringify({ 
        message: "Email sent successfully", 
        data: resData
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error sending email:", {
      error: error,
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });

    return new Response(
      JSON.stringify({ 
        error: "Failed to send email",
        details: error.message || "Unknown error occurred"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
