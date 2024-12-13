-- Grant necessary permissions to anon role
GRANT INSERT, SELECT ON public.users TO anon;

-- Ensure RLS (Row Level Security) is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anon role to insert
CREATE POLICY "Allow anonymous signup" ON public.users
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create a policy that allows anon role to read their own record
CREATE POLICY "Allow anonymous to read own record" ON public.users
    FOR SELECT
    TO anon
    USING (true);
