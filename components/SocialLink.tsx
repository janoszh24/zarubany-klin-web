import { ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  icon: ReactNode;
};

export default function SocialLink({ href, label, icon }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center gap-2
        rounded-full border border-slate-200 bg-white
        px-3 py-2 sm:px-4 sm:py-2.5
        text-xs sm:text-sm
        shadow-sm transition
        hover:bg-slate-100
      "
    >
      {/* IKONA */}
      <span
        className="
          text-slate-700
          transition-transform
          scale-90 sm:scale-100
          group-hover:scale-110
        "
      >
        {icon}
      </span>

      {/* TEXT (na mobile môžeme skryť, ak chceš) */}
      <span className="hidden sm:inline font-medium">
        {label}
      </span>
    </a>
  );
}
