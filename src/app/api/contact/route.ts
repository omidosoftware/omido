import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Contact form API route
//
// Supports two modes:
//   1. SMTP via Resend (set RESEND_API_KEY)
//   2. Fallback: logs to server console (development / when no key configured)
//
// Required env variables for production:
//   RESEND_API_KEY   — API key from https://resend.com
//   CONTACT_EMAIL_TO — Destination email (e.g. info@omido.nl)
//
// Optional:
//   CONTACT_EMAIL_FROM — Sender address (default: onboarding@resend.dev)
// ---------------------------------------------------------------------------

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || "info@omido.nl";
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM || "OMIDO Website <onboarding@resend.dev>";

interface ContactPayload {
  name: string;
  email: string;
  service: string;
  message: string;
}

function validate(data: unknown): data is ContactPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.message === "string" &&
    d.message.trim().length > 0 &&
    (typeof d.service === "string" || d.service === undefined)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!validate(body)) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden correct in." },
        { status: 400 }
      );
    }

    const { name, email, service, message } = body;

    // Attempt to send via Resend if configured
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONTACT_EMAIL_FROM,
          to: [CONTACT_EMAIL_TO],
          reply_to: email,
          subject: `Nieuw contactverzoek van ${name}${service ? ` — ${service}` : ""}`,
          html: `
            <h2>Nieuw contactverzoek via omido.nl</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr>
                <td style="padding:8px 12px;font-weight:bold;vertical-align:top;">Naam</td>
                <td style="padding:8px 12px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-weight:bold;vertical-align:top;">E-mail</td>
                <td style="padding:8px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
              </tr>
              ${service ? `
              <tr>
                <td style="padding:8px 12px;font-weight:bold;vertical-align:top;">Type project</td>
                <td style="padding:8px 12px;">${escapeHtml(service)}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:8px 12px;font-weight:bold;vertical-align:top;">Bericht</td>
                <td style="padding:8px 12px;white-space:pre-wrap;">${escapeHtml(message)}</td>
              </tr>
            </table>
          `,
        }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        console.error("[contact] Resend API error:", error);
        return NextResponse.json(
          { error: "Er ging iets mis bij het verzenden. Probeer het later opnieuw." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Fallback: log to console (development mode)
    console.log("─────────────────────────────────────────");
    console.log("[contact] New contact form submission:");
    console.log(`  Name:    ${name}`);
    console.log(`  Email:   ${email}`);
    console.log(`  Service: ${service || "(not selected)"}`);
    console.log(`  Message: ${message}`);
    console.log("─────────────────────────────────────────");
    console.warn(
      "[contact] RESEND_API_KEY not configured. Email not sent. Set RESEND_API_KEY to enable email delivery."
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
