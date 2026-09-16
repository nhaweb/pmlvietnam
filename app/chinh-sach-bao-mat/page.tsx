import type { Metadata } from "next";
import { LegalDocumentBody } from "@/components/sections/LegalDocumentBody";
import { LegalDocumentHeader } from "@/components/sections/LegalDocumentHeader";
import { pageMetadata } from "@/lib/seo";
import { privacyPolicyPageContent } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: privacyPolicyPageContent.heading,
  description: privacyPolicyPageContent.description,
  path: "/chinh-sach-bao-mat",
});

export default function ChinhSachBaoMatPage() {
  return (
    <>
      <LegalDocumentHeader content={privacyPolicyPageContent} />
      <LegalDocumentBody content={privacyPolicyPageContent} showChrome={false} />
    </>
  );
}
