import { SiteShell } from "@/components/layout/SiteShell";
import NotFound from "./(site)/not-found";
import "./globals.css";

export { metadata } from "./(site)/not-found";

export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFound />
    </SiteShell>
  );
}
