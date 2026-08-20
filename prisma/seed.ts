import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  const courts = [
    { name: "Court A", description: "Indoor court A" },
    { name: "Court B", description: "Indoor court B" },
  ];

  for (const c of courts) {
    await prisma.court.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
  }

  const demoEmail = "demo@pickle.local";
  const user = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: { email: demoEmail, name: "Demo User" },
  });

  const court = await prisma.court.findFirst();
  if (court) {
    const now = new Date();
    const start = new Date(now);
    start.setHours(now.getHours() + 2, 0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    await prisma.booking.create({
      data: {
        userId: user.id,
        courtId: court.id,
        startAt: start,
        endAt: end,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
