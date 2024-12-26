-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create foodies table
CREATE TABLE IF NOT EXISTS public.foodies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    creator_interest BOOLEAN DEFAULT false,
    signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social media handles table for content creators
CREATE TABLE IF NOT EXISTS public.social_media_handles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    foodie_id UUID NOT NULL REFERENCES public.foodies(id) ON DELETE CASCADE,
    platform VARCHAR(50) CHECK (platform IN ('X', 'Instagram', 'TikTok')),
    handle VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Only allow one handle per platform per user, but allow nulls
    CONSTRAINT unique_platform_per_user UNIQUE NULLS NOT DISTINCT (foodie_id, platform)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_foodies_email ON public.foodies(email);
CREATE INDEX IF NOT EXISTS idx_foodies_creator_interest ON public.foodies(creator_interest);
CREATE INDEX IF NOT EXISTS idx_social_media_foodie_id ON public.social_media_handles(foodie_id);

-- Add comments
COMMENT ON TABLE public.foodies IS 'Table storing waitlist signups for food enthusiasts (app users)';
COMMENT ON COLUMN public.foodies.id IS 'Unique identifier for each foodie';
COMMENT ON COLUMN public.foodies.email IS 'Email address of the foodie';
COMMENT ON COLUMN public.foodies.creator_interest IS 'Whether the user is interested in being a content creator';
COMMENT ON COLUMN public.foodies.signup_date IS 'When the foodie joined the waitlist';

COMMENT ON TABLE public.social_media_handles IS 'Social media handles for content creators';
COMMENT ON COLUMN public.social_media_handles.foodie_id IS 'Reference to the foodie';
COMMENT ON COLUMN public.social_media_handles.platform IS 'Social media platform (X, Instagram, or TikTok)';
COMMENT ON COLUMN public.social_media_handles.handle IS 'Social media handle/username';

-- Grant permissions
ALTER TABLE public.foodies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media_handles ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access to authenticated users" ON public.foodies
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow read access to authenticated users" ON public.social_media_handles
    FOR SELECT TO authenticated
    USING (true);

-- Allow insert access to anonymous users (for waitlist signup)
CREATE POLICY "Allow insert access to anonymous users" ON public.foodies
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow insert access to anonymous users" ON public.social_media_handles
    FOR INSERT TO anon
    WITH CHECK (true);
