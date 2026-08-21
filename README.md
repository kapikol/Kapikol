# Pickleball Booking App

A full-stack web application for booking pickleball courts. Built with React, Node.js/Express, and PostgreSQL.

## 🎾 Features
- User registration & login
- Browse available courts
- Book court time slots
- View booking history
- Admin dashboard for venue managers
- Responsive design for mobile & desktop

## 🏗️ Project Structure
```
pickleball-booking-app/
├── frontend/           # React application
├── backend/            # Node.js/Express API
├── database/           # SQL schema
└── docs/              # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Kapikol/kapikol.git
cd kapikol
git checkout pickleball-app
```

### 2. Setup Database
```bash
cd database
psql -U postgres -f schema.sql
```

### 3. Setup Backend
```bash
cd ../backend
npm install
cp .env.example .env
npm start
```
Backend runs on `http://localhost:5000`

### 4. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📚 Documentation
- See `docs/API.md` for API endpoints
- See `docs/SETUP.md` for detailed setup instructions
- See `docs/DATABASE.md` for database schema

## 🔗 Useful Links
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📝 License
MIT
