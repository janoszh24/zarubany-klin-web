"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Img = { src: string; alt: string };

function GalleryItem({
  img,
  onOpen,
}: {
  img: Img;
  onOpen: (img: Img) => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect(); // animate once
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "120px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(img)}
      className={[
        "group relative overflow-hidden rounded-2xl shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-black/30",
        "aspect-[4/3]",
        "transition duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      ].join(" ")}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
    </button>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M15.5 19.5 8 12l7.5-7.5 1.4 1.4L10.8 12l6.1 6.1-1.4 1.4z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M8.5 19.5 7.1 18.1 13.2 12 7.1 5.9 8.5 4.5 16 12l-7.5 7.5z" />
    </svg>
  );
}

export default function Gallery({ images }: { images: Img[] }) {
  const gridImages = useMemo(() => images.slice(0, 15), [images]);

  const touch = useRef({
    startX: 0,
    startY: 0,
    isSwiping: false,
  });

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    touch.current.startX = t.clientX;
    touch.current.startY = t.clientY;
    touch.current.isSwiping = false;
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    const dx = t.clientX - touch.current.startX;
    const dy = t.clientY - touch.current.startY;

    // ak je vertikálny pohyb väčší, nechaj to tak (no swipe)
    if (Math.abs(dy) > Math.abs(dx)) return;

    // začni swipe režim, aby sa minimalizovalo "scrollovanie"
    if (Math.abs(dx) > 10) {
      touch.current.isSwiping = true;
      // zabráni "gumovému" scrollu na iOS v overlayi
      e.preventDefault();
    }
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const changed = e.changedTouches[0];
    const dx = changed.clientX - touch.current.startX;
    const dy = changed.clientY - touch.current.startY;

    // iba horizontálne swipy
    if (Math.abs(dx) <= Math.abs(dy)) return;

    const SWIPE_THRESHOLD = 60; // px (uprav si, ak chceš citlivejšie)
    if (dx <= -SWIPE_THRESHOLD) next(); // swipe left
    if (dx >= SWIPE_THRESHOLD) prev();  // swipe right
  }

  // Lightbox index namiesto open image objektu
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openImg = openIndex === null ? null : gridImages[openIndex];

  function openByImg(img: Img) {
    const idx = gridImages.findIndex((x) => x.src === img.src);
    setOpenIndex(idx >= 0 ? idx : 0);
  }

  function close() {
    setOpenIndex(null);
  }

  function prev() {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + gridImages.length) % gridImages.length);
  }

  function next() {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % gridImages.length);
  }

  // Keyboard + lock scroll when lightbox open
  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  return (
    <>
      {/* GRID */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
        {gridImages.map((img) => (
          <GalleryItem key={img.src} img={img} onOpen={openByImg} />
        ))}
      </div>

      {/* LIGHTBOX */}
      {openImg ? (
        <div
          className="fixed inset-0 z-[60] bg-black/85 p-3 sm:p-6 flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-6xl h-[82vh] rounded-2xl overflow-hidden bg-black touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >

            <Image
              src={openImg.src}
              alt={openImg.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* Close */}
            <button
              className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm shadow hover:bg-white"
              onClick={close}
              type="button"
            >
              Zavrieť ✕
            </button>

            {/* Prev / Next */}
            <button
              type="button"
              onClick={prev}
              aria-label="Predchádzajúca fotka"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 shadow hover:bg-white"
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Ďalšia fotka"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 shadow hover:bg-white"
            >
              <ArrowRightIcon />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
              {openIndex! + 1} / {gridImages.length}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
