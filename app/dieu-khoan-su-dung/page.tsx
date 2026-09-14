import type { Metadata } from "next";
import { LegalDocumentBody } from "@/components/sections/LegalDocumentBody";
import { LegalDocumentHeader } from "@/components/sections/LegalDocumentHeader";
import { termsOfUsePageContent } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${termsOfUsePageContent.heading} | PML Vietnam`,
  description: termsOfUsePageContent.description,
};

export default function DieuKhoanSuDungPage() {
  return (
    <>
      <LegalDocumentHeader content={termsOfUsePageContent} />
      <LegalDocumentBody content={termsOfUsePageContent} showChrome={false} />
    </>
  );
}
