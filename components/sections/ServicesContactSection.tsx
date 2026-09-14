"use client";

import Link from "next/link";
import {
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { trackLead } from "@/lib/analytics/track";
import { lienHePageContent, siteContact } from "@/lib/site-config";

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  terms?: string;
  form?: string;
};

type ServicesContactSectionProps = {
  sectionId?: string;
  headingAs?: "h1" | "h2";
  /** Embed vào landing — bỏ header căn giữa, heading nằm cột trái. */
  embed?: boolean;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function normalizePhone(value: string) {
  return value.replace(/[\s.\-()]/g, "");
}

function isValidPhone(value: string) {
  return /^0\d{9}$/.test(normalizePhone(value));
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Trang Liên hệ — hero form (ref interdata.vn/contact).
 * Nền gradient xanh; nút gửi xanh đen (ref InterData).
 */
export function ServicesContactSection({
  sectionId,
  headingAs = "h1",
  embed = false,
}: ServicesContactSectionProps = {}) {
  const {
    id,
    eyebrow,
    heading,
    intro,
    hotlineLabel,
    workingHours,
    termsHref,
    submitLabel,
    fields,
    successTitle,
    successMessage,
  } = lienHePageContent;

  const resolvedId = sectionId ?? id;
  const HeadingTag = headingAs;

  const titleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();
  const termsId = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Vui lòng nhập họ tên.";
    if (!phone.trim()) next.phone = "Vui lòng nhập số điện thoại.";
    else if (!isValidPhone(phone)) {
      next.phone = "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0).";
    }
    if (!email.trim()) next.email = "Vui lòng nhập email.";
    else if (!isValidEmail(email)) next.email = "Email không hợp lệ.";
    if (!termsAccepted) next.terms = "Vui lòng đồng ý điều khoản sử dụng.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: "consult",
          name: name.trim(),
          phone: normalizePhone(phone),
          email: email.trim(),
          message: message.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrors({
          form: data?.error ?? "Không gửi được. Vui lòng thử lại sau.",
        });
        return;
      }

      trackLead({ variant: "consult" });
      setSubmitted(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTermsAccepted(false);
    } catch {
      setErrors({ form: "Không gửi được. Vui lòng thử lại sau." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id={resolvedId}
      aria-labelledby={titleId}
      className="relative scroll-mt-24 overflow-hidden bg-footer"
    >
      <GlobeBackdrop />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-24 top-[-6rem] h-80 w-80 rounded-full bg-cta/20 blur-3xl" />
        <div className="absolute -left-16 bottom-[-4rem] h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {embed ? null : (
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {eyebrow}
            </p>
            <HeadingTag
              id={titleId}
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              {heading}
            </HeadingTag>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
              {intro}
            </p>
          </header>
        )}

        <div
          className={cx(
            "grid items-start gap-10 lg:grid-cols-2 lg:gap-14",
            embed ? "mt-0" : "mt-10 lg:mt-14",
          )}
        >
          {/* Left — contact info */}
          <div className="space-y-6 text-white lg:pt-2">
            {embed ? (
              <div>
                <HeadingTag
                  id={titleId}
                  className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
                >
                  {heading}
                </HeadingTag>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                  {intro}
                </p>
              </div>
            ) : null}

            <div>
              <p className="text-sm font-medium text-white/80">{hotlineLabel}</p>
              <a
                href={`tel:${siteContact.phoneTel}`}
                className="mt-1 inline-block text-2xl font-bold tracking-wide text-white transition-opacity hover:opacity-90 sm:text-3xl"
              >
                {siteContact.phoneDisplay}
              </a>
            </div>

            <InfoRow icon={<PinIcon />} label="Địa chỉ">
              <a
                href={siteContact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-90"
              >
                {siteContact.address}
              </a>
            </InfoRow>

            <InfoRow icon={<MailIcon />} label="Email">
              <a
                href={`mailto:${siteContact.email}`}
                className="transition-opacity hover:opacity-90"
              >
                {siteContact.email}
              </a>
            </InfoRow>

            <InfoRow icon={<ClockIcon />} label="Giờ làm việc">
              <span>{workingHours.replace(/^Giờ làm việc:\s*/, "")}</span>
            </InfoRow>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${siteContact.phoneTel}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <PhoneGlyph />
                Gọi ngay
              </a>
              <a
                href={siteContact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <ZaloGlyph />
                Zalo
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-white/10 bg-bg-primary p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:p-7">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-10 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cta text-white">
                  <CheckIcon />
                </div>
                <p className="text-lg font-bold text-foreground sm:text-xl">
                  {successTitle}
                </p>
                <p className="mt-2 max-w-sm text-sm text-muted sm:text-base">
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-footer px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                >
                  Gửi liên hệ khác
                </button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field error={errors.name}>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      autoComplete="name"
                      aria-label={fields.name.label}
                      placeholder={fieldPlaceholder(
                        fields.name.label,
                        fields.name.required,
                      )}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className={inputClassName(Boolean(errors.name))}
                    />
                  </Field>

                  <Field error={errors.phone}>
                    <input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      aria-label={fields.phone.label}
                      placeholder={fieldPlaceholder(
                        fields.phone.label,
                        fields.phone.required,
                      )}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone)
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      className={inputClassName(Boolean(errors.phone))}
                    />
                  </Field>
                </div>

                <Field error={errors.email}>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-label={fields.email.label}
                    placeholder={fieldPlaceholder(
                      fields.email.label,
                      fields.email.required,
                    )}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={inputClassName(Boolean(errors.email))}
                  />
                </Field>

                <Field>
                  <textarea
                    id={messageId}
                    name="message"
                    rows={4}
                    aria-label={fields.message.label}
                    placeholder={fieldPlaceholder(
                      fields.message.label,
                      fields.message.required,
                    )}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cx(
                      inputClassName(false),
                      "min-h-[7rem] resize-y",
                    )}
                  />
                </Field>

                <div>
                  <label
                    htmlFor={termsId}
                    className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground/80"
                  >
                    <input
                      id={termsId}
                      name="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        if (errors.terms)
                          setErrors((prev) => ({ ...prev, terms: undefined }));
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-card-border accent-cta"
                    />
                    <span>
                      Tôi đồng ý với{" "}
                      <Link
                        href={termsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cta underline underline-offset-2 hover:text-cta/80"
                      >
                        Thỏa thuận & Điều khoản sử dụng
                      </Link>
                    </span>
                  </label>
                  {errors.terms ? (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.terms}
                    </p>
                  ) : null}
                </div>

                {errors.form ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.form}
                  </p>
                ) : null}

                <CTAButton
                  type="submit"
                  disabled={submitting}
                  className="mt-1 px-8 py-3.5 text-base"
                >
                  {submitting ? "Đang gửi…" : submitLabel}
                </CTAButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function fieldPlaceholder(label: string, required?: boolean) {
  return required ? `${label} *` : label;
}

function Field({
  error,
  children,
}: {
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      {children}
      {error ? (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClassName(hasError: boolean) {
  return cx(
    "w-full rounded-xl border bg-bg-secondary px-3.5 py-3 text-sm text-foreground outline-none transition-[border-color,box-shadow]",
    "placeholder:text-muted/70 focus-visible:ring-2 focus-visible:ring-cta/30",
    hasError
      ? "border-red-400 focus-visible:border-red-400"
      : "border-card-border hover:border-footer/30 focus-visible:border-cta",
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
        {icon}
      </span>
      <div className="min-w-0 text-sm leading-relaxed sm:text-base">
        <p className="font-semibold text-white">{label}</p>
        <div className="mt-0.5 text-white/85">{children}</div>
      </div>
    </div>
  );
}

function GlobeBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-[18%] top-1/2 h-[min(920px,130vw)] w-[min(920px,130vw)] -translate-y-1/2 opacity-[0.14] sm:-left-[12%] lg:-left-[8%]">
        <div className="services-globe h-full w-full">
          <svg className="h-full w-full" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="280" stroke="white" strokeWidth="1.2" />
            <ellipse
              cx="400"
              cy="400"
              rx="280"
              ry="100"
              stroke="white"
              strokeWidth="1"
            />
            <ellipse
              cx="400"
              cy="400"
              rx="280"
              ry="180"
              stroke="white"
              strokeWidth="1"
            />
            <ellipse
              cx="400"
              cy="400"
              rx="100"
              ry="280"
              stroke="white"
              strokeWidth="1"
            />
            <ellipse
              cx="400"
              cy="400"
              rx="180"
              ry="280"
              stroke="white"
              strokeWidth="1"
            />
            <path d="M120 400h560M400 120v560" stroke="white" strokeWidth="1" />
            <circle cx="400" cy="400" r="320" stroke="white" strokeWidth="0.8" />
            <circle
              cx="400"
              cy="400"
              r="200"
              stroke="white"
              strokeWidth="0.6"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,255,255,0.1),transparent_55%)]" />
    </div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M10 17s5-4.2 5-8a5 5 0 1 0-10 0c0 3.8 5 8 5 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="9" r="1.6" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <rect
        x="2.5"
        y="4.5"
        width="15"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m3.5 6 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 6.5V10l2.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M6.2 3.5h2.1l1 3.2-1.3 1.3a9.5 9.5 0 0 0 4 4l1.3-1.3 3.2 1v2.1a1.5 1.5 0 0 1-1.5 1.5A11.5 11.5 0 0 1 3.5 5a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZaloGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="15"
        height="15"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.5 12.5V7.5h2.2a2 2 0 0 1 0 4H6.5M11 7.5v5M11 10h2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
      <path
        d="M5 12.5 9.5 17 19 7.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
