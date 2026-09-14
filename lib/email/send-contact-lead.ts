export type ContactLead = {
  variant: "consult" | "register";
  name: string;
  phone: string;
  email?: string;
  message?: string;
  selectedSample?: string;
};

type EmailEnvName = "RESEND_API_KEY" | "CONTACT_TO_EMAIL" | "RESEND_FROM_EMAIL";

export class EmailConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailConfigError";
  }
}

export class EmailSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailSendError";
  }
}

function processEnvValue(name: EmailEnvName) {
  // Dynamic lookup — Next.js inlines `process.env.RESEND_API_KEY` at build time as undefined.
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function cloudflareBinding(name: EmailEnvName) {
  const ctx = Reflect.get(globalThis, Symbol.for("__cloudflare-context__")) as
    | { env?: Record<string, unknown> }
    | undefined;
  const value = ctx?.env?.[name];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readEnv(name: EmailEnvName) {
  return cloudflareBinding(name) ?? processEnvValue(name);
}

function requiredEnv(name: "RESEND_API_KEY" | "CONTACT_TO_EMAIL") {
  const value = readEnv(name);
  if (!value) {
    throw new EmailConfigError(`${name} is not set`);
  }
  return value;
}

/** Resend test sender until nhaweb.vn is verified. Built in code so dotenv `<...>` quoting cannot break it. */
function fromAddress() {
  const configured = readEnv("RESEND_FROM_EMAIL");
  if (configured && !/@example\.com>?$/i.test(configured)) {
    return configured;
  }

  const localPart = "onboarding";
  const domain = ["resend", "dev"].join(".");
  return `PML Vietnam <${localPart}@${domain}>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function variantLabel(variant: ContactLead["variant"]) {
  return variant === "consult" ? "Đăng ký tư vấn" : "Đăng ký ngay";
}

function subjectFor(lead: ContactLead) {
  if (lead.variant === "register" && lead.selectedSample) {
    return `[PML Vietnam] Đăng ký mẫu "${lead.selectedSample}" — ${lead.name}`;
  }
  return `[PML Vietnam] ${variantLabel(lead.variant)} — ${lead.name}`;
}

function textBody(lead: ContactLead) {
  const lines = [
    `Nguồn: ${variantLabel(lead.variant)}`,
    `Họ tên: ${lead.name}`,
    `Điện thoại: ${lead.phone}`,
    `Email: ${lead.email || "(không cung cấp)"}`,
  ];

  if (lead.selectedSample) {
    lines.push(`Mẫu website: ${lead.selectedSample}`);
  }
  if (lead.message) {
    lines.push("", "Nội dung:", lead.message);
  }

  return lines.join("\n");
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;width:140px;color:#64748b;font-size:14px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#0B1F3A;font-size:14px;font-weight:600;">${value}</td>
  </tr>`;
}

function htmlBody(lead: ContactLead) {
  const messageHtml = lead.message
    ? `<p style="margin:16px 0 8px;color:#64748b;font-size:13px;">Nội dung</p>
       <p style="margin:0;white-space:pre-wrap;color:#0B1F3A;font-size:14px;line-height:1.6;">${escapeHtml(lead.message)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="vi">
  <body style="margin:0;padding:24px;background:#F7F5F2;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e4de;border-radius:12px;">
      <tr>
        <td style="padding:24px 28px 16px;border-bottom:1px solid #f1efe9;">
          <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#F97316;font-weight:700;">PML Vietnam</p>
          <h1 style="margin:8px 0 0;font-size:20px;color:#0B1F3A;">${escapeHtml(variantLabel(lead.variant))}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 28px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Họ tên", escapeHtml(lead.name))}
            ${row("Điện thoại", escapeHtml(lead.phone))}
            ${row("Email", escapeHtml(lead.email || "(không cung cấp)"))}
            ${lead.selectedSample ? row("Mẫu website", escapeHtml(lead.selectedSample)) : ""}
          </table>
          ${messageHtml}
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactLeadEmail(lead: ContactLead) {
  // Dynamic import — keep Resend out of Worker cold-start / module-eval CPU budget.
  const { Resend } = await import("resend");
  const resend = new Resend(requiredEnv("RESEND_API_KEY"));
  const to = requiredEnv("CONTACT_TO_EMAIL");

  const { data, error } = await resend.emails.send({
    from: fromAddress(),
    to,
    ...(lead.email ? { replyTo: lead.email } : {}),
    subject: subjectFor(lead),
    text: textBody(lead),
    html: htmlBody(lead),
  });

  if (error) {
    throw new EmailSendError(error.message);
  }

  return data;
}
