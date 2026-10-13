import type { Metadata } from "next";
import { LegalDocumentBody } from "@/components/sections/LegalDocumentBody";
import { LegalDocumentHeader } from "@/components/sections/LegalDocumentHeader";
import { pageMetadata } from "@/lib/seo";
import { termsOfUsePageContent } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: termsOfUsePageContent.heading,
  description: termsOfUsePageContent.description,
  path: "/dieu-khoan-su-dung",
});

export default function DieuKhoanSuDungPage() {
  return (
    <>
      <LegalDocumentHeader content={termsOfUsePageContent} />
      <LegalDocumentBody content={termsOfUsePageContent} showChrome={false} />
    </>
  );
}
