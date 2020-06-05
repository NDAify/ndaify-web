import getConfig from 'next/config';
import pino from 'pino';

let level;
if (process.browser) {
  ({ publicRuntimeConfig: { NDAIFY_LOG_LEVEL: level } } = getConfig());
} else {
  level = process.env.NDAIFY_LOG_LEVEL;
}

const client = pino({
  name: 'NDAify Web',
  level: level || 'info', /* required */
  prettyPrint: process.env.NODE_ENV !== 'production',
  enabled: true,
  browser: {
    asObject: false,
  },
});

export default client;
