import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions as any);
  if (!session || !session.user?.email) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { courtId, startAt, endAt } = req.body;
    if (!courtId || !startAt || !endAt) return res.status(400).json({ error: "Missing fields" });

    const start = new Date(startAt);
    const end = new Date(endAt);
    if (start >= end) return res.status(400).json({ error: "Invalid time range" });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const conflict = await prisma.booking.findFirst({
      where: {
        courtId,
        status: "BOOKED",
        AND: [
          { startAt: { lt: end } },
          { endAt: { gt: start } },
        ],
      },
    });

    if (conflict) {
      return res.status(409).json({ error: "Time slot already booked" });
    }

    const booking = await prisma.booking.create({
      data: {
        courtId,
        userId: user.id,
        startAt: start,
        endAt: end,
      },
    });

    return res.status(201).json(booking);
  }

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { court: true },
      orderBy: { startAt: "desc" },
    });
    return res.status(200).json(bookings);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
