import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // dôležité pre nodemailer

const typeToLabel: Record<string, string> = {
  verejne: "Verejné podujatie / koncert",
  firemna: "Firemná akcia",
  oslava: "Oslava",
  svadba: "Svadba",
  info: "Informácia",
};

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function readBody(req: Request) {
  const ct = req.headers.get("content-type") || "";

  // JSON (fetch s application/json)
  if (ct.includes("application/json")) {
    return await req.json();
  }

  // FormData (ak by niekto posielal form-data)
  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData();
    return Object.fromEntries(fd.entries());
  }

  // fallback: skús JSON
  return await req.json();
}

export async function POST(req: Request) {
  try {
    const body = await readBody(req);

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const type = String(body?.type || "").trim();
    const message = String(body?.message || "").trim();

    // checkbox z formData môže byť "on", z JSON je true/false
    const consentRaw = body?.consent;
    const consent =
      consentRaw === true ||
      consentRaw === "true" ||
      consentRaw === "on" ||
      consentRaw === 1 ||
      consentRaw === "1";

    if (!name || !email || !type || !message) {
      return NextResponse.json({ error: "Vyplň všetky polia." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json(
        { error: "Pre odoslanie musíš súhlasiť so spracovaním údajov." },
        { status: 400 }
      );
    }

    const typeLabel = typeToLabel[type] ?? "Nešpecifikované";
    const subject = `Booking – ${typeLabel} – ${name}`;

    const mailTo = process.env.MAIL_TO;
    const mailFrom = process.env.MAIL_FROM;

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = String(process.env.SMTP_SECURE || "false") === "true";

    // Ak SMTP ešte nie je nastavené, aspoň to zaloguj (aby si vedel testovať UI)
    if (!mailTo || !mailFrom || !host || !user || !pass) {
      console.log("=== CONTACT FORM (NO SMTP CONFIG) ===");
      console.log("Subject:", subject);
      console.log("From:", `${name} <${email}>`);
      console.log("Type:", typeLabel);
      console.log("Message:", message);
      console.log("Consent:", consent);
      console.log("====================================");
      return NextResponse.json({ ok: true, note: "SMTP not configured; logged only." });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const text = [
      `Meno: ${name}`,
      `Email: ${email}`,
      `Typ: ${typeLabel}`,
      "",
      "Správa:",
      message,
      "",
      `Súhlas: Áno`,
    ].join("\n");

    const html = `
      <h2>Nová správa z webu</h2>
      <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Typ:</strong> ${escapeHtml(typeLabel)}</p>
      <p><strong>Správa:</strong><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
      <hr/>
      <p style="font-size:12px;color:#666">Súhlas: Áno</p>
    `;

    await transporter.sendMail({
      to: mailTo,
      from: mailFrom,
      subject,
      text,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("CONTACT API ERROR:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
