import { Encode_Sans_Expanded } from "next/font/google";

/* Closest free alternative to Surt Expanded (perpetualny.com) — có subset Vietnamese */
export const encodeSansExpanded = Encode_Sans_Expanded({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
