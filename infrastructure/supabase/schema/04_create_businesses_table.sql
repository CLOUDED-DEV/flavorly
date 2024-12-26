-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('Restaurant', 'Food Truck', 'Private Chef', 'Pop-up')),
    city VARCHAR(100) NOT NULL,
    pos_system VARCHAR(50) CHECK (pos_system IN ('Square', 'Toast', 'Clover', 'Other')),
    signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_businesses_email ON public.businesses(email);
CREATE INDEX IF NOT EXISTS idx_businesses_type ON public.businesses(business_type);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON public.businesses(city);

-- Add comments
COMMENT ON TABLE public.businesses IS 'Table storing waitlist signups for food businesses';
COMMENT ON COLUMN public.businesses.id IS 'Unique identifier for each business';
COMMENT ON COLUMN public.businesses.email IS 'Business contact email address';
COMMENT ON COLUMN public.businesses.business_name IS 'Name of the business';
COMMENT ON COLUMN public.businesses.business_type IS 'Type of food business (Restaurant, Food Truck, Private Chef, Pop-up)';
COMMENT ON COLUMN public.businesses.city IS 'City where the business operates';
COMMENT ON COLUMN public.businesses.pos_system IS 'Point of Sale system used by the business';
COMMENT ON COLUMN public.businesses.signup_date IS 'When the business joined the waitlist';

-- Grant permissions
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access to authenticated users" ON public.businesses
    FOR SELECT TO authenticated
    USING (true);

-- Allow insert access to anonymous users (for waitlist signup)
CREATE POLICY "Allow insert access to anonymous users" ON public.businesses
    FOR INSERT TO anon
    WITH CHECK (true);
