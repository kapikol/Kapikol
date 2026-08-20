# Pickleball Booking

This branch adds a scaffold for a Pickleball Booking app (Next.js + TypeScript + Prisma + Postgres + NextAuth).

Included:
- Next.js app (pages API routes)
- Prisma schema and seed script
- NextAuth email provider (configure EMAIL_SERVER/EMAIL_FROM)
- Dockerfile and docker-compose for postgres + app

Quick start (local):

1) Copy .env.local with the following variables:

DATABASE_URL=postgresql://prisma:prisma@localhost:5432/pickleball
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-me-with-a-secret
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM="Pickleball <noreply@example.com>"

2) Start Postgres (docker-compose up -d db) or run the full stack: docker-compose up --build
3) Install deps: npm install
4) Generate Prisma client and migrate: npx prisma generate && npx prisma migrate dev --name init
5) Seed data: npm run seed
6) Run dev: npm run dev

If you want, I can open a PR from this branch into the default branch with a description and migration instructions.
