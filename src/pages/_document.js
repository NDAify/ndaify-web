import React from 'react';
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

import { StaticHead } from '../components/Head/Head';
import parseLocaleParts from '../utils/parseLocaleParts';

const PUBLIC_ENV_NO_SECRETS_OR_YOU_WILL_BE_FIRED = {
  CANONICAL_URL: process.env.CANONICAL_URL,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SCOPES: process.env.LINKEDIN_CLIENT_SCOPES,
  NDAIFY_ENDPOINT_URL: process.env.NDAIFY_ENDPOINT_URL,
  NDAIFY_LOG_LEVEL: process.env.NDAIFY_LOG_LEVEL,
  NDAIFY_SOLICIT_PAYMENTS: process.env.NDAIFY_SOLICIT_PAYMENTS,
  SENTRY_DSN: process.env.SENTRY_DSN,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
};

const ClientRuntime = ({ config }) => (
  <>
    { /* eslint-disable react/no-danger */}
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.env = ${JSON.stringify(config)};
        `,
      }}
    />
    { /* eslint-enable react/no-danger */}
    <NextScript />
  </>
);

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(
          <>
            <StaticHead />
            <App
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
            />
          </>,
        ),
      });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {
              initialProps.styles
            }
            {
              sheet.getStyleElement()
            }
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    // eslint-disable-next-line no-underscore-dangle
    const pageProps = this.props.__NEXT_DATA__.props;

    let preferredTheme;
    let language;
    let dir;

    if (pageProps) {
      ({ preferredTheme } = pageProps);
      ({ language, dir } = parseLocaleParts(pageProps.locale));
    }

    return (
      <Html lang={language} dir={dir}>
        <Head />
        <body className={preferredTheme}>
          <noscript>
            <iframe
              title="Google Analytics Manager"
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <ClientRuntime config={PUBLIC_ENV_NO_SECRETS_OR_YOU_WILL_BE_FIRED} />
        </body>
      </Html>
    );
  }
}

export default Document;
