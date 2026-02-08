type Props = {
  title: string;
  name: string;
  description?: string;
  phone: string;
  email?: string;
};

export default function ContactCard({
  title,
  name,
  description,
  phone,
  email,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-semibold tracking-tight">
        {name}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-slate-600">
          {description}
        </p>
      )}

      <div className="mt-4 h-px w-full bg-slate-100" />

      {/* Kontakty */}
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
        >
          ☎️ {phone}
        </a>

        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap"
          >
            📧 {email}
          </a>
        )}
      </div>
    </div>
  );
}


