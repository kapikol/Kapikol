# Pull Request: Add Pickleball Booking scaffold

This pull request adds a starter Pickleball Booking application scaffold built with Next.js, TypeScript, Prisma, and PostgreSQL. It includes NextAuth (email provider), a seed script, Docker support, and basic API routes for availability and bookings.

What's included
- Next.js app with pages and API routes
- Prisma schema and seed script
- NextAuth email provider setup (requires EMAIL_SERVER and EMAIL_FROM)
- Dockerfile and docker-compose for local development
- Basic booking conflict checks and slot generation

Setup & testing notes
1. Add environment variables (.env.local):
   - DATABASE_URL=postgresql://prisma:prisma@localhost:5432/pickleball
   - NEXTAUTH_URL=http://localhost:3000
   - NEXTAUTH_SECRET=replace-with-a-secure-random-string
   - EMAIL_SERVER=smtp://USER:PASS@smtp.example.com:587
   - EMAIL_FROM="Pickleball <noreply@example.com>"
2. Start the database & app using docker-compose or run Postgres separately.
3. Run migrations and seed: npx prisma migrate dev --name init && npm run seed
4. Start the dev server: npm run dev

Notes on security & improvements
- Update NEXTAUTH_SECRET and configure a real EMAIL_SERVER before production.
- Consider stronger concurrency protections on booking creation and DB-level constraints.

If you'd like, I can merge this PR after your review or make further changes (admin UI, Stripe integration, improved auth providers, etc.).
