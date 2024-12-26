# Flavorly Waitlist and Signup Flow Development

## Overview

This document outlines the process for designing and developing the **Waitlist and Signup Flow** for Flavorly using **React Native**. It includes planning, technical requirements, database schema, and implementation steps to ensure a seamless user experience.

---

## Development Process

### 1. Planning and Design
  
- **Flow:**
  - **Screen 1:** Splash screen (Welcome message, CTA for "Join Waitlist").
  - **Screen 2:** Signup form (Name, email, optional preferences).
  - **Screen 3:** Benefits screen (Perks of signing up).
  - **Screen 4:** Confirmation screen (Thank you message, social sharing option).

- **Reusable Components:**
  - Buttons, Input Fields, Modals, Cards.

---

## Database Schema

### Users Table

| **Column Name**    | **Data Type**      | **Description**                                  | **Constraints**              |
|---------------------|--------------------|--------------------------------------------------|------------------------------|
| `id`               | `UUID`            | Unique identifier for each user.                | Primary Key, Default `uuid_generate_v4()` |
| `name`             | `VARCHAR(100)`    | User's full name.                               | NOT NULL                     |
| `email`            | `VARCHAR(255)`    | User's email address.                           | UNIQUE, NOT NULL             |
| `preferences`      | `JSONB`           | Array of preferred cuisines or dining styles.   | NULLABLE                     |
| `creator_interest` | `BOOLEAN`         | Indicates if user is interested in content creation. | Default `false`             |
| `signup_date`      | `TIMESTAMP`       | Date and time the user signed up.               | Default `NOW()`              |

### Indexes

- `email`: For fast email lookups.
- `creator_interest`: For querying content creators easily.

---

## Backend Integration

### APIs Implemented

- **Signup API:**
  - ✅ Successfully implemented and tested
  - Endpoint: **POST `/waitlist-signup`**
  - Description: Stores user data in the database and triggers confirmation email.
  - Input:

    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "preferences": ["Italian", "Food Trucks"],
      "creator_interest": true
    }
    ```

  - Output Success (201):

    ```json
    {
      "message": "Successfully joined waitlist",
      "data": {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "creator_interest": true,
        "signup_date": "2024-01-10T12:00:00Z"
      }
    }
    ```

  - Output Error (400/500):

    ```json
    {
      "error": "Error message",
      "details": "Optional error details"
    }
    ```

### Email Integration

- **Service**: Resend.com
  - ✅ Successfully implemented and tested
  - Modern email API with good deliverability
  - Free tier includes 3,000 emails/month
  - Built-in analytics and tracking

#### Email Features

- **Trigger**: Automatic email sent when user joins waitlist
- **Template**: HTML email with:
  - Welcome message with personalized name
  - Confirmation of signup
  - Platform benefits overview
  - Next steps information
  - Flavorly branding with custom styling
- **Tracking**: Edge function logs email send attempts and results

#### Implementation Details

1. ✅ Email verification function created
2. ✅ Integration with waitlist signup completed
3. ✅ HTML template designed with Flavorly branding
4. ✅ Error handling and logging implemented
5. ✅ Testing completed in both local and production environments

---

## Timeline

| **Week** | **Task**                                              | **Status**    |
|----------|-------------------------------------------------------|---------------|
| Week 1   | Finalize designs, wireframes, and backend API specs.  | ✅ Complete   |
| Week 2   | Build Splash and Signup screens.                     | In Progress  |
| Week 3   | Develop Benefits and Confirmation screens.           | Pending      |
| Week 4   | Integrate APIs, styling, and finalize UX polish.     | Pending      |
| Week 5   | Testing and feedback iteration.                      | Pending      |
| Week 6   | Deploy pre-alpha version for testing.                | Pending      |

---

## Key Libraries/Tools

- **Frontend:**
  - `react-navigation`: Navigation flow.
  - `react-native-paper`: Pre-styled components.
  - `axios`: API requests.
- **Backend:**
  - ✅ Supabase for authentication and database (Implemented)
  - ✅ Resend.com for email delivery (Implemented)
- **Testing:**
  - Jest and React Native Testing Library.
- **Analytics:**
  - Google Analytics or Supabase.

---

## Next Steps

1. ✅ Start the creation of the `users` table in Supabase. (Completed: SQL schema created in infrastructure/supabase/schema/01_create_users_table.sql)
2. ✅ Develop API endpoints for signup and user data storage. (Completed: waitlist-signup endpoint implemented and tested)
3. ✅ Implement automatic confirmation emails. (Completed: Edge function created with Resend.com integration)
4. Begin component structure planning for React Native development.
5. Set up analytics tracking.

---

## Changelog

### 2024-12-18 

- ✅ Completed email verification implementation
  - Created email verification edge function
  - Integrated with waitlist signup flow
  - Implemented HTML email template with Flavorly branding
  - Added comprehensive error handling and logging
  - Tested in both local and production environments

### 2024-12-13 (Afternoon)

- Implemented automatic confirmation emails
  - Created edge function for email sending
  - Added Resend.com integration
  - Created HTML email template

### 2024-12-13 (Morning)

- Successfully implemented and tested waitlist-signup API endpoint
  - Verified database connection and operations
  - Implemented comprehensive error handling
  - Added input validation
  - Confirmed CORS functionality
  - Tested in both local and production environments

### 2024-12-10

- Created SQL schema for users table
  - Added table creation script in infrastructure/supabase/schema/01_create_users_table.sql
  - Implemented all required fields: id, name, email, preferences, creator_interest, signup_date
  - Added appropriate indexes for email and creator_interest
  - Included detailed table and column comments
