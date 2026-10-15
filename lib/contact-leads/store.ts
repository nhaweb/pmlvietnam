import { createClient, type SanityClient } from "next-sanity";

import type { ContactLead } from "@/lib/email/send-contact-lead";
import { readServerEnv } from "@/lib/server-env";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export type LeadEmailStatus = "pending" | "sent" | "failed";

export class LeadStoreConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadStoreConfigError";
  }
}

function writeClient(): SanityClient {
  const token = readServerEnv("SANITY_API_WRITE_TOKEN");
  if (!token) {
    throw new LeadStoreConfigError("SANITY_API_WRITE_TOKEN is not set");
  }
  if (!projectId || !dataset) {
    throw new LeadStoreConfigError("Sanity projectId/dataset is not set");
  }
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}

/** Persists the lead and returns its document id. */
export async function saveContactLead(
  lead: ContactLead,
  meta: { sourcePath?: string } = {},
) {
  const client = writeClient();
  // A dotted `_id` keeps the document out of unauthenticated reads on the public dataset.
  const _id = `contactLead.${crypto.randomUUID()}`;

  await client.create(
    {
      _id,
      _type: "contactLead",
      variant: lead.variant,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      message: lead.message,
      selectedSample: lead.selectedSample,
      sourcePath: meta.sourcePath,
      submittedAt: new Date().toISOString(),
      status: "new",
      emailStatus: "pending" satisfies LeadEmailStatus,
    },
    { visibility: "async" },
  );

  return _id;
}

export async function markLeadEmailStatus(
  id: string,
  status: Exclude<LeadEmailStatus, "pending">,
  errorMessage?: string,
) {
  const patch = writeClient().patch(id).set({ emailStatus: status });
  if (status === "failed" && errorMessage) {
    patch.set({ emailError: errorMessage.slice(0, 500) });
  } else {
    patch.unset(["emailError"]);
  }
  await patch.commit({ visibility: "async" });
}
