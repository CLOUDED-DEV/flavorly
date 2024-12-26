# Flavorly Waitlist and Signup Flow Development

## Overview

This document outlines the process for designing and developing the **Waitlist and Signup Flow** for Flavorly using **React Native**. It includes planning, technical requirements, database schema, and implementation steps to ensure a seamless user experience.

---

## Development Process

### 1. Planning and Design
  
- **Foodie Flow:**
  - **Screen 1:** Splash screen (Welcome message, CTA for "Join Waitlist").
  - **Screen 2:** Signup form (Email, optional content creator details).
  - **Screen 3:** Benefits screen (Perks of signing up).
  - **Screen 4:** Confirmation screen (Thank you message, social sharing option).

- **Business Flow:**
  - **Screen 1:** Splash screen (Welcome message, CTA for "List Your Business").
  - **Screen 2:** Business signup form (Business details, location).
  - **Screen 3:** Benefits screen (Platform advantages).
  - **Screen 4:** Confirmation screen (Thank you message).

- **Reusable Components:**
  - Buttons, Input Fields, Modals, Cards.

---

## Database Schema

### Foodies Table

| **Column Name**    | **Data Type**      | **Description**                                  | **Constraints**              |
|---------------------|--------------------|--------------------------------------------------|------------------------------|
| `id`               | `UUID`            | Unique identifier for each foodie.              | Primary Key, Default `uuid_generate_v4()` |
| `email`            | `VARCHAR(255)`    | Foodie's email address.                         | UNIQUE, NOT NULL             |
| `creator_interest` | `BOOLEAN`         | Indicates if user is interested in content creation. | Default `false`             |
| `signup_date`      | `TIMESTAMP`       | Date and time the foodie signed up.             | Default `NOW()`              |

### Social Media Handles Table

| **Column Name**    | **Data Type**      | **Description**                                  | **Constraints**              |
|---------------------|--------------------|--------------------------------------------------|------------------------------|
| `id`               | `UUID`            | Unique identifier for each handle.              | Primary Key, Default `uuid_generate_v4()` |
| `foodie_id`        | `UUID`            | Reference to the foodie.                        | Foreign Key                  |
| `platform`         | `VARCHAR(50)`     | Social media platform.                          | CHECK IN ('X', 'Instagram', 'TikTok') |
| `handle`           | `VARCHAR(255)`    | Social media handle/username.                   | NOT NULL                     |
| `created_at`       | `TIMESTAMP`       | When the handle was added.                      | Default `NOW()`              |

### Businesses Table

| **Column Name**    | **Data Type**      | **Description**                                  | **Constraints**              |
|---------------------|--------------------|--------------------------------------------------|------------------------------|
| `id`               | `UUID`            | Unique identifier for each business.            | Primary Key, Default `uuid_generate_v4()` |
| `email`            | `VARCHAR(255)`    | Business contact email.                         | UNIQUE, NOT NULL             |
| `business_name`    | `VARCHAR(255)`    | Name of the business.                          | NOT NULL                     |
| `business_type`    | `VARCHAR(50)`     | Type of food business.                         | CHECK IN ('Restaurant', 'Food Truck', 'Private Chef', 'Pop-up') |
| `city`             | `VARCHAR(100)`    | City where business operates.                   | NOT NULL                     |
| `pos_system`       | `VARCHAR(50)`     | Point of Sale system used.                     | CHECK IN ('Square', 'Toast', 'Clover', 'Other') |
| `signup_date`      | `TIMESTAMP`       | Date and time of signup.                       | Default `NOW()`              |

### Indexes

- `foodies.email`: For fast email lookups.
- `foodies.creator_interest`: For querying content creators.
- `businesses.email`: For fast email lookups.
- `businesses.city`: For location-based queries.
- `businesses.business_type`: For type-based filtering.

---

## Backend Integration

### APIs Implemented

- **Foodie Signup API:**
  - ✅ Successfully implemented and tested
  - Endpoint: **POST `/waitlist-signup`**
  - Description: Stores foodie data and handles content creator details.
  - Input:

    ```json
    {
      "email": "foodie@example.com",
      "creator_interest": true,
      "social_media": [
        {
          "platform": "Instagram",
          "handle": "foodie_test"
        }
      ]
    }
    ```

  - Output Success (201):

    ```json
    {
      "message": "Successfully joined waitlist",
      "data": {
        "email": "foodie@example.com",
        "creator_interest": true,
        "signup_date": "2024-01-10T12:00:00Z"
      }
    }
    ```

- **Business Signup API:**
  - ✅ Successfully implemented and tested
  - Endpoint: **POST `/business-signup`**
  - Description: Stores business data in the database.
  - Input:

    ```json
    {
      "email": "business@example.com",
      "business_name": "Food Truck Example",
      "business_type": "Food Truck",
      "city": "Charlotte",
      "pos_system": "Square"
    }
    ```

  - Output Success (201):

    ```json
    {
      "message": "Successfully joined waitlist",
      "data": {
        "email": "business@example.com",
        "business_name": "Food Truck Example",
        "business_type": "Food Truck",
        "city": "Charlotte",
        "pos_system": "Square",
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
  - Welcome message with personalized details
  - Confirmation of signup
  - Platform benefits overview
  - Next steps information
  - Flavorly branding with custom styling
- **Tracking**: Edge function logs email send attempts and results

#### Implementation Details

1. ✅ Email verification function created
2. ✅ Integration with both signup flows completed
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

1. ✅ Create database schemas (Completed: SQL schemas created for foodies and businesses)
2. ✅ Develop API endpoints (Completed: Both signup endpoints implemented and tested)
3. ✅ Implement automatic confirmation emails (Completed: Edge function with Resend.com)
4. Begin component structure planning for React Native development
5. Set up analytics tracking

---

## Changelog

### 2024-12-26

- ✅ Implemented separate foodie and business waitlist systems
  - Created new tables for foodies and businesses
  - Removed name requirement for foodies
  - Added social media handles support for content creators
  - Created new business-signup endpoint
  - Updated email templates for both flows
  - Tested all functionality in local and production

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

- Created initial SQL schema
  - Added table creation script
  - Implemented required fields
  - Added appropriate indexes
  - Included detailed table and column comments
