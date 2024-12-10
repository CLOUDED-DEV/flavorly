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

## Backend API Integration

### APIs Needed

- **Signup API:**
  - Endpoint: **POST `/signup`**
  - Description: Stores user data in the database.
  - Input:

    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "preferences": ["Italian", "Food Trucks"],
      "creator_interest": true
    }
    ```

  - Output:
    - Success: `201 Created`
    - Error: `400 Bad Request` or `500 Internal Server Error`

- **Email Verification API (Optional):**
  - Endpoint: **POST `/verify`**
  - Description: Sends a verification email to users post-signup.

- **Referral/Sharing API (Optional):**
  - Endpoint: **POST `/referral`**
  - Description: Tracks referrals for incentive programs.

### Backend Stack

- Supabase for database, authentication, and API hosting.
- Analytics integration (Google Analytics or Supabase) for tracking user interactions.

---

## Timeline

| **Week** | **Task**                                              |
|----------|-------------------------------------------------------|
| Week 1   | Finalize designs, wireframes, and backend API specs.  |
| Week 2   | Build Splash and Signup screens.                     |
| Week 3   | Develop Benefits and Confirmation screens.           |
| Week 4   | Integrate APIs, styling, and finalize UX polish.     |
| Week 5   | Testing and feedback iteration.                      |
| Week 6   | Deploy pre-alpha version for testing.                |

---

## Key Libraries/Tools

- **Frontend:**
  - `react-navigation`: Navigation flow.
  - `react-native-paper`: Pre-styled components.
  - `axios`: API requests.
- **Backend:**
  - Supabase for authentication and database.
- **Testing:**
  - Jest and React Native Testing Library.
- **Analytics:**
  - Google Analytics or Supabase.

---

## Next Steps

1. ✅ Start the creation of the `users` table in Supabase. (Completed: SQL schema created in infrastructure/supabase/schema/01_create_users_table.sql)
2. Develop API endpoints for signup and user data storage. (this looks like it is done by Supabase, so this may not be needed)
3. Begin component structure planning for React Native development.

---

## Changelog

### 2024-01-09

- Created SQL schema for users table
  - Added table creation script in infrastructure/supabase/schema/01_create_users_table.sql
  - Implemented all required fields: id, name, email, preferences, creator_interest, signup_date
  - Added appropriate indexes for email and creator_interest
  - Included detailed table and column comments
