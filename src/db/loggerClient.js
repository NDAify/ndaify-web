import pino from 'pino';

const client = pino({
  name: 'NDAify Web',
  level: process.env.NDAIFY_LOG_LEVEL || 'info', /* required */
  prettyPrint: process.env.NODE_ENV !== 'production',
  enabled: true,
  browser: {
    asObject: false,
  },
});

export default client;
