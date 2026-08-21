# Setup Guide - Pickleball Booking App

## Step 1: Prerequisites Installation

### Install Node.js
1. Go to https://nodejs.org/
2. Download LTS version
3. Install and verify: `node --version` and `npm --version`

### Install PostgreSQL
1. Go to https://www.postgresql.org/download/
2. Download for your OS
3. Install and remember your password
4. Verify: `psql --version`

### Install Git
1. Go to https://git-scm.com/
2. Download and install
3. Verify: `git --version`

## Step 2: Clone Repository

```bash
git clone https://github.com/Kapikol/kapikol.git
cd kapikol
git checkout pickleball-app
```

## Step 3: Database Setup

```bash
# Open PostgreSQL
psql -U postgres

# Create database (in PostgreSQL terminal)
CREATE DATABASE pickleball_db;
\c pickleball_db

# Exit PostgreSQL
\q
```

```bash
# Run schema from command line
psql -U postgres -d pickleball_db -f database/schema.sql
```

Verify tables were created:
```bash
psql -U postgres -d pickleball_db
\dt  # Lists all tables
\q  # Exit
```

## Step 4: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/pickleball_db
JWT_SECRET=your-secret-key-here-change-in-production
```

Start backend:
```bash
npm start
```

You should see: `Server running on port 5000`

## Step 5: Frontend Setup

In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

## Troubleshooting

### PostgreSQL connection error
- Check password is correct in `.env`
- Ensure PostgreSQL is running
- On Mac: `brew services start postgresql`
- On Windows: Check Services app

### Port already in use
- Backend (5000): `lsof -i :5000` then `kill -9 <PID>`
- Frontend (5173): Change in `frontend/vite.config.js`

### npm install fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm cache clean --force`

## Next Steps
1. Read `docs/DATABASE.md` to understand the data structure
2. Read `docs/API.md` to learn the API endpoints
3. Check `docs/FEATURES.md` for feature roadmap
