// Client-side Sentry — loaded only when NEXT_PUBLIC_SENTRY_DSN is set.
// The env check is inlined at build time, so when the DSN is absent the dynamic
// import is dead code and the Sentry SDK is tree-shaken out of the client bundle.
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0.1,
      environment: process.env.NODE_ENV,
      enabled: process.env.NODE_ENV === "production",
    });
  });
}
