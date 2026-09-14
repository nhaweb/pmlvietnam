import Image, { type ImageProps } from "next/image";

export type ZoomableImageProps = ImageProps & {
  /** Extra class on the overflow-hidden frame */
  frameClassName?: string;
  /** Hover scale — off by default; only enable on media that needs it. */
  zoom?: boolean;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Next/Image wrapper with optional hover scale (ref tma.vn).
 * Zoom is driven by ancestor `.group` so overlays do not cancel the animation.
 */
export function ZoomableImage({
  frameClassName,
  className,
  alt,
  zoom = false,
  ...imageProps
}: ZoomableImageProps) {
  return (
    <div
      className={cx(
        "relative overflow-hidden",
        zoom && "group/zoom",
        frameClassName,
      )}
    >
      <Image
        alt={alt}
        className={cx(zoom && "img-zoom", "select-none", className)}
        {...imageProps}
      />
    </div>
  );
}
