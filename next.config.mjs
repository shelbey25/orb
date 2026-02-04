/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// Import env validation - will fail if required env vars are missing
// This is intentional to catch configuration errors early
try {
  await import("./src/env.mjs");
} catch (error) {
  // Only throw if SKIP_ENV_VALIDATION is not set
  if (!process.env.SKIP_ENV_VALIDATION) {
    throw error;
  }
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
