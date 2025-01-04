# Flavorly App Framework

## General Questions

### 1. Core Value Proposition

- **Revenue Growth**: Drive bookings with unique marketing tools like hyper-local targeting and interactive maps for food trucks.
- **Community Engagement**: Content creator fund with a built-in social network to foster discovery and engagement.
- **Flexibility & Simplicity**: Dynamic platform accommodating diverse vendors (food trucks, private chefs, pop-ups) with user-friendly tools.
- **Cost Leadership with Premium Perks**: Lower costs upfront with optional advanced features.

#### Differentiators

- AI-driven predictive demand analysis for vendors.
- Gamified vendor experience (e.g., badges for "top-reviewed vendor").
- Loyalty-based discounts tied to user engagement metrics.

### 2. MVP Priorities

- Vendor onboarding and setup.
- Core booking and payment functionality.
- Food truck tracking with live updates.
- Basic search and discovery features.
- Content creator pilot program.

### 3. Geographic Scope

- Alpha and Beta launch in Charlotte, NC, with plans to expand coverage nationally.

---

## Vendor Questions

### 1. Pricing

**Revised Pricing Model:**

| **Plan Name**   | **One-Time Fee** | **Monthly Fee** | **Per-Cover Fee** | **Features**                       |
|------------------|------------------|-----------------|-------------------|------------------------------------|
| **Starter**      | $49.99           | $19.99          | $0.50             | Basic booking, standard listing.  |
| **Growth**       | $99.99           | $49.99          | $0.25             | Starter + analytics, marketing.   |
| **Pro**          | $149.99          | $99.99          | $0.00             | Growth + premium support, search priority. |

**Optional Add-Ons:**

- **Discovery Boost:** $25–$50/month for enhanced visibility in searches.
- **Custom Analytics Reports:** $10/month for detailed insights (e.g., customer trends).
- **Seasonal Promotions Package:** $20/month for short-term marketing boosts (e.g., holiday specials).

---

### 2. Dynamic Business Models

- **Food Trucks**: 
  - Hybrid location tracking system combining device-based automatic updates with manual location input options
  - Flexible schedule management
  - Vendor control over tracking preferences
- **Pop-Up Restaurants**: Temporary event support.
- **Seasonal Businesses**: Flexible scheduling tools.
- **Collaborative Events**: Multi-vendor order functionality.

### 3. Customization

- Basic customization (logos, menus) in lower tiers.
- Advanced branding options (custom domains, styling) in premium tiers.

---

## Customer Questions

### 1. Search Features

- **Filters**: Proximity, star rating, cuisine type.
- **Mood-Based Search**: Options like "cozy date night" or "fun group outing."
- **Interactive Maps**: Food truck tracking and dynamic routes.
- **AI Suggestions**: Personalized "You May Like" recommendations.

### 2. Payments and Booking

- **Payments**: 
  - Stripe Connect for vendor transactions
  - POS Integration Priority:
    * Square - Primary solution for food trucks
    * Toast - Full-service restaurant integration
    * Clover - Small/medium business solution
    * Stripe Terminal - Complementing Stripe Connect for in-person payments
- **Booking Confirmation**: Build in-house for scalability and flexibility.

---

## Monetization

### 1. In-App Ads

- Swipeable carousel for vendor ads on the home page.
- Sponsored placements in the recommendation engine.
- Avoid traditional banner ads to maintain user experience.

### 2. Premium Plans

- **Starter ($19.99/month):** Basic booking tools and analytics.
- **Growth ($49.99/month):** Advanced analytics, marketing tools, branded pages.
- **Pro ($99.99/month):** Priority support, enhanced insights, custom integrations.
- **One-Time Setup Fees:** $49.99–$149.99 depending on vendor size.

### 3. Upselling

- Add-ons (e.g., wine pairings, private dining packages).
- Backlogged for Phase 2 unless it fits within MVP scope.

---

## User Retention

### 1. Loyalty Program

- Vendors: Points for completed bookings, redeemable for discounts or features.
- Customers: Rewards for milestones like discounts or priority booking.

### 2. Content Creator Integrity

- **Verification**: 
  - Mandatory verification process before program participation
  - Use itemized receipts and promo code tracking
  - Review of previous content and platform presence
- **Transparency**: Paid reviews labeled; users can filter reviews by creator.
- **Engagement-Based Payouts**: Creator earnings tied to metrics like bill size, visit duration, and post popularity.
- **Fraud Prevention**: AI to flag anomalies in review or promo code usage.

### 3. Community Content

- Backlogged for future discussion.
- Potential for curated user photos and reviews moderated by AI.

---

## Base Color Palette
  **Vintage Earth Palette**: #1A1110, #E4D6A7, #E9B44C, #9B2915, #43B3AE, #f6f3e7

**Notes**:

- The palette will evolve based on testing and branding refinement.

---

## Content Creator Model

### Payout Formula

- **Base Rate:** $5 flat rate for verified content.
- **Metrics:**
  - Bill size weight: 0.05.
  - Engagement score weights: Likes (0.1), Views (0.025), Shares (0.2).
  - Promo code bonuses: $1 per redemption.
- **Caps:**
  - Engagement contribution capped at $50.
  - Promo bonuses capped at $50.
- **Scaling:** Payouts exceeding $500 are scaled at a reduced rate of 50% for the excess.
- **Minimum Thresholds:**
  - Follower Min: 1,000.
  - View Min: 500.
  - Engagement Min: 50 (likes, shares, comments combined).
  - Bill Min: $15.

### Next Steps

- Revisit the payout formula for refinement as the model evolves.
- Wireframes for the "Reviews Hub" will be prioritized later in the design phase.
- Content policies to be drafted during development to ensure authenticity and prevent fraud.
