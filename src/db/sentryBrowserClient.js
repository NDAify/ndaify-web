import getConfig from 'next/config';
import * as SentryBrowser from '@sentry/browser';

const { publicRuntimeConfig: { SENTRY_DSN } } = getConfig();

if (process.browser) {
  SentryBrowser.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}

export default SentryBrowser;
