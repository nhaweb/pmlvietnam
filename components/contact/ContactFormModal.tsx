"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { trackLead } from "@/lib/analytics/track";
import {
  contactFormContent,
  siteContact,
  type ContactFormVariant,
} from "@/lib/site-config";

export type ContactFormModalProps = {
  open: boolean;
  onClose: () => void;
  variant: ContactFormVariant;
  /** Form 8 — tên mẫu web vừa chọn (vd. "Shop thời trang online") */
  selectedSample?: string;
  /** Ghi đè subheading mặc định (vd. gói logo / nhận diện) */
  subheading?: string;
};

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  form?: string;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function normalizePhone(value: string) {
  return value.replace(/[\s.\-]/g, "");
}

function isValidPhone(value: string) {
  return /^0\d{9}$/.test(normalizePhone(value));
}

function isValidEmail(value: string) {
  if (!value.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Modal form dùng chung Form 7 (consult) + Form 8 (register).
 * Trái: ảnh placeholder · Phải: 4 field + CTAButton.
 */
export function ContactFormModal({
  open,
  onClose,
  variant,
  selectedSample,
  subheading: subheadingOverride,
}: ContactFormModalProps) {
  const titleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copy =
    variant === "consult"
      ? contactFormContent.consult
      : contactFormContent.register;
  const fields = contactFormContent.fields;

  const heading =
    variant === "register" && selectedSample
      ? selectedSample
      : variant === "consult"
        ? contactFormContent.consult.heading
        : contactFormContent.register.defaultHeading;

  const subheading = subheadingOverride ?? copy.subheading;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setErrors({});
      setSubmitting(false);
      setSubmitted(false);
    }
  }, [open, variant, selectedSample]);

  function handleDialogClose() {
    onClose();
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Vui lòng nhập tên của bạn.";
    if (!phone.trim()) next.phone = "Vui lòng nhập số điện thoại.";
    else if (!isValidPhone(phone)) {
      next.phone = "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0).";
    }
    if (!isValidEmail(email)) next.email = "Email không hợp lệ.";
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
          variant,
          name: name.trim(),
          phone: normalizePhone(phone),
          email: email.trim() || undefined,
          message: message.trim() || undefined,
          selectedSample: selectedSample || undefined,
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

      trackLead({ variant });
      setSubmitted(true);
    } catch {
      setErrors({ form: "Không gửi được. Vui lòng thử lại sau." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={cx(
        "contact-form-dialog",
        "fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none bg-transparent p-0",
        "backdrop:bg-footer/60 backdrop:backdrop-blur-[3px]",
        "open:flex open:items-center open:justify-center open:px-6 open:py-5",
      )}
      onClose={handleDialogClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div
        data-contact-panel
        className={cx(
          "relative flex w-full max-h-[min(100dvh,920px)] max-w-4xl flex-col overflow-hidden",
          "rounded-3xl bg-bg-primary shadow-2xl",
          "lg:grid lg:max-h-[min(90dvh,720px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:flex-none",
        )}
        role="document"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-card-border bg-bg-primary text-foreground shadow-sm transition-colors hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
          aria-label="Đóng form"
        >
          <CloseIcon />
        </button>

        {/* Media — chỉ hiện từ lg trở lên (ẩn trên mobile) */}
        <div className="hidden shrink-0 items-center justify-center overflow-hidden bg-footer lg:flex lg:h-full lg:min-h-0">
          <Image
            src={contactFormContent.image.src}
            alt={contactFormContent.image.alt}
            width={1024}
            height={1024}
            className="h-full max-h-full w-auto max-w-full object-contain"
            sizes="420px"
            priority
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-5 pt-4 sm:px-7 sm:pb-7 sm:pt-6">
          {submitted ? (
            <div
              className="flex flex-1 flex-col items-center justify-center py-10 text-center"
              role="status"
              aria-live="polite"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cta/10 text-cta">
                <CheckIcon />
              </div>
              <p className="text-lg font-bold text-foreground sm:text-xl">
                {contactFormContent.successTitle}
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted sm:text-base">
                {contactFormContent.successMessage}
              </p>
              <div className="mt-8 w-full max-w-xs">
                <CTAButton type="button" onClick={onClose} className="w-full">
                  Đóng
                </CTAButton>
              </div>
            </div>
          ) : (
            <>
              <header className="pr-10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cta">
                  PML Vietnam
                </p>
                <h2
                  id={titleId}
                  className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {heading}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {subheading}
                </p>
              </header>

              <form
                className="mt-5 flex flex-1 flex-col gap-3.5 sm:mt-6 sm:gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                  <Field
                    id={nameId}
                    label={fields.name.label}
                    required={fields.name.required}
                    error={errors.name}
                  >
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={fields.name.placeholder}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className={inputClassName(Boolean(errors.name))}
                    />
                  </Field>

                  <Field
                    id={phoneId}
                    label={fields.phone.label}
                    required={fields.phone.required}
                    error={errors.phone}
                  >
                    <input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder={fields.phone.placeholder}
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

                <Field
                  id={emailId}
                  label={fields.email.label}
                  required={fields.email.required}
                  error={errors.email}
                >
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={fields.email.placeholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={inputClassName(Boolean(errors.email))}
                  />
                </Field>

                <Field
                  id={messageId}
                  label={fields.message.label}
                  required={fields.message.required}
                >
                  <textarea
                    id={messageId}
                    name="message"
                    rows={2}
                    placeholder={fields.message.placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cx(
                      inputClassName(false),
                      "min-h-[4.25rem] resize-none sm:min-h-[5rem] sm:resize-y",
                    )}
                  />
                </Field>

                {errors.form ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.form}
                  </p>
                ) : null}

                {/* Actions: stacked — CTA full-width, hotline chips one row */}
                <div className="mt-auto flex flex-col gap-3 border-t border-card-border pt-4 sm:pt-5">
                  <CTAButton
                    type="submit"
                    disabled={submitting}
                    className="w-full whitespace-nowrap px-6 py-3.5 text-base"
                  >
                    {submitting ? "Đang gửi…" : copy.submitLabel}
                  </CTAButton>

                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
                    <span className="text-xs font-medium text-muted sm:text-sm">
                      Hoặc liên hệ nhanh
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={`tel:${siteContact.phoneTel}`}
                        className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-card-border bg-bg-secondary px-3 text-sm font-semibold text-foreground transition-colors hover:border-cta/40 hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                      >
                        <PhoneIcon />
                        {siteContact.phoneDisplay}
                      </a>
                      <a
                        href={siteContact.zaloUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-card-border bg-bg-secondary px-3 text-sm font-semibold text-foreground transition-colors hover:border-cta/40 hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                      >
                        <ZaloIcon />
                        Zalo
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-semibold text-foreground"
      >
        {label}
        {required ? <span className="text-cta"> *</span> : null}
      </label>
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
    "w-full rounded-xl border bg-bg-primary px-3.5 py-2.5 text-sm text-foreground outline-none transition-[border-color,box-shadow]",
    "placeholder:text-muted/70 focus-visible:ring-2 focus-visible:ring-cta/30",
    hasError
      ? "border-red-400 focus-visible:border-red-400"
      : "border-card-border hover:border-footer/25 focus-visible:border-cta/50",
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <path
        d="M6.2 3.5h2.1l1 3.2-1.3 1.3a9.5 9.5 0 0 0 4 4l1.3-1.3 3.2 1v2.1a1.5 1.5 0 0 1-1.5 1.5A11.5 11.5 0 0 1 3.5 5a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden>
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
