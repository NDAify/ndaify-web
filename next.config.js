const withSourceMaps = require('@zeit/next-source-maps');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = () => withSourceMaps(withCSS(withImages({
  webpack: (config, { isServer, webpack }) => {
    const definePlugin = config.plugins.find(
      (plugin) => plugin instanceof webpack.DefinePlugin,
    );

    if (definePlugin) {
      // override next.js definition including when `experimental.pageEnv` is used
      definePlugin.definitions['process.env'] = isServer ? 'process.env' : 'window.env';
    }

    return config;
  },
  poweredByHeader: false,
})));
