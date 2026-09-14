"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export type HoverScrollPreviewProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  unoptimized?: boolean;
  frameClassName?: string;
};

const SCROLL_PX_PER_SEC = 85;
const RETURN_MS = 1200;

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Full-page screenshot preview: hover (desktop) or tap (mobile)
 * scrolls to the bottom; leave / tap again returns to the top.
 */
export function HoverScrollPreview({
  src,
  alt,
  width,
  height,
  priority,
  sizes = "(max-width: 1024px) 100vw, 45vw",
  unoptimized,
  frameClassName,
}: HoverScrollPreviewProps) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [durationMs, setDurationMs] = useState(RETURN_MS);
  const [tapToToggle, setTapToToggle] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const sync = () => setTapToToggle(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const overflowPx = useCallback(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return 0;
    return Math.max(0, media.offsetHeight - frame.clientHeight);
  }, []);

  const startScroll = useCallback(() => {
    activeRef.current = true;
    if (reduceMotion) return;
    const overflow = overflowPx();
    if (overflow <= 0) return;
    setDurationMs((overflow / SCROLL_PX_PER_SEC) * 1000);
    setOffset(overflow);
  }, [overflowPx, reduceMotion]);

  const resetScroll = useCallback(() => {
    activeRef.current = false;
    setDurationMs(RETURN_MS);
    setOffset(0);
  }, []);

  const toggleScroll = useCallback(() => {
    if (activeRef.current || offset > 0) {
      resetScroll();
    } else {
      startScroll();
    }
  }, [offset, resetScroll, startScroll]);

  return (
    <div
      ref={frameRef}
      className={cx(
        "relative min-h-0 overflow-hidden",
        tapToToggle && "cursor-pointer touch-manipulation",
        frameClassName,
      )}
      onMouseEnter={tapToToggle ? undefined : startScroll}
      onMouseLeave={tapToToggle ? undefined : resetScroll}
      onClick={tapToToggle ? toggleScroll : undefined}
      role={tapToToggle ? "button" : undefined}
      tabIndex={tapToToggle ? 0 : undefined}
      aria-pressed={tapToToggle ? offset > 0 : undefined}
      aria-label={
        tapToToggle
          ? offset > 0
            ? "Trượt về đầu ảnh"
            : "Trượt xem toàn bộ giao diện"
          : undefined
      }
      onKeyDown={
        tapToToggle
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleScroll();
              }
            }
          : undefined
      }
    >
      <div
        ref={mediaRef}
        className="min-h-full will-change-transform"
        style={{
          transform: `translate3d(0, -${offset}px, 0)`,
          transition: `transform ${durationMs}ms ${offset > 0 ? "linear" : "ease-out"}`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          unoptimized={unoptimized}
          onLoad={() => {
            if (activeRef.current) startScroll();
          }}
          className="h-auto min-h-full w-full select-none object-cover object-top"
        />
      </div>
    </div>
  );
}
