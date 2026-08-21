# API Documentation - Pickleball Booking App

Base URL: `http://localhost:5000/api`

## Authentication

Most endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Users

#### Register
```
POST /auth/register

Body:
{
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Smith",
  "phone": "555-1234"
}

Response:
{
  "id": 1,
  "email": "john@example.com",
  "full_name": "John Smith",
  "token": "eyJhbGc..."
}
```

#### Login
```
POST /auth/login

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "id": 1,
  "email": "john@example.com",
  "token": "eyJhbGc..."
}
```

#### Get Profile
```
GET /users/profile
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "email": "john@example.com",
  "full_name": "John Smith",
  "phone": "555-1234",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Venues

#### Get All Venues
```
GET /venues

Query Parameters:
- city: filter by city
- min_price: minimum price per hour
- max_price: maximum price per hour

Response:
[
  {
    "id": 1,
    "name": "Downtown Pickleball Club",
    "address": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zip_code": "94102",
    "price_per_hour": 25,
    "rating": 4.5,
    "review_count": 12
  }
]
```

#### Get Venue Details
```
GET /venues/:id

Response:
{
  "id": 1,
  "name": "Downtown Pickleball Club",
  "address": "123 Main St",
  "city": "San Francisco",
  "price_per_hour": 25,
  "description": "Professional court facility",
  "courts": [
    {
      "id": 1,
      "court_number": 1,
      "surface_type": "hardcourt",
      "indoor_outdoor": "indoor"
    }
  ],
  "reviews": [
    {
      "id": 1,
      "user_name": "John Smith",
      "rating": 5,
      "comment": "Great facility!"
    }
  ]
}
```

#### Create Venue (Owner Only)
```
POST /venues
Authorization: Bearer <token>

Body:
{
  "name": "Downtown Pickleball Club",
  "address": "123 Main St",
  "city": "San Francisco",
  "state": "CA",
  "zip_code": "94102",
  "phone": "555-9999",
  "email": "info@downtownpb.com",
  "price_per_hour": 25,
  "description": "Professional court facility"
}

Response: (same as GET /venues/:id)
```

### Courts

#### Get Courts by Venue
```
GET /courts?venue_id=1

Response:
[
  {
    "id": 1,
    "venue_id": 1,
    "court_number": 1,
    "surface_type": "hardcourt",
    "indoor_outdoor": "indoor"
  },
  {
    "id": 2,
    "venue_id": 1,
    "court_number": 2,
    "surface_type": "hardcourt",
    "indoor_outdoor": "indoor"
  }
]
```

#### Add Court (Owner Only)
```
POST /courts
Authorization: Bearer <token>

Body:
{
  "venue_id": 1,
  "court_number": 1,
  "surface_type": "hardcourt",
  "indoor_outdoor": "indoor"
}

Response:
{
  "id": 1,
  "venue_id": 1,
  "court_number": 1,
  "surface_type": "hardcourt",
  "indoor_outdoor": "indoor"
}
```

### Bookings

#### Get Available Slots
```
GET /bookings/available?court_id=1&date=2024-09-15

Response:
[
  {
    "start_time": "09:00",
    "end_time": "10:00",
    "available": true
  },
  {
    "start_time": "10:00",
    "end_time": "11:00",
    "available": false
  }
]
```

#### Create Booking
```
POST /bookings
Authorization: Bearer <token>

Body:
{
  "court_id": 1,
  "booking_date": "2024-09-15",
  "start_time": "09:00",
  "end_time": "10:00"
}

Response:
{
  "id": 1,
  "court_id": 1,
  "user_id": 1,
  "booking_date": "2024-09-15",
  "start_time": "09:00",
  "end_time": "10:00",
  "status": "pending",
  "total_price": 25,
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### Get My Bookings
```
GET /bookings/my-bookings
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "venue_name": "Downtown Pickleball Club",
    "court_number": 1,
    "booking_date": "2024-09-15",
    "start_time": "09:00",
    "end_time": "10:00",
    "status": "confirmed",
    "total_price": 25
  }
]
```

#### Cancel Booking
```
POST /bookings/:id/cancel
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "status": "cancelled",
  "message": "Booking cancelled successfully"
}
```

### Reviews

#### Post Review
```
POST /reviews
Authorization: Bearer <token>

Body:
{
  "venue_id": 1,
  "rating": 5,
  "comment": "Great facility and friendly staff!"
}

Response:
{
  "id": 1,
  "venue_id": 1,
  "user_id": 1,
  "rating": 5,
  "comment": "Great facility and friendly staff!",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### Get Venue Reviews
```
GET /reviews?venue_id=1

Response:
[
  {
    "id": 1,
    "user_name": "John Smith",
    "rating": 5,
    "comment": "Great facility!",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": "Email is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Token expired or invalid"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Venue not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "message": "Internal server error"
}
```
