import Image from "next/image";
import Link from "next/link";
import {
  footerContent,
  footerLogoPath,
  serviceNavLinks,
  siteContact,
  socialLinks,
  type SocialLink,
} from "@/lib/site-config";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Footer #9–#14 — nền #1E293B.
 * Mobile: list thẳng dưới heading, gạch cam sát chữ. Tablet trở lên: không gạch.
 */
export function Footer() {
  return (
    <footer className="mt-auto bg-footer text-white">
      <div className="mx-auto max-w-site px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <BrandBlock className="lg:col-span-3" />
          <FooterLinkColumn
            className="lg:col-span-2"
            title={footerContent.servicesTitle}
            links={serviceNavLinks}
          />
          <FooterLinkColumn
            className="lg:col-span-2"
            title={footerContent.info.title}
            links={footerContent.info.links}
          />
          <FooterLinkColumn
            className="lg:col-span-2"
            title={footerContent.help.title}
            links={footerContent.help.links}
          />
          <div className="lg:col-span-3">
            <FooterHeading>{footerContent.contactTitle}</FooterHeading>
            <ContactList className="mt-4" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-site px-4 py-5 text-center text-xs text-white/50 sm:px-6 lg:px-8">
          <p>{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="w-fit border-b border-cta pb-2 text-sm font-semibold tracking-wide text-cta uppercase md:w-auto md:border-0 md:pb-0 md:text-white">
      {children}
    </h3>
  );
}

function BrandBlock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link href="/" className="mb-4 block w-fit rounded-md">
        <Image
          src={footerLogoPath}
          alt="PML Vietnam"
          width={1995}
          height={1038}
          className="h-[100px] w-auto object-contain"
          sizes="300px"
        />
      </Link>
      <p className="mb-5 max-w-xs text-sm leading-relaxed text-white/70">
        Chuyên cung cấp giải pháp website hiện đại cho cá nhân, hộ kinh doanh
        và doanh nghiệp.
      </p>
      <ul className="flex items-center gap-3" aria-label="Mạng xã hội">
        {socialLinks.map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-cta hover:text-white"
              aria-label={social.label}
            >
              <SocialIcon social={social} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLinkColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <FooterHeading>{title}</FooterHeading>
      <FooterLinkList links={links} className="mt-4" />
    </div>
  );
}

function FooterLinkList({
  links,
  className,
}: {
  links: Array<{ label: string; href: string }>;
  className?: string;
}) {
  return (
    <ul className={cx("space-y-2.5", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-white/70 transition-colors hover:text-cta"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ContactList({ className }: { className?: string }) {
  return (
    <ul className={cx("space-y-3 text-sm text-white/70", className)}>
      <li>
        <a
          href={`tel:${siteContact.phoneTel}`}
          className="flex items-start gap-2.5 transition-colors hover:text-cta"
        >
          <ContactPhoneIcon />
          <span>Hotline: {siteContact.phoneDisplay}</span>
        </a>
      </li>
      <li>
        <a
          href={siteContact.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 transition-colors hover:text-cta"
        >
          <ContactZaloIcon />
          <span>Zalo: {siteContact.phoneDisplay}</span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${siteContact.email}`}
          className="flex items-start gap-2.5 transition-colors hover:text-cta"
        >
          <ContactMailIcon />
          <span>{siteContact.email}</span>
        </a>
      </li>
      <li>
        <a
          href={siteContact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 leading-relaxed transition-colors hover:text-cta"
        >
          <ContactMapIcon />
          <span>{siteContact.address}</span>
        </a>
      </li>
    </ul>
  );
}

function SocialIcon({ social }: { social: SocialLink }) {
  const className = "h-5 w-5";
  switch (social.id) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.91h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.75 15.57V8.43L15.82 12l-6.07 3.57Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.5 21.64a6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.79 1.53V6.85a4.85 4.85 0 0 1-1.04-.16Z" />
        </svg>
      );
  }
}

const contactIconClass = "mt-0.5 h-4 w-4 shrink-0 text-cta";

function ContactPhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      className={contactIconClass}
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.35a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.73-1.27a2 2 0 0 1 2.11-.45c.75.34 1.54.57 2.35.7A2 2 0 0 1 22 16.92Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactZaloIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      className={contactIconClass}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path
        d="M8 16V8h2.6a2.4 2.4 0 0 1 0 4.8H8M14 8v8M14 12h3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactMailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      className={contactIconClass}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactMapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      className={contactIconClass}
    >
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
