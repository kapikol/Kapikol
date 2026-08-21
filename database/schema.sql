-- Pickleball Booking App Database Schema
-- PostgreSQL

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  user_type VARCHAR(50) DEFAULT 'user', -- 'user' or 'owner'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create venues table
CREATE TABLE venues (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  price_per_hour DECIMAL(10, 2) NOT NULL,
  description TEXT,
  owner_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create courts table
CREATE TABLE courts (
  id SERIAL PRIMARY KEY,
  venue_id INTEGER NOT NULL,
  court_number INTEGER NOT NULL,
  surface_type VARCHAR(50), -- 'hardcourt', 'clay', 'indoor', etc
  indoor_outdoor VARCHAR(20), -- 'indoor' or 'outdoor'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE,
  UNIQUE(venue_id, court_number)
);

-- Create bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  court_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  venue_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(venue_id, user_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_owner ON venues(owner_id);
CREATE INDEX idx_courts_venue ON courts(venue_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_court ON bookings(court_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_reviews_venue ON reviews(venue_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- Insert sample data (optional)
INSERT INTO users (email, password, full_name, phone, user_type) VALUES
('owner@example.com', 'hashed_password_123', 'Jane Owner', '555-0001', 'owner'),
('user@example.com', 'hashed_password_456', 'John User', '555-0002', 'user');

INSERT INTO venues (name, address, city, state, zip_code, phone, email, price_per_hour, description, owner_id) VALUES
('Downtown Pickleball Club', '123 Main St', 'San Francisco', 'CA', '94102', '555-1234', 'info@downpb.com', 25.00, 'Professional pickleball facility with 4 courts', 1),
('Sunset Pickleball Courts', '456 Oak Ave', 'San Francisco', 'CA', '94117', '555-5678', 'info@sunsetpb.com', 20.00, 'Community pickleball courts in the park', 1);

INSERT INTO courts (venue_id, court_number, surface_type, indoor_outdoor) VALUES
(1, 1, 'hardcourt', 'indoor'),
(1, 2, 'hardcourt', 'indoor'),
(1, 3, 'hardcourt', 'outdoor'),
(1, 4, 'hardcourt', 'outdoor'),
(2, 1, 'hardcourt', 'outdoor'),
(2, 2, 'hardcourt', 'outdoor');
