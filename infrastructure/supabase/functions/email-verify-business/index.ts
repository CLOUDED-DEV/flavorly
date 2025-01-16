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
            <p>Hello!</p>
            <p>Thank you for joining the Flavorly waitlist as a valued business partner! We're thrilled to have you on this journey with us.</p>
            <p>Flavorly is a modern dining platform that helps businesses like yours connect with customers in new and exciting ways—whether you're a restaurant, food truck, private chef, or pop-up venue.</p>
            <h2 style="color: #619b8a;">What Does This Mean for Your Business?</h2>
            <ul>
                <li>Reach new customers who are eager to discover unique dining experiences</li>
                <li>Streamline your operations with simple reservation tools</li>
                <li>Promote your business and grow your brand through our platform</li>
            </ul>
            <p>We’re hard at work putting the finishing touches on Flavorly, and as an early sign-up, you’ll receive exclusive updates and be among the first to access our tools and features.</p>
            <p>Stay tuned for more updates coming your way soon!</p>
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
