const withCSS = require('@zeit/next-css');

module.exports = () => withCSS({
  // delegate to next-routes
  useFileSystemPublicRoutes: false,
  env: {
    // Build-time configuration (that we want inlined in the bundle)
    // This option inlines the environment variables of the build machine e.g. If you build on a
    // staging container and promote release to a production container, environment variables of the
    // staging machine will be carried over as they are inlined in the output bundle. This option
    // is not secure and should not be used for secrets.
  },
  serverRuntimeConfig: {
    // Runtime configuration
    // serverRuntimeConfig is exposed only to server (i.e. secrets)
  },
  publicRuntimeConfig: {
    // Runtime configuration
    // publicRuntimeConfig is exposed to both server and client
  },
});
