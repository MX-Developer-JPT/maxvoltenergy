import * as Sentry from "@sentry/nextjs";

// Server / edge error + performance monitoring.
// Dormant until SENTRY_DSN is set in the environment — no-op otherwise.
export async function register() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === "production",
  });
}

export const onRequestError = Sentry.captureRequestError;
