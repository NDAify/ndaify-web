import * as SentryNode from '@sentry/node';

const { SENTRY_DSN, NODE_ENV } = process.env;

SentryNode.init({
  enabled: NODE_ENV === 'production',
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
});

export default SentryNode;
