"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "uvod", label: "Úvod" },
  { id: "o-kapele", label: "O nás" },
  { id: "fotogaleria", label: "Fotogaléria" },
  //{ id: "kalendar", label: "Kalendár" },
  { id: "kontakt", label: "Kontakt" },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4z" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // zamkni scroll pri otvorenom menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // zavri po kliknutí na link
  function onNavClick() {
    setOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 flex items-center justify-end">
          {/* DESKTOP NAV */}
          <nav className="hidden sm:block rounded-full bg-black/50 backdrop-blur-md px-5 py-2.5 text-sm text-white shadow-lg ring-1 ring-white/10">
            <ul className="flex gap-4">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="px-2 py-1 rounded-md hover:bg-white/10 transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            className="sm:hidden rounded-full bg-black/60 text-white p-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md"
            aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* MOBILE PANEL */}
      {open ? (
        <div className="sm:hidden fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="absolute top-4 left-4 right-4 rounded-3xl bg-black/75 text-white backdrop-blur-md shadow-xl ring-1 ring-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium opacity-80">Menu</div>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-white/10"
                onClick={() => setOpen(false)}
                aria-label="Zavrieť"
              >
                <CloseIcon />
              </button>
            </div>

            <ul className="mt-3 grid gap-2">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={onNavClick}
                    className="block rounded-2xl px-4 py-3 hover:bg-white/10 transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}
