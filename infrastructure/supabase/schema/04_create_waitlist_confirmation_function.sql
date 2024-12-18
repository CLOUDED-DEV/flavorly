-- Enable the HTTP extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Create function to send confirmation email
CREATE OR REPLACE FUNCTION public.handle_waitlist_signup()
RETURNS TRIGGER AS $$
DECLARE
  response_status INT;
  response_body TEXT;
BEGIN
  -- Make HTTP POST request to Resend API
  SELECT
    status,
    content::TEXT
  INTO
    response_status,
    response_body
  FROM
    http.post(
      'https://api.resend.com/emails',
      jsonb_build_object(
        'from', 'Flavorly <waitlist@flavorly.app>',
        'to', NEW.email,
        'subject', 'Welcome to Flavorly''s Waitlist!',
        'html', FORMAT(
          E'<!DOCTYPE html>\n' ||
          '<html>\n' ||
          '<head>\n' ||
          '  <meta charset="utf-8">\n' ||
          '  <title>Welcome to Flavorly</title>\n' ||
          '</head>\n' ||
          '<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">\n' ||
          '  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">\n' ||
          '    <h1 style="color: #fe7f2d;">Welcome to Flavorly!</h1>\n' ||
          '    <p>Hi %s,</p>\n' ||
          '    <p>Thank you for joining our waitlist! We''re excited to have you as part of our growing community of food enthusiasts.</p>\n' ||
          '    <p>As a waitlist member, you''ll be among the first to:</p>\n' ||
          '    <ul>\n' ||
          '      <li>Access our platform when we launch</li>\n' ||
          '      <li>Discover unique local dining experiences</li>\n' ||
          '      <li>Connect with food trucks, restaurants, and private chefs</li>\n' ||
          '    </ul>\n' ||
          '    <p>We''ll keep you updated on our progress and let you know as soon as we''re ready to launch.</p>\n' ||
          '    <p>Best regards,<br>The Flavorly Team</p>\n' ||
          '  </div>\n' ||
          '</body>\n' ||
          '</html>',
          NEW.name
        )
      )::TEXT,
      jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.resend_api_key')
      )::TEXT
    );

  -- Log the response (optional, good for debugging)
  INSERT INTO public.email_logs (
    email_type,
    recipient,
    status_code,
    response_body,
    created_at
  ) VALUES (
    'waitlist_confirmation',
    NEW.email,
    response_status,
    response_body,
    NOW()
  );

  -- Return the NEW record to complete the trigger
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create email logs table for debugging
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  status_code INT,
  response_body TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_waitlist_signup ON public.users;
CREATE TRIGGER trigger_waitlist_signup
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_waitlist_signup();

-- Add comment
COMMENT ON FUNCTION public.handle_waitlist_signup IS 'Sends a confirmation email when a new user signs up for the waitlist';

-- Create function to set Resend API key
CREATE OR REPLACE FUNCTION admin.set_resend_api_key(api_key TEXT)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.resend_api_key', api_key, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
