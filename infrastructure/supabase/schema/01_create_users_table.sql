-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table for waitlist
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    preferences JSONB,  -- Stores array of preferred cuisines or dining styles
    creator_interest BOOLEAN DEFAULT false,  -- Indicates interest in content creation
    signup_date TIMESTAMP DEFAULT NOW()
);

-- Add comment descriptions to table and columns
COMMENT ON TABLE users IS 'Stores waitlist user information for Flavorly platform';
COMMENT ON COLUMN users.id IS 'Unique identifier for each user';
COMMENT ON COLUMN users.name IS 'User''s full name';
COMMENT ON COLUMN users.email IS 'User''s email address (unique)';
COMMENT ON COLUMN users.preferences IS 'JSON array of user''s preferred cuisines or dining styles';
COMMENT ON COLUMN users.creator_interest IS 'Boolean flag indicating if user is interested in being a content creator';
COMMENT ON COLUMN users.signup_date IS 'Timestamp when user signed up for waitlist';

-- Create indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_creator_interest ON users(creator_interest);
