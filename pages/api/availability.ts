import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

function generateSlots(date: string, slotMinutes = 60) {
  const day = new Date(date);
  const slots: { startAt: string; endAt: string }[] = [];
  const startHour = 6;
  const endHour = 22;
  for (let h = startHour; h < endHour; h += slotMinutes / 60) {
    const s = new Date(day);
    s.setHours(h, 0, 0, 0);
    const e = new Date(s);
    e.setMinutes(e.getMinutes() + slotMinutes);
    slots.push({ startAt: s.toISOString(), endAt: e.toISOString() });
  }
  return slots;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date, courtId } = req.query;
  if (!date) return res.status(400).json({ error: "date required" });

  const slots = generateSlots(date as string, 60);
  let booked: any[] = [];
  if (courtId) {
    const startOfDay = new Date(date as string);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date as string);
    endOfDay.setHours(23, 59, 59, 999);

    booked = await prisma.booking.findMany({
      where: {
        courtId: courtId as string,
        status: "BOOKED",
        AND: [
          { startAt: { gte: startOfDay } },
          { startAt: { lte: endOfDay } },
        ],
      },
    });
  }

  const available = slots.map(s => {
    const isBooked = booked.some(b => new Date(b.startAt).toISOString() === s.startAt);
    return { ...s, available: !isBooked };
  });

  res.status(200).json(available);
}
