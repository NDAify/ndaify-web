const withSourceMaps = require('@zeit/next-source-maps');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = () => withSourceMaps(withCSS(withImages({
  poweredByHeader: false,
  env: {
    // Build-time configuration (that we want inlined in the bundle)
    // This option inlines the environment variables of the build machine e.g.
    // If you build on a staging container and promote release to a production
    // container, environment variables of the staging machine will be carried
    // over as they are inlined in the output bundle. This option can be
    // insecure if used correctly
  },
  serverRuntimeConfig: {
    // Runtime configuration
    // serverRuntimeConfig is exposed only to server (i.e. secrets)
  },
  publicRuntimeConfig: {
    // Runtime configuration
    // publicRuntimeConfig is exposed to both server and client
    NDAIFY_ENDPOINT_URL: process.env.NDAIFY_ENDPOINT_URL,
    CANONICAL_URL: process.env.CANONICAL_URL,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SCOPES: process.env.LINKEDIN_CLIENT_SCOPES,
    SENTRY_DSN: process.env.SENTRY_DSN,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  },
})));
