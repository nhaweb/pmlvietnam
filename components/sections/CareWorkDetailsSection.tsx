"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type {
  CareWorkComparisonContent,
  CareWorkValue,
} from "@/lib/site-config";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

type CareWorkDetailsSectionProps = {
  content: CareWorkComparisonContent;
  /** `false` — luôn hiện bảng, ẩn nút xem/ẩn chi tiết. */
  showToggle?: boolean;
  bgColor?: string;
};

/**
 * Bảng so sánh hạng mục chăm sóc website theo gói PMLCare.
 * Desktop: accordion theo nhóm + 3 cột gói. Dưới lg: chọn gói rồi xem hạn mức.
 */
export function CareWorkDetailsSection({
  content,
  showToggle = true,
  bgColor = "bg-bg-secondary",   
}: CareWorkDetailsSectionProps) {
  const {
    id,
    heading,
    tagline,
    toggleShow,
    toggleHide,
    ctaLabel,
    includedLabel,
    excludedLabel,
    mobileTabsLabel,
    registerSubheading,
    packages,
    groups,
    notes,
    flat = false,
    footerLink,

  } = content;

  const uid = useId();
  const [tableOpen, setTableOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState<string[]>([groups[0]?.id ?? ""]);
  const [activePackage, setActivePackage] = useState(0);
  const { openContactForm } = useContactForm();

  const tableId = `${uid}-table`;
  const toggleLabel = tableOpen ? toggleHide : toggleShow;

  function toggleGroup(groupId: string) {
    setOpenGroups((current) =>
      current.includes(groupId)
        ? current.filter((item) => item !== groupId)
        : [...current, groupId],
    );
  }

  function registerPackage(name: string) {
    openContactForm({
      variant: "register",
      selectedSample: name,
      subheading: registerSubheading,
    });
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 ${bgColor}`}
    >
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeader
          headingId={`${id}-heading`}
          title={heading}
          tagline={tagline}
        />

        <div className="mx-auto mt-8 max-w-6xl sm:mt-10">
          {showToggle ? (
            <button
              type="button"
              aria-expanded={tableOpen}
              aria-controls={tableId}
              onClick={() => setTableOpen((open) => !open)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-cta hover:bg-card active:scale-[0.99] sm:py-3.5 sm:text-[0.9375rem]"
            >
              <span
                className="inline-flex h-5 w-5 items-center justify-center text-cta"
                aria-hidden
              >
                {tableOpen ? <MinusIcon /> : <PlusIcon />}
              </span>
              {toggleLabel}
            </button>
          ) : null}

          <div
            id={tableId}
            className={cx(
              "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              !showToggle || tableOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <div className={showToggle ? "pt-6 sm:pt-8" : undefined}>
                <div className="lg:hidden">
                  <MobilePackageTabs
                    packages={packages}
                    activeIndex={activePackage}
                    onChange={setActivePackage}
                    tabsLabel={mobileTabsLabel}
                  />
                  <div className="mt-4 overflow-hidden rounded-2xl border border-card-border bg-card">
                    {packages[activePackage] ? (
                      <div
                        className={cx(
                          "border-b border-card-border px-4 py-4",
                          packages[activePackage].featured
                            ? "bg-cta/10"
                            : "bg-bg-secondary/80",
                        )}
                      >
                        <p className="text-base font-bold text-foreground">
                          {packages[activePackage].name}
                        </p>
                        {packages[activePackage].price ? (
                          <p className="mt-2 text-lg font-bold text-cta">
                            {packages[activePackage].price}
                          </p>
                        ) : null}
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {packages[activePackage].tagline}
                        </p>
                        {ctaLabel ? (
                          <CTAButton
                            type="button"
                            className="mt-4 w-full"
                            onClick={() =>
                              registerPackage(packages[activePackage].name)
                            }
                          >
                            {ctaLabel}
                          </CTAButton>
                        ) : null}
                      </div>
                    ) : null}
                    <GroupList
                      groups={groups}
                      openGroups={openGroups}
                      onToggle={toggleGroup}
                      uid={uid}
                      includedLabel={includedLabel}
                      excludedLabel={excludedLabel}
                      packageIndex={activePackage}
                      packageNames={packages.map((item) => item.name)}
                      flat={flat}
                    />
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="grid grid-cols-[minmax(16rem,1.35fr)_repeat(3,minmax(0,1fr))]">
                    <div />
                    {packages.map((pkg, index) => (
                      <div
                        key={pkg.id}
                        className={cx(
                          "flex h-full flex-col items-center border-t border-r border-card-border bg-card px-4 py-5 text-center",
                          index === 0 && "rounded-tl-2xl border-l",
                          index === packages.length - 1 && "rounded-tr-2xl",
                          pkg.featured && "bg-cta/10",
                        )}
                      >
                        <p className="text-sm font-bold text-foreground">
                          {pkg.name}
                        </p>
                        {pkg.price ? (
                          <p className="mt-2 text-base font-bold text-cta">
                            {pkg.price}
                          </p>
                        ) : null}
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          {pkg.tagline}
                        </p>
                        {ctaLabel ? (
                          <div className="mt-auto w-full pt-4">
                            <CTAButton
                              type="button"
                              className="w-full text-xs sm:text-sm"
                              onClick={() => registerPackage(pkg.name)}
                            >
                              {ctaLabel}
                            </CTAButton>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="overflow-hidden rounded-b-2xl rounded-tl-2xl border border-card-border bg-card">
                    <GroupList
                      groups={groups}
                      openGroups={openGroups}
                      onToggle={toggleGroup}
                      uid={uid}
                      includedLabel={includedLabel}
                      excludedLabel={excludedLabel}
                      packageNames={packages.map((item) => item.name)}
                      featuredIndex={packages.findIndex((item) => item.featured)}
                      flat={flat}
                    />
                  </div>
                </div>
              </div>

              {footerLink ? (
                <p className="mt-6 text-center text-sm leading-relaxed text-foreground/80 sm:text-[0.9375rem]">
                  {footerLink.prefix}
                  <Link
                    href={footerLink.href}
                    className="font-semibold text-cta underline underline-offset-2 hover:text-cta/80"
                  >
                    {footerLink.linkLabel}
                  </Link>
                </p>
              ) : null}

              {notes?.length ? (
                <ul className="mt-6 space-y-3" role="list">
                  {notes.map((note) => (
                    <li
                      key={note.id}
                      className="rounded-2xl border border-card-border bg-card px-4 py-4 sm:px-5 sm:py-5"
                    >
                      <h3 className="text-sm font-bold text-foreground sm:text-base">
                        {note.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                        {note.body}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type GroupListProps = {
  groups: CareWorkComparisonContent["groups"];
  openGroups: string[];
  onToggle: (id: string) => void;
  uid: string;
  includedLabel: string;
  excludedLabel: string;
  packageNames: string[];
  packageIndex?: number;
  featuredIndex?: number;
  flat?: boolean;
};

function GroupList({
  groups,
  openGroups,
  onToggle,
  uid,
  includedLabel,
  excludedLabel,
  packageIndex,
  packageNames,
  featuredIndex = -1,
  flat = false,
}: GroupListProps) {
  const mobile = packageIndex !== undefined;
  const items = flat ? groups.flatMap((group) => group.items) : null;

  if (items) {
    return (
      <ul role="list" className="[&>li:first-child]:border-t-0">
        {items.map((item) => (
          <ComparisonRow
            key={item.id}
            item={item}
            mobile={mobile}
            packageIndex={packageIndex}
            packageNames={packageNames}
            includedLabel={includedLabel}
            excludedLabel={excludedLabel}
            featuredIndex={featuredIndex}
          />
        ))}
      </ul>
    );
  }

  return (
    <ul role="list">
      {groups.map((group) => {
        const isOpen = openGroups.includes(group.id);
        const panelId = `${uid}-panel-${group.id}`;
        const buttonId = `${uid}-button-${group.id}`;

        return (
          <li key={group.id} className="border-t border-card-border first:border-t-0">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(group.id)}
              className={cx(
                "flex w-full items-center gap-3 px-4 py-4 text-left transition-colors duration-300 hover:bg-bg-secondary/80 sm:px-5",
                isOpen && "bg-bg-secondary/70",
              )}
            >
              <span
                className={cx(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center text-cta transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  isOpen && "rotate-90",
                )}
                aria-hidden
              >
                <ChevronIcon />
              </span>
              <span className="text-sm font-bold uppercase tracking-wide text-foreground sm:text-[0.9375rem]">
                {group.title}
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cx(
                "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <ul role="list">
                  {group.items.map((item) => (
                    <ComparisonRow
                      key={item.id}
                      item={item}
                      mobile={mobile}
                      packageIndex={packageIndex}
                      packageNames={packageNames}
                      includedLabel={includedLabel}
                      excludedLabel={excludedLabel}
                      featuredIndex={featuredIndex}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ComparisonRow({
  item,
  mobile,
  packageIndex,
  packageNames,
  includedLabel,
  excludedLabel,
  featuredIndex,
}: {
  item: CareWorkComparisonContent["groups"][number]["items"][number];
  mobile: boolean;
  packageIndex?: number;
  packageNames: string[];
  includedLabel: string;
  excludedLabel: string;
  featuredIndex: number;
}) {
  return (
    <li className="border-t border-card-border">
      {mobile ? (
        <div
          className={cx(
            "grid gap-2 px-4 py-3.5 sm:px-5",
            item.highlight ? "bg-cta/10" : "bg-card",
          )}
        >
          <p className="text-sm leading-relaxed text-foreground/85">
            {item.label}
          </p>
          <div className="text-sm font-semibold text-foreground">
            <ValueCell
              value={
                item.values[packageIndex ?? 0] ?? {
                  kind: "excluded",
                }
              }
              packageName={packageNames[packageIndex ?? 0] ?? ""}
              includedLabel={includedLabel}
              excludedLabel={excludedLabel}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[minmax(16rem,1.35fr)_repeat(3,minmax(0,1fr))]">
          <p
            className={cx(
              "px-4 py-3.5 text-sm font-semibold leading-relaxed text-foreground/85 sm:px-5",
              item.highlight ? "bg-cta/10" : "bg-bg-secondary",
            )}
          >
            {item.label}
          </p>
          {item.values.map((value, valueIndex) => (
            <div
              key={`${item.id}-${packageNames[valueIndex]}`}
              className={cx(
                "flex items-center justify-center border-l border-card-border px-3 py-3.5 text-center text-sm font-semibold text-foreground",
                item.highlight || valueIndex === featuredIndex
                  ? "bg-cta/10"
                  : "bg-card",
              )}
            >
              <ValueCell
                value={value}
                packageName={packageNames[valueIndex] ?? ""}
                includedLabel={includedLabel}
                excludedLabel={excludedLabel}
              />
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

function ValueCell({
  value,
  packageName,
  includedLabel,
  excludedLabel,
}: {
  value: CareWorkValue;
  packageName: string;
  includedLabel: string;
  excludedLabel: string;
}) {
  return (
    <span className="inline-flex items-center justify-center">
      <span className="sr-only">{packageName}: </span>
      {value.kind === "quota" ? (
        <span>{value.label}</span>
      ) : value.kind === "included" ? (
        <span className="inline-flex items-center gap-1.5 text-cta">
          <CheckIcon />
          <span className="sr-only">{includedLabel}</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[#dc2626]">
          <CrossIcon />
          <span className="sr-only">{excludedLabel}</span>
        </span>
      )}
    </span>
  );
}

function MobilePackageTabs({
  packages,
  activeIndex,
  onChange,
  tabsLabel,
}: {
  packages: CareWorkComparisonContent["packages"];
  activeIndex: number;
  onChange: (index: number) => void;
  tabsLabel: string;
}) {
  return (
    <div
      aria-label={tabsLabel}
      className="grid grid-cols-3 gap-1 rounded-2xl border border-card-border bg-card p-1"
    >
      {packages.map((pkg, index) => {
        const selected = index === activeIndex;
        return (
          <button
            key={pkg.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(index)}
            className={cx(
              "rounded-xl px-2 py-2.5 text-center text-[0.7rem] font-bold leading-tight transition-colors duration-300 sm:text-xs",
              selected
                ? "bg-cta text-white"
                : "text-foreground hover:bg-bg-secondary",
            )}
          >
            {pkg.shortName ?? pkg.name}
          </button>
        );
      })}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M7.5 5 12.5 10 7.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M10 4v12M4 10h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M4 10h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
