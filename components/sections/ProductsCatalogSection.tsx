"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ProductSampleCard } from "@/components/products/ProductSampleCard";
import { Reveal } from "@/components/ui/Reveal";
import { productsPageContent } from "@/lib/site-config";
import {
  getUrlHashServerSnapshot,
  getUrlHashSnapshot,
  matchCatalogGroupId,
  notifyUrlHashListeners,
  subscribeToUrlHash,
} from "@/lib/url-hash";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Trang sản phẩm — catalog toàn bộ mẫu giao diện theo ngành nghề.
 * Filter chip theo 10 nhóm; hash URL (`#groupId`) đồng bộ filter.
 * Click mẫu → trang chi tiết `/san-pham/[slug]`.
 */
export function ProductsCatalogSection() {
  const { allFilterLabel, emptyFilterMessage, registerHint, filters, items } =
    productsPageContent;
  const hashId = useSyncExternalStore(
    subscribeToUrlHash,
    getUrlHashSnapshot,
    getUrlHashServerSnapshot,
  );
  const activeGroupId = matchCatalogGroupId(
    hashId,
    filters.map((filter) => filter.id),
  );

  const visibleItems = useMemo(() => {
    if (!activeGroupId) return items;
    return items.filter((item) => item.groupId === activeGroupId);
  }, [activeGroupId, items]);

  function selectFilter(groupId: string | null) {
    if (groupId) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${groupId}`,
      );
    } else {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    notifyUrlHashListeners();
  }

  return (
    <section
      id="san-pham"
      aria-label="Danh sách mẫu giao diện"
      className="scroll-mt-24 bg-bg-secondary px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
    >
      <div className="mx-auto max-w-site">
        <p className="mb-4 text-center text-sm text-muted sm:mb-5">
          {registerHint}
        </p>
        <div
          role="tablist"
          aria-label="Lọc theo nhóm ngành"
          className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-2.5"
        >
          <FilterChip
            active={activeGroupId === null}
            onClick={() => selectFilter(null)}
            label={allFilterLabel}
          />
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              active={activeGroupId === filter.id}
              onClick={() => selectFilter(filter.id)}
              label={filter.label}
              id={filter.id}
            />
          ))}
        </div>

        {visibleItems.length === 0 ? (
          <p className="py-16 text-center text-muted">{emptyFilterMessage}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visibleItems.map((item, index) => (
              <li key={`${activeGroupId ?? "all"}-${item.id}`}>
                <Reveal amount={0.15} delay={(index % 4) * 0.06}>
                  <ProductSampleCard item={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  id,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  id?: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id ?? "filter-all"}
      aria-selected={active}
      onClick={onClick}
      className={cx(
        "scroll-mt-24 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
        active
          ? "border-cta bg-cta text-white"
          : "border-card-border bg-bg-primary text-foreground hover:border-cta hover:text-cta",
      )}
    >
      {label}
    </button>
  );
}
