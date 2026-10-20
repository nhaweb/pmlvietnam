import type { Metadata } from "next";
import { encodeSansExpanded } from "@/lib/fonts";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Layout riêng cho demo live — không Header/Footer site,
 * để iframe chiếm gần hết viewport.
 */
export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${encodeSansExpanded.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden font-sans bg-bg-primary text-foreground">
        {children}
      </body>
    </html>
  );
}
