import { useState, useEffect } from "react";

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState<any[]>([]);
  const [courtId, setCourtId] = useState<string | null>(null);
  const [courts, setCourts] = useState<any[]>([]);

  useEffect(() => { loadCourts(); }, []);

  async function loadCourts() {
    const res = await fetch("/api/courts");
    if (res.ok) {
      const data = await res.json();
      setCourts(data);
      if (data.length) setCourtId(data[0].id);
    }
  }

  async function load() {
    if (!courtId) return;
    const res = await fetch(`/api/availability?date=${date}&courtId=${courtId}`);
    const data = await res.json();
    setSlots(data);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Pickleball Booking</h1>
      <div className="mt-4">
        <select value={courtId ?? ""} onChange={e => setCourtId(e.target.value)}>
          {courts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="ml-2" />
        <button onClick={load} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded">Check</button>
      </div>

      <div className="mt-6">
        {slots.length === 0 && <p>No slots loaded.</p>}
        {slots.map((s, i) => (
          <div key={i} className="flex items-center justify-between border p-2 my-1">
            <div>{new Date(s.startAt).toLocaleTimeString()} - {new Date(s.endAt).toLocaleTimeString()}</div>
            <div>{s.available ? <span className="text-green-600">Available</span> : <span className="text-red-600">Booked</span>}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
