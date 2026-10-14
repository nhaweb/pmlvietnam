export type ServerEnvName =
  | "RESEND_API_KEY"
  | "CONTACT_TO_EMAIL"
  | "RESEND_FROM_EMAIL"
  | "SANITY_API_WRITE_TOKEN";

function processEnvValue(name: ServerEnvName) {
  // Dynamic lookup — Next.js inlines `process.env.X` at build time as undefined.
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function cloudflareBinding(name: ServerEnvName) {
  const ctx = Reflect.get(globalThis, Symbol.for("__cloudflare-context__")) as
    | { env?: Record<string, unknown> }
    | undefined;
  const value = ctx?.env?.[name];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function readServerEnv(name: ServerEnvName) {
  return cloudflareBinding(name) ?? processEnvValue(name);
}
