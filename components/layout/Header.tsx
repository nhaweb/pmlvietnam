"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import { CTAButton } from "@/components/ui/CTAButton";
import {
  logoPath,
  navItems,
  searchPopularSuggestions,
  type NavItem,
  type SearchSuggestion,
} from "@/lib/site-config";
import { filterSearchResults, relatedSearchSuggestions } from "@/lib/search";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Header — nền trắng, logo lớn (ref tma.vn), menu + mega dropdown, icon tìm kiếm cam.
 * Logo + CTA "Đăng ký tư vấn" giữ nguyên theo mockup.
 */
export function Header({ newsPages }: { newsPages?: SearchSuggestion[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchRootRef = useRef<HTMLDivElement>(null);
  const searchFieldRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { openContactForm } = useContactForm();

  const {
    popular: popularResults,
    templates: templateResults,
    pages: pageResults,
    promo: promoResults,
  } = filterSearchResults(searchQuery, newsPages);
  const hasResults =
    popularResults.length > 0 ||
    templateResults.length > 0 ||
    pageResults.length > 0 ||
    promoResults.length > 0;
  const trimmedQuery = searchQuery.trim();
  const relatedResults = hasResults
    ? []
    : relatedSearchSuggestions(trimmedQuery, newsPages);
  const fallbackResults =
    relatedResults.length > 0 ? relatedResults : searchPopularSuggestions;
  const resultCount =
    popularResults.length +
    templateResults.length +
    pageResults.length +
    promoResults.length;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    // Hysteresis: enter must exceed shrink delta (h-24→4.5rem = 24px) + exit,
    // or sticky height changes yank scrollY back across a single threshold and flicker.
    const ENTER_PX = 48;
    const EXIT_PX = 8;

    function onScroll() {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > EXIT_PX : y > ENTER_PX));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (!searchRootRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [searchOpen]);

  function toggleMobileItem(item: NavItem) {
    if (!item.children?.length) return;
    setOpenKey((prev) => (prev === item.label ? null : item.label));
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmedQuery) return;
    const first =
      popularResults[0] ??
      templateResults[0] ??
      pageResults[0] ??
      promoResults[0];
    if (first) {
      closeSearch();
      router.push(first.href);
      return;
    }
    // Không redirect: giữ panel + query để user sửa từ khóa hoặc chọn gợi ý.
    searchInputRef.current?.select();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      searchFieldRef.current?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(-3px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }
  }

  function clearSearch() {
    setSearchQuery("");
    searchInputRef.current?.focus();
  }

  function handleSuggestionClick() {
    closeSearch();
  }

  function handleConsultFromSearch() {
    closeSearch();
    openContactForm({ variant: "consult" });
  }

  return (
    <>
    <header
      className={cx(
        "sticky top-0 z-40 border-b border-card-border bg-bg-primary",
        "transition-[background-color,box-shadow,backdrop-filter] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled &&
          "bg-bg-primary/85 shadow-[0_8px_24px_rgba(11,31,58,0.08)] backdrop-blur-md",
      )}
    >
      {/* Mobile: menu trái · logo giữa · search phải (ref msn.com). Desktop giữ layout cũ. */}
      <div
        className={cx(
          "relative mx-auto flex max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
          "transition-[height] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "h-16 sm:h-[4.5rem]" : "h-20 sm:h-24",
        )}
      >
        <button
          type="button"
          className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground transition-colors hover:bg-bg-secondary hover:text-cta lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls={`${menuId}-mobile`}
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          onClick={() => {
            setMobileOpen((v) => {
              if (v) setOpenKey(null);
              return !v;
            });
          }}
        >
          <span
            className={cx(
              "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mobileOpen && "rotate-90",
            )}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </span>
        </button>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 z-10 flex shrink-0 -translate-x-1/2 -translate-y-1/2 items-center lg:static lg:translate-x-0 lg:translate-y-0"
        >
          <Image
            src={logoPath}
            alt="PML Vietnam"
            width={1995}
            height={1038}
            className={cx(
              "w-auto object-contain transition-[height] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled ? "h-10 sm:h-12" : "h-12 sm:h-14",
            )}
            sizes="200px"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Menu chính">
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openKey === item.label;
            const isMega = item.columns === 2;

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex rounded-md px-3 py-2 text-base font-medium tracking-normal text-foreground transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-cta"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenKey(item.label)}
                onMouseLeave={() => setOpenKey(null)}
                onFocusCapture={() => setOpenKey(item.label)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setOpenKey(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  aria-controls={`${menuId}-${item.label}`}
                  className={cx(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium tracking-normal text-foreground transition-colors",
                    "hover:text-cta",
                    isOpen && "text-cta",
                  )}
                >
                  {item.label}
                  <ChevronDown className={cx("transition-transform", isOpen && "rotate-180")} />
                </Link>

                <div
                  id={`${menuId}-${item.label}`}
                  role="menu"
                  className={cx(
                    "absolute top-full z-50 pt-2 transition-opacity duration-150",
                    isMega ? "left-1/2 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2" : "left-0 min-w-[240px]",
                    isOpen
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                >
                  <div
                    className={cx(
                      "overflow-hidden rounded-xl border border-card-border bg-card shadow-lg",
                      isMega ? "grid grid-flow-col grid-rows-5 gap-x-2 p-2" : "py-2",
                    )}
                  >
                    {item.children!.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        role="menuitem"
                        onClick={() => setOpenKey(null)}
                        className={cx(
                          "block px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-bg-secondary hover:text-cta sm:text-base",
                          isMega && "rounded-lg",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-1 sm:gap-2">
          <div className="relative" ref={searchRootRef}>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-bg-secondary"
              aria-expanded={searchOpen}
              aria-controls={`${menuId}-search`}
              aria-label={searchOpen ? "Đóng tìm kiếm" : "Tìm kiếm"}
              onClick={() => {
                setSearchOpen((v) => !v);
                if (searchOpen) setSearchQuery("");
              }}
            >
              <SearchIcon />
            </button>

            {searchOpen ? (
              <div
                id={`${menuId}-search`}
                className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-card-border bg-card shadow-lg"
              >
                <form role="search" onSubmit={handleSearchSubmit} className="p-3 pb-2">
                  <label className="sr-only" htmlFor={`${menuId}-search-input`}>
                    Từ khóa tìm kiếm
                  </label>
                  <div
                    ref={searchFieldRef}
                    className="flex items-center gap-2 rounded-full border border-card-border bg-bg-primary px-3.5 py-2.5 transition-shadow focus-within:border-cta focus-within:ring-2 focus-within:ring-cta/30"
                  >
                    <SearchIconSmall />
                    <input
                      ref={searchInputRef}
                      id={`${menuId}-search-input`}
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Từ khóa tìm kiếm"
                      autoComplete="off"
                      className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={clearSearch}
                        aria-label="Xóa từ khóa"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg-secondary hover:text-foreground"
                      >
                        <ClearIcon />
                      </button>
                    ) : null}
                  </div>
                </form>

                <p className="sr-only" aria-live="polite">
                  {trimmedQuery
                    ? hasResults
                      ? `${resultCount} kết quả`
                      : `Không tìm thấy kết quả cho ${trimmedQuery}`
                    : ""}
                </p>

                <div className="max-h-[min(26rem,70vh)] overflow-y-auto px-2 pb-3">
                  {hasResults ? (
                    <>
                      {popularResults.length > 0 ? (
                        <SearchGroup
                          title="Tìm kiếm nhiều nhất"
                          items={popularResults}
                          onSelect={handleSuggestionClick}
                        />
                      ) : null}
                      {templateResults.length > 0 ? (
                        <SearchGroup
                          title="Mẫu website"
                          items={templateResults}
                          onSelect={handleSuggestionClick}
                        />
                      ) : null}
                      {pageResults.length > 0 ? (
                        <SearchGroup
                          title="Trang"
                          items={pageResults}
                          onSelect={handleSuggestionClick}
                        />
                      ) : null}
                      {promoResults.length > 0 ? (
                        <SearchGroup
                          title="Chương trình khuyến mãi"
                          items={promoResults}
                          onSelect={handleSuggestionClick}
                        />
                      ) : null}
                    </>
                  ) : (
                    <div className="search-empty">
                      <div className="px-3 pb-1 pt-3">
                        <p className="text-sm font-semibold text-foreground">
                          Không tìm thấy kết quả cho &ldquo;{trimmedQuery}&rdquo;
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          Thử từ khóa ngắn hơn, kiểm tra chính tả hoặc tìm theo
                          ngành nghề (vd: &ldquo;spa&rdquo;, &ldquo;nội thất&rdquo;).
                        </p>
                      </div>
                      <SearchGroup
                        title={
                          relatedResults.length > 0
                            ? "Có thể bạn đang tìm"
                            : "Tìm kiếm nhiều nhất"
                        }
                        items={fallbackResults}
                        onSelect={handleSuggestionClick}
                      />
                      <div className="mx-1 mt-2 flex flex-col gap-2 rounded-lg border border-card-border bg-bg-secondary p-3">
                        <p className="text-xs text-muted">
                          Chưa thấy mẫu phù hợp? PML thiết kế riêng theo yêu cầu.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={handleConsultFromSearch}
                            className="inline-flex items-center rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                          >
                            Nhờ tư vấn miễn phí
                          </button>
                          <Link
                            href="/san-pham"
                            onClick={handleSuggestionClick}
                            className="inline-flex items-center rounded-full border border-card-border bg-bg-primary px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-cta hover:text-cta"
                          >
                            Xem tất cả mẫu
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Wrapper: CTAButton base is `inline-flex`, which beats Tailwind `hidden` */}
          <div className="hidden lg:block">
            <CTAButton
              type="button"
              className="px-4 py-2.5 text-xs"
              onClick={() => openContactForm({ variant: "consult" })}
            >
              Đăng ký tư vấn ngay
            </CTAButton>
          </div>
        </div>
      </div>

      <div
        id={`${menuId}-mobile`}
        className="mobile-nav-panel absolute inset-x-0 top-full z-50 border-card-border bg-bg-primary lg:hidden"
        data-open={mobileOpen ? "true" : "false"}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
      >
        <div className="mobile-nav-panel__inner">
          <nav
            className={cx(
              "mx-auto flex max-w-site flex-col border-t border-card-border px-4 py-3 sm:px-6",
              !mobileOpen && "pointer-events-none",
            )}
            aria-label="Menu mobile"
          >
            {navItems.map((item, index) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openKey === item.label;

              return (
                <div
                  key={item.label}
                  className="mobile-nav-item border-b border-card-border/70 last:border-b-0"
                  style={{ animationDelay: `${80 + index * 45}ms` }}
                >
                  {hasChildren ? (
                    <>
                      <div className="flex items-stretch">
                        <Link
                          href={item.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setOpenKey(null);
                          }}
                          className={cx(
                            "flex min-w-0 flex-1 items-center py-3 pr-2 text-left text-base font-medium tracking-normal text-foreground",
                            "hover:text-cta",
                            isOpen && "text-cta",
                          )}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`${menuId}-${item.label}-mobile`}
                          aria-label={
                            isOpen
                              ? `Thu gọn menu ${item.label}`
                              : `Mở menu ${item.label}`
                          }
                          onClick={() => toggleMobileItem(item)}
                          className={cx(
                            "inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-md text-foreground",
                            "hover:bg-bg-secondary hover:text-cta",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta",
                            isOpen && "text-cta",
                          )}
                        >
                          <ChevronDown
                            className={cx(
                              "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>
                      </div>
                      <div
                        id={`${menuId}-${item.label}-mobile`}
                        className="mobile-nav-submenu"
                        data-open={isOpen ? "true" : "false"}
                      >
                        <div className="mobile-nav-submenu__inner">
                          <div
                            className={cx(
                              "mb-2 space-y-1 pb-2 pl-3",
                              item.columns === 2 &&
                                "grid grid-cols-1 gap-1 space-y-0 sm:grid-cols-2 sm:pl-2",
                            )}
                          >
                            {item.children!.map((child, childIndex) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setOpenKey(null);
                                }}
                                className="mobile-nav-child block rounded-md px-2 py-2 text-sm font-medium text-muted transition-colors hover:bg-bg-secondary hover:text-cta sm:text-base"
                                style={{
                                  animationDelay: `${40 + childIndex * 35}ms`,
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-base font-medium tracking-normal text-foreground transition-colors hover:text-cta"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}

            <div
              className="mobile-nav-item"
              style={{ animationDelay: `${80 + navItems.length * 45}ms` }}
            >
              <CTAButton
                type="button"
                className="mt-4 w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openContactForm({ variant: "consult" });
                }}
              >
                Đăng ký tư vấn ngay
              </CTAButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
    {mobileOpen ? (
      <button
        type="button"
        aria-label="Đóng menu"
        className="fixed inset-0 z-30 bg-foreground/25 lg:hidden"
        onClick={() => {
          setMobileOpen(false);
          setOpenKey(null);
        }}
      />
    ) : null}
    </>
  );
}

function SearchGroup({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: SearchSuggestion[];
  onSelect: () => void;
}) {
  return (
    <div className="mt-1">
      <p className="px-3 py-2 text-sm font-semibold text-foreground">{title}</p>
      <ul role="listbox" aria-label={title}>
        {items.map((item) => (
          <li key={item.id} role="option" aria-selected="false">
            <Link
              href={item.href}
              onClick={onSelect}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-bg-secondary hover:text-cta"
            >
              <ClockIcon />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={cx("h-4 w-4", className)}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Icon tìm kiếm — outline magnifying glass, màu CTA cam (ref vinahost.vn / mockup). */
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden
      className="h-6 w-6 text-cta"
    >
      <circle cx="10.5" cy="10.5" r="6.25" />
      <path d="M15.2 15.2L20 20" />
    </svg>
  );
}

function SearchIconSmall() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      className="h-4 w-4 shrink-0 text-muted"
    >
      <circle cx="10.5" cy="10.5" r="6.25" />
      <path d="M15.2 15.2L20 20" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4 shrink-0 text-muted"
    >
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 8.5V12l2.5 1.5" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-3.5 w-3.5">
      <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-6 w-6">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-6 w-6">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
