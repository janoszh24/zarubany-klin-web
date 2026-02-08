"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Zatiaľ len lokálne:
    console.log({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });

    setStatus("sent");
    e.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="name">Meno</label>
        <input
          id="name"
          name="name"
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Jano"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="jano@email.sk"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="message">Správa</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Ahojte, chceli by sme vás na akciu…"
        />
      </div>

      <button
        className="rounded-2xl bg-black px-5 py-3 text-white shadow hover:opacity-90"
        type="submit"
      >
        Odoslať
      </button>

      {status === "sent" ? (
        <p className="text-sm opacity-80">Odoslané (lokálne do konzoly) ✅</p>
      ) : null}
    </form>
  );
}
