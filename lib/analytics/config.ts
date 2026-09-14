/** Public analytics IDs — set in `.env.local` / production env. */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";

export const GOOGLE_TAG_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_ID?.trim() || "";

export const hasMetaPixel = META_PIXEL_ID.length > 0;
export const hasGoogleTag = GOOGLE_TAG_ID.length > 0;
