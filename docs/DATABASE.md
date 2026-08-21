# Database Schema - Pickleball Booking App

## Overview
The database has 5 main tables to manage users, courts, bookings, and reviews.

## Tables

### 1. users
Stores user account information

```sql
users
├── id (Primary Key)
├── email (Unique)
├── password (Hashed)
├── full_name
├── phone
├── created_at
└── updated_at
```

**Example:**
```
id=1, email=john@example.com, full_name=John Smith, phone=555-1234
```

### 2. venues
Stores pickleball court venues

```sql
venues
├── id (Primary Key)
├── name
├── address
├── city
├── state
├── zip_code
├── phone
├── email
├── price_per_hour
├── description
├── owner_id (Foreign Key → users.id)
├── created_at
└── updated_at
```

**Example:**
```
id=1, name=Downtown Pickleball Club, address=123 Main St, price_per_hour=25
```

### 3. courts
Individual courts at each venue

```sql
courts
├── id (Primary Key)
├── venue_id (Foreign Key → venues.id)
├── court_number
├── surface_type ("hardcourt", "clay", etc)
├── indoor_outdoor
├── created_at
└── updated_at
```

**Example:**
```
id=1, venue_id=1, court_number=1, surface_type=hardcourt, indoor_outdoor=indoor
```

### 4. bookings
Stores court reservations

```sql
bookings
├── id (Primary Key)
├── court_id (Foreign Key → courts.id)
├── user_id (Foreign Key → users.id)
├── booking_date
├── start_time
├── end_time
├── status ("pending", "confirmed", "cancelled")
├── total_price
├── created_at
└── updated_at
```

**Example:**
```
id=1, court_id=1, user_id=1, booking_date=2024-09-15, start_time=10:00, end_time=11:00, total_price=25
```

### 5. reviews
User reviews for venues

```sql
reviews
├── id (Primary Key)
├── venue_id (Foreign Key → venues.id)
├── user_id (Foreign Key → users.id)
├── rating (1-5 stars)
├── comment
├── created_at
└── updated_at
```

**Example:**
```
id=1, venue_id=1, user_id=2, rating=5, comment=Great facility!
```

## Relationships

```
users (1) ──────────────────── (many) venues
  │                                      │
  │                                      │ (1)
  │                                      │
  │ (many)                          (many) courts
  │                                      │
  └──────────── (many) bookings ◄────────┘
                  │
                  └─ (many) reviews ◄──────────┐
                                                 │
                                            venues (1)
```

## Key Concepts

### Foreign Keys
- Link tables together
- Example: `bookings.court_id` references `courts.id`
- Ensures data consistency

### Status Field
- `pending`: Awaiting payment
- `confirmed`: Payment received, booking confirmed
- `cancelled`: Booking cancelled

### Timestamps
- `created_at`: When record was created
- `updated_at`: Last time record was modified

## Common Queries

### Find all bookings for a user
```sql
SELECT b.*, c.court_number, v.name 
FROM bookings b
JOIN courts c ON b.court_id = c.id
JOIN venues v ON c.venue_id = v.id
WHERE b.user_id = 1
ORDER BY b.booking_date DESC;
```

### Find available courts on a date
```sql
SELECT c.*
FROM courts c
JOIN venues v ON c.venue_id = v.id
WHERE v.id = 1
AND c.id NOT IN (
  SELECT court_id FROM bookings 
  WHERE booking_date = '2024-09-15'
);
```

### Get venue ratings
```sql
SELECT v.name, AVG(r.rating) as avg_rating, COUNT(r.id) as review_count
FROM venues v
LEFT JOIN reviews r ON v.id = r.venue_id
GROUP BY v.id, v.name;
```
