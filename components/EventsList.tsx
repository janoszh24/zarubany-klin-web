"use client";

import { useEffect, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  location: string;
  start: string | null;
};

function parseStart(start: string | null) {
  if (!start) return { date: null as Date | null, isAllDay: false };
  const isAllDay = start.length === 10; // YYYY-MM-DD
  const date = new Date(isAllDay ? start + "T00:00:00" : start);
  return { date, isAllDay };
}

function formatDateSK(date: Date) {
  return new Intl.DateTimeFormat("sk-SK", {
    weekday: "long", // celý názov dňa
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatTimeSK(date: Date) {
  return new Intl.DateTimeFormat("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function EventsList() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setItems(data.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="opacity-70">Načítavam akcie…</p>;

  if (!items.length) {
    return <p className="opacity-70">Zatiaľ nie sú naplánované akcie.</p>;
  }

  return (
    <ul className="grid gap-4">
      {items.map((e) => {
        const { date, isAllDay } = parseStart(e.start);

        return (
          <li
            key={e.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              {/* LEFT */}
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {e.title || "Akcia"}
                </h3>

                {e.location ? (
                  <div className="mt-2 text-base text-slate-700">
                    📍 {e.location}
                  </div>
                ) : (
                  <div className="mt-1 text-base text-slate-500">
                    📍 Miesto bude doplnené
                  </div>
                )}

                {date ? (
                  <div className="mt-2 text-base sm:text-lg font-medium text-slate-700">
                    {formatDateSK(date)}
                  </div>
                ) : null}
              </div>

              {/* RIGHT: time chip */}
              <div className="flex shrink-0 items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-base sm:text-lg font-semibold text-slate-900">
                  {date ? (isAllDay ? "Celý deň" : formatTimeSK(date)) : "—"}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
