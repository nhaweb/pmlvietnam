"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export type CarouselSideControls = {
  prevLabel: string;
  nextLabel: string;
};

/**
 * Slide spacing presets — Embla padding + negative-margin pattern
 * (CSS `gap` breaks on loop boundaries).
 * Values match in-slide grids: gap-4 (1rem) / sm:gap-5 (1.25rem).
 */
const SLIDE_GAP_PRESETS = {
  "4-5": {
    container:
      "[--carousel-slide-gap:1rem] sm:[--carousel-slide-gap:1.25rem] -ml-[var(--carousel-slide-gap)]",
    slide: "pl-[var(--carousel-slide-gap)]",
  },
} as const;

export type CarouselSlideGap = keyof typeof SLIDE_GAP_PRESETS | false;

export type CarouselProps = {
  children: ReactNode;
  options?: EmblaOptionsType;
  /** Enable Embla Autoplay with this delay (ms). */
  autoplayMs?: number;
  className?: string;
  viewportClassName?: string;
  containerClassName?: string;
  /**
   * Gap between slides (Embla padding + negative margin).
   * Use `"4-5"` to match grids with `gap-4 sm:gap-5`.
   * Prefer this over CSS `gap` — loop carousels lose gap at the wrap.
   */
  slideGap?: CarouselSlideGap;
  /**
   * @deprecated Use `slideGap="4-5"` instead. Kept so old call sites still compile;
   * any truthy string enables the `4-5` preset.
   */
  slideGapClassName?: string;
  /**
   * Side prev/next outside the viewport (News / Samples).
   * - object: buttons when >1 snap, width spacers when 1
   * - false: always keep width spacers (no buttons)
   * - omit: no side rail (full-bleed / hero)
   */
  sideControls?: CarouselSideControls | false;
  /** Bottom prev/next + dots row (Testimonials). */
  bottomControls?: CarouselSideControls | false;
  showDots?: boolean;
  dotsLabel?: string;
  /** When true, edge buttons disable instead of wrapping (non-loop). */
  disableWhenEdge?: boolean;
  /** Show grab cursor when multiple snaps (default true). */
  showGrabCursor?: boolean;
};

const CarouselSlideGapContext = createContext<string | undefined>(undefined);

/**
 * Embla-based carousel — MIT, lightweight, Tailwind-friendly.
 * Structure: optional side buttons → viewport → flex container → slides.
 */
export function Carousel({
  children,
  options,
  autoplayMs,
  className,
  viewportClassName,
  containerClassName,
  slideGap,
  slideGapClassName,
  sideControls,
  bottomControls = false,
  showDots = true,
  dotsLabel = "Trang",
  disableWhenEdge = false,
  showGrabCursor = true,
}: CarouselProps) {
  const gapPresetKey: CarouselSlideGap =
    slideGap === false
      ? false
      : slideGap ?? (slideGapClassName ? "4-5" : false);
  const gapPreset = gapPresetKey ? SLIDE_GAP_PRESETS[gapPresetKey] : null;

  const plugins = useMemo(() => {
    if (!autoplayMs || autoplayMs <= 0) return [];
    return [
      Autoplay({
        delay: autoplayMs,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ];
  }, [autoplayMs]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      ...options,
    },
    plugins,
  );

  const {
    selectedIndex,
    scrollSnaps,
    canPrev,
    canNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useCarouselControls(emblaApi);

  const slideCount = scrollSnaps.length;
  const multi = slideCount > 1;
  const sideLabels =
    sideControls && typeof sideControls === "object" ? sideControls : null;
  const bottomLabels =
    bottomControls && typeof bottomControls === "object"
      ? bottomControls
      : null;
  const showSide = Boolean(sideLabels && multi);
  const showSideRail = sideControls !== undefined;
  const showBottom = Boolean(bottomLabels && multi);
  const showDotNav = showDots && multi;

  const viewport = (
    <div
      ref={emblaRef}
      className={cx(
        "min-w-0 overflow-hidden",
        showSideRail && "flex-1",
        showGrabCursor && multi && "cursor-grab active:cursor-grabbing",
        viewportClassName,
      )}
    >
      <CarouselSlideGapContext.Provider value={gapPreset?.slide}>
        <div
          className={cx(
            "flex touch-pan-y",
            gapPreset?.container,
            containerClassName,
          )}
        >
          {children}
        </div>
      </CarouselSlideGapContext.Provider>
    </div>
  );

  return (
    <div className={cx("relative", className)}>
      {showSideRail ? (
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {showSide && sideLabels ? (
            <CarouselButton
              direction="prev"
              label={sideLabels.prevLabel}
              onClick={scrollPrev}
              disabled={disableWhenEdge && !canPrev}
              variant="side"
            />
          ) : (
            <span className="hidden w-10 shrink-0 lg:block" aria-hidden />
          )}

          {viewport}

          {showSide && sideLabels ? (
            <CarouselButton
              direction="next"
              label={sideLabels.nextLabel}
              onClick={scrollNext}
              disabled={disableWhenEdge && !canNext}
              variant="side"
            />
          ) : (
            <span className="hidden w-10 shrink-0 lg:block" aria-hidden />
          )}
        </div>
      ) : (
        viewport
      )}

      {showBottom || showDotNav ? (
        <div
          className={cx(
            "mt-8 flex items-center justify-center",
            showBottom ? "gap-4" : "gap-2",
          )}
        >
          {showBottom && bottomLabels ? (
            <CarouselButton
              direction="prev"
              label={bottomLabels.prevLabel}
              onClick={scrollPrev}
              disabled={disableWhenEdge && !canPrev}
              variant="bottom"
            />
          ) : null}

          {showDotNav ? (
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label={dotsLabel}
            >
              {scrollSnaps.map((_, index) => (
                <button
                  key={`carousel-dot-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`${dotsLabel} ${index + 1}`}
                  className={cx(
                    "h-2.5 rounded-full transition-all duration-200",
                    index === selectedIndex
                      ? "w-7 bg-cta"
                      : "w-2.5 bg-card-border hover:bg-muted/50",
                  )}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          ) : null}

          {showBottom && bottomLabels ? (
            <CarouselButton
              direction="next"
              label={bottomLabels.nextLabel}
              onClick={scrollNext}
              disabled={disableWhenEdge && !canNext}
              variant="bottom"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Slide shell — default full-basis page; override `className` for multi-per-view. */
export function CarouselSlide({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const gapSlideClassName = useContext(CarouselSlideGapContext);

  return (
    <div
      className={cx(
        "min-w-0 shrink-0 grow-0 basis-full",
        gapSlideClassName,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

function useCarouselControls(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onInit = (api: EmblaCarouselType) => {
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
    };

    onInit(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    canPrev,
    canNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}

function CarouselButton({
  direction,
  label,
  onClick,
  disabled,
  variant,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant: "side" | "bottom";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "h-10 w-10 shrink-0 items-center justify-center rounded-full",
        "border border-card-border bg-bg-primary text-foreground shadow-sm",
        "transition-colors hover:border-cta hover:text-cta",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
        "disabled:pointer-events-none disabled:opacity-35",
        variant === "side" && "hidden sm:inline-flex",
        variant === "bottom" && "inline-flex bg-card",
      )}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-5 w-5">
      <path
        d={
          direction === "prev"
            ? "M12.5 4.5 7 10l5.5 5.5"
            : "M7.5 4.5 13 10l-5.5 5.5"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
