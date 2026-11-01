export type ServerEnvName =
  | "RESEND_API_KEY"
  | "CONTACT_TO_EMAIL"
  | "RESEND_FROM_EMAIL"
  | "SANITY_API_WRITE_TOKEN";

export function readServerEnv(name: ServerEnvName) {
  // Dynamic lookup — Next.js inlines `process.env.X` at build time as undefined.
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
