import type { Metadata } from "next";
import { LegalDocumentBody } from "@/components/sections/LegalDocumentBody";
import { LegalDocumentHeader } from "@/components/sections/LegalDocumentHeader";
import { privacyPolicyPageContent } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${privacyPolicyPageContent.heading} | PML Vietnam`,
  description: privacyPolicyPageContent.description,
};

export default function ChinhSachBaoMatPage() {
  return (
    <>
      <LegalDocumentHeader content={privacyPolicyPageContent} />
      <LegalDocumentBody content={privacyPolicyPageContent} showChrome={false} />
    </>
  );
}
