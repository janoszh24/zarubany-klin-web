import { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
  subtle = false,
}: {
  id: string;
  title?: string;
  children: ReactNode;
  subtle?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        "py-20",
        subtle ? "bg-slate-50/70" : "",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4">
        {title ? (
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {title}
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-slate-200" />
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
