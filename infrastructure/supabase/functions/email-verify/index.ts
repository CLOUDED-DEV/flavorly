import { Resend } from "https://cdn.skypack.dev/resend";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

if (!RESEND_API_KEY) {
  throw new Error("NO API KEY SEEN.");
}
const resend = new Resend(RESEND_API_KEY);

export async function sendConfirmationEmail(email: string): Promise<Response> {
  try {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "hello world",
        html: "<strong>it works!</strong>",
      }),
    });

    const resData = await res.json()

    return new Response(
      JSON.stringify({ message: "Email sent successfully", data: resData}),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    console.log("Confirmation email sent to :", email);

  } catch (error: any) {
    console.error("Error sending email:", {
      error: error,
      status: error.status,
      statusText: error.statusText,
      details: error.details,
      hint: error.hint,
      message: error.message,
    });
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}