// Pickleball Booking App - Backend Server
// Start with: npm start

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pickleball_db',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!', timestamp: new Date() });
});

// Test database connection
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'Database connected!', 
      time: result.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message 
    });
  }
});

// Get all venues
app.get('/api/venues', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM venues LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get venue by ID
app.get('/api/venues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM venues WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get courts by venue
app.get('/api/courts', async (req, res) => {
  try {
    const { venue_id } = req.query;
    
    if (!venue_id) {
      return res.status(400).json({ error: 'venue_id is required' });
    }
    
    const result = await pool.query(
      'SELECT * FROM courts WHERE venue_id = $1',
      [venue_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new venue (example)
app.post('/api/venues', async (req, res) => {
  try {
    const { name, address, city, state, zip_code, phone, email, price_per_hour, description, owner_id } = req.body;
    
    // Validation
    if (!name || !address || !city || !state || !zip_code || !price_per_hour || !owner_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await pool.query(
      'INSERT INTO venues (name, address, city, state, zip_code, phone, email, price_per_hour, description, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, address, city, state, zip_code, phone, email, price_per_hour, description, owner_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎾 Pickleball Booking App Backend`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`✅ Test connection at http://localhost:${PORT}/api/health`);
});

module.exports = app;
