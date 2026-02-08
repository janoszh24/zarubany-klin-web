"use client";

import { useState } from "react";

type BookingType = "verejne" | "firemna" | "oslava" | "svadba" | "info";

const typeOptions: { value: BookingType; label: string }[] = [
  { value: "verejne", label: "Verejné podujatie / koncert" },
  { value: "firemna", label: "Firemná akcia" },
  { value: "oslava", label: "Oslava" },
  { value: "svadba", label: "Svadba" },
  { value: "info", label: "Chcem sa informovať" },
];

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formEl = e.currentTarget;          // ✅ uložiť hneď
    const form = new FormData(formEl);       // ✅ používať formEl

    setStatus("sending");
    setErrorMsg(null);

    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      type: String(form.get("type") || "").trim(),
      message: String(form.get("message") || "").trim(),
      consent: Boolean(form.get("consent")),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Nepodarilo sa odoslať správu.");
        return;
      }

      setStatus("sent");
      setErrorMsg(null);
      formEl.reset();                         // ✅ už nie e.currentTarget.reset()

      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      console.error("BOOKINGFORM SUBMIT ERROR:", err); // ✅ uvidíš presnú výnimku
      setStatus("error");
      setErrorMsg("Chyba siete. Skús to ešte raz.");
    }
  }


  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold">Priama správa</h3>
      <p className="mt-1 text-sm opacity-70">Napíš nám detaily a ozveme sa späť.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Meno</label>
          <input
            id="name"
            name="name"
            required
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Ján Novák"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="jan@email.sk"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="type" className="text-sm font-medium">Typ akcie</label>
          <select
            id="type"
            name="type"
            required
            defaultValue=""
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <option value="" disabled>Vyber typ…</option>
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">Správa</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Termín, miesto, počet ľudí, technické požiadavky…"
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4" />
          <span className="opacity-80">
            Súhlasím so spracovaním osobných údajov za účelom vybavenia mojej žiadosti.
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-2xl bg-black px-5 py-3 text-white shadow hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Odosielam…" : "Odoslať správu"}
        </button>

        {status === "sent" && (
          <div className="rounded-2xl bg-green-50 p-4 text-green-800">
            ✅ Správa bola úspešne odoslaná. Ozveme sa vám čo najskôr.
          </div>
        )}

        {status === "error" && errorMsg && (
          <div className="rounded-2xl bg-red-50 p-4 text-red-700">
            ❌ {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
}
