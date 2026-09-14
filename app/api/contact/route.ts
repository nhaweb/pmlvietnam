import { NextResponse } from "next/server";
import {
  EmailConfigError,
  sendContactLeadEmail,
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

  try {
    await sendContactLeadEmail({
      variant,
      name,
      phone,
      email: email || undefined,
      message: message || undefined,
      selectedSample,
    });
  } catch (error) {
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

  return NextResponse.json({ ok: true });
}
