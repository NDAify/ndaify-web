import * as SentryBrowser from '@sentry/browser';

if (process.browser) {
  SentryBrowser.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}

export default SentryBrowser;
