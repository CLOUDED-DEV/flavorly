# Flavorly Services Architecture

## Overview

This directory contains the microservices that power the Flavorly platform. Each service is designed to be independently deployable, maintainable, and scalable, focusing on specific business domains within the application.

---

## Important Update: Migration to Supabase Edge Functions

After evaluation, we've decided to migrate our services to Supabase Edge Functions for:

1. Cost efficiency (500,000 invocations free per month)
2. Simplified deployment and maintenance
3. Automatic scaling
4. Better integration with Supabase infrastructure

### Migration Plan

Current services will be converted to Edge Functions following this structure:

```
/supabase/functions/
├── waitlist-signup/
│   └── index.ts
├── waitlist-verify/
│   └── index.ts
└── waitlist-referral/
    └── index.ts
```

### Key Changes

- Runtime: Moving from Node.js to Deno
- Structure: Single-file functions vs multi-file services
- Dependencies: URL imports vs npm packages
- Deployment: Supabase CLI vs traditional deployment

### Preserved Features

- All validation schemas
- Error handling patterns
- TypeScript types
- Response formats

---

## Services Structure

### Current Services

1. **Notification Service** (`/notification`)
   - Handles all platform notifications
   - Email, push notifications, in-app alerts

2. **Profile Service** (`/profile`)
   - User profile management
   - Preference settings
   - Account information

3. **Reservations Service** (`/reservations`)
   - Booking management
   - Scheduling
   - Availability tracking

4. **Search Service** (`/search`)
   - Search functionality
   - Filtering
   - Discovery features

5. **Waitlist Service** (`/waitlist`)
   - Waitlist management
   - User signup processing
   - Email verification
   - Referral tracking
   - Implemented endpoints:
     - POST /signup - Join waitlist
     - POST /verify - Verify email
     - POST /referral - Handle referrals

---

## Service Architecture Standards

### Directory Structure

Each service follows a consistent structure:

```
service-name/
├── src/
│   ├── api/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   └── validation.ts
│   ├── service/
│   │   └── service-name.service.ts
│   └── types/
│       └── service-name.types.ts
├── tests/
└── README.md
```

Note: This structure will be replaced by Edge Functions structure after migration.

### Development Guidelines

1. **API Design**
   - RESTful endpoints
   - Consistent error handling
   - Input validation
   - Swagger/OpenAPI documentation

2. **Service Independence**
   - Minimal cross-service dependencies
   - Service-specific databases when necessary
   - Independent deployment capability

3. **Testing Requirements**
   - Unit tests for business logic
   - Integration tests for API endpoints
   - Minimum 80% code coverage

4. **Documentation**
   - Service-level README
   - API documentation
   - Setup instructions

---

## Infrastructure Integration

### Database

- Primary: Supabase
- Service-specific schemas
- Proper indexing for performance

### Authentication

- Centralized auth through Supabase
- Service-level authorization

### Monitoring

- Logging standards
- Performance metrics
- Error tracking

---

## Development Progress

### Completed

1. Initial service architecture setup
2. Waitlist service database schema
3. Basic service structure templates
4. Waitlist service implementation
   - Database schema
   - API endpoints
   - Input validation
   - Error handling
   - Supabase integration

### In Progress

1. Migration to Supabase Edge Functions
   - Converting waitlist service
   - Setting up new deployment process
   - Testing Edge Function performance

### Planned

1. Complete Edge Functions migration
2. Set up monitoring for Edge Functions
3. Document Edge Functions patterns
4. Migrate remaining services

---

## Changelog

### 2024-12-09

- Created services architecture documentation
- Established service structure standards
- Initialized waitlist service
  - Created service directory structure
  - Implemented database schema in Supabase
  - Set up basic file structure for API endpoints
- Implemented waitlist service
  - Created TypeScript configuration
  - Set up Express server with middleware
  - Implemented input validation using Zod
  - Created service layer with Supabase integration
  - Added error handling and types
  - Set up environment configuration
- Made architectural decision to migrate to Supabase Edge Functions
  - Evaluated costs and benefits
  - Planned migration strategy
  - Documented new architecture approach

---

## Next Steps

1. ✅ Define service architecture standards
2. ✅ Create initial service documentation
3. ✅ Implement waitlist service
4. 🔄 Migrate waitlist service to Edge Functions:
   - Convert signup endpoint
   - Convert verify endpoint
   - Convert referral endpoint
   - Test all endpoints
5. Document Edge Functions patterns and best practices
6. Set up monitoring for Edge Functions
7. Plan migration for remaining services

---

## Questions or Concerns?

If there are questions, please ask the user who invoked you to read this README.
