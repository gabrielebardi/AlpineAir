# Application Flow for AlpineAir MVP

## Overview
The AlpineAir MVP allows users to aggregate demand for private flights by selecting timeframes, viewing demand density, and booking private jets when enough passengers share similar preferences. Admins manage routes, pricing, and charter bookings while ensuring smooth operations.

---

## User Flow

### 1. **Registration and Login**
- **Options**:
  - Login/Register via Apple ID.
  - Login/Register via Email and Password.
- **Process**:
  - Users must create an account to access features such as viewing the heat calendar, setting preferences, and booking flights.
  - First-time users are guided through a brief introduction about how the platform works.

---

### 2. **Flight Search**
- **Step 1: Route Selection**
  - Users select a departure and return route (e.g., ZRH → LND).
- **Step 2: Timeframe Input**
  - For each leg, users input:
    - A **time slot** (specific date and time, e.g., May 3rd, 6 AM–9 AM).
    - Or a **time frame** (range of dates and times, e.g., May 3rd, 6 AM–May 6th, 9 PM).
  - System recommends users choose a **3–5 day timeframe** for higher matching potential.

---

### 3. **Heat Calendar Visualization**
- **Calendar Display**:
  - A **5-day heat calendar** divided into 3-hour slots (8 sections per day).
  - **Color Gradient**: Light blue to dark purple, representing light to heavy interest in each slot.
- **Tooltips**:
  - Hovering over a time slot reveals:
    - Number of interested passengers (e.g., "5 users interested").
    - Trending slots with growing interest (e.g., "Demand increasing in this slot").
    - Suggestions for better alignment (e.g., "Expanding your timeframe increases chances of matching").

---

### 4. **Flight Options**
- **Existing Flights**:
  - If a chartered flight is already scheduled, users see:
    - Departure and return dates/times.
    - Aircraft type and available seats (e.g., "8/10 seats filled").
    - Discounted price compared to new bookings.
- **Booking Requests**:
  - Users can submit a new request for their preferred timeframe if no suitable flights exist.

---

### 5. **Flight Confirmation Rules**
- **Passenger Threshold**:
  - Default threshold: 6 passengers per flight
  - Adjustable by admins per route
  - System tracks both confirmed and potential bookings
- **Pricing Structure**:
  - Base price: 1000 CHF per flight leg
  - Dynamic pricing adjustments by admins based on:
    - Route popularity
    - Time of year
    - Remaining seats
  - Discounted rates for filling remaining seats on confirmed flights
- **Payment Processing**:
  - All transactions in Swiss Francs (CHF)
  - Refunds only processed by admins for exceptional cases
    - Technical issues
    - Flight cancellations
    - Weather-related disruptions
  - No automatic refunds for user cancellations

---

### 6. **Waitlist Management**
- **Automatic Enrollment**:
  - If a user’s preferences do not match existing flights, they are added to a waitlist.
  - Users are notified if new flights or matching opportunities arise within their timeframe.

---

### 7. **Real-Time Notifications**
- **Types of Notifications**:
  - Rising demand in selected timeframes (e.g., "Slot May 3rd, 9–12 AM now trending!").
  - Thresholds nearing or met for a specific route.
  - Confirmation of a scheduled flight.
- **Channels**:
  - Notifications via email and platform dashboard.

---

## Admin Flow

### 1. **Monitoring Demand**
- **Heat Calendar**:
  - Real-time view of demand density for all legs and timeframes.
  - Highlights underperforming slots or routes.
- **Threshold Alerts**:
  - Automated notifications for slots nearing or meeting the passenger threshold.

---

### 2. **Flight Management**
- **Pre-Booking**:
  - Admins pre-book charters with partner companies once thresholds are met.
- **Adding Flights**:
  - Scheduled flights are added to the calendar with:
    - Exact times.
    - Available seats.
    - Pricing details.
- **User Communication**:
  - Notify all users of a confirmed flight and manage opt-out responses.

---

### 3. **Pricing Control**
- **Dynamic Adjustments**:
  - Admins can modify pricing for specific time slots based on demand.
  - Offer discounts for already-scheduled flights to fill remaining seats.

---

### 4. **Reporting and Insights**
- **Metrics Tracked**:
  - Total interest per leg.
  - Profitable and underperforming slots.
  - Passenger trends and preferences.

---

## Summary
This flow ensures AlpineAir MVP delivers a seamless experience for users while providing admins with the tools needed to manage operations effectively. Each step prioritizes demand aggregation and operational efficiency, enabling successful private flight scheduling.

