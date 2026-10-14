import { after, NextResponse } from "next/server";

import {
  markLeadEmailStatus,
  saveContactLead,
} from "@/lib/contact-leads/store";
import {
  EmailConfigError,
  sendContactLeadEmail,
  type ContactLead,
} from "@/lib/email/send-contact-lead";

type ContactPayload = {
  variant?: "consult" | "register";
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  selectedSample?: string;
};

function normalizePhone(value: string) {
  return value.replace(/[\s.\-]/g, "");
}

function refererPath(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) return undefined;
  try {
    return new URL(referer).pathname;
  } catch {
    return undefined;
  }
}

function emailErrorResponse(error: unknown) {
  if (error instanceof EmailConfigError) {
    console.error("[contact] missing email config", error.message);
    return NextResponse.json(
      { error: "Hệ thống email chưa được cấu hình." },
      { status: 503 },
    );
  }

  console.error("[contact] send failed", error);
  const detail = error instanceof Error ? error.message : "";
  if (/only send testing emails to your own email address/i.test(detail)) {
    return NextResponse.json(
      {
        error:
          "Resend chưa verify domain nhaweb.vn — hiện chỉ gửi được tới email tài khoản Resend.",
      },
      { status: 502 },
    );
  }
  return NextResponse.json(
    { error: "Không gửi được. Vui lòng thử lại sau." },
    { status: 502 },
  );
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Payload không hợp lệ." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const phone = normalizePhone(body.phone ?? "");
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const variant = body.variant === "consult" ? "consult" : "register";
  const selectedSample = body.selectedSample?.trim() || undefined;

  if (!name) {
    return NextResponse.json({ error: "Thiếu tên." }, { status: 400 });
  }
  if (!/^0\d{9}$/.test(phone)) {
    return NextResponse.json(
      { error: "Số điện thoại không hợp lệ." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
  }

  const lead: ContactLead = {
    variant,
    name,
    phone,
    email: email || undefined,
    message: message || undefined,
    selectedSample,
  };

  let leadId: string;
  try {
    leadId = await saveContactLead(lead, { sourcePath: refererPath(request) });
  } catch (error) {
    // CMS unavailable — email becomes the only record, so it must succeed before we report OK.
    console.error("[contact] save lead failed", error);
    try {
      await sendContactLeadEmail(lead);
    } catch (emailError) {
      return emailErrorResponse(emailError);
    }
    return NextResponse.json({ ok: true });
  }

  after(async () => {
    let sendError: unknown;
    try {
      await sendContactLeadEmail(lead);
    } catch (error) {
      sendError = error;
      console.error("[contact] send failed after save", leadId, error);
    }

    const detail = sendError instanceof Error ? sendError.message : undefined;
    await markLeadEmailStatus(leadId, sendError ? "failed" : "sent", detail).catch((patchError) =>
      console.error("[contact] update email status failed", leadId, patchError),
    );
  });

  return NextResponse.json({ ok: true });
}
