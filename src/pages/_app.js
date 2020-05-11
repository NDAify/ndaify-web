import React, { Fragment } from 'react';
import NextApp from 'next/app';
import NProgress from 'nprogress';
import { IntlProvider } from 'react-intl';
import { positions, Provider as AlertProvider } from 'react-alert';
import Router from 'next/router';

import { createGlobalStyle } from 'styled-components';

import Head from '../components/Head/Head';
import Alert from '../components/Alert/Alert';
import ErrorView from '../components/ErrorView/ErrorView';

import { EntityNotFoundError, APIError } from '../api';
import getLocale from '../utils/getLocale';

import '../css/nprogress.css';

import es from '../langs/es.json';

import { ThemeProvider } from '../lib/useTheme';

const MESSAGES = {
  es,
  'es-ES': es,
  'es-US': es,
  'es-MX': es,
};

const lightVars = `
  --ndaify-bg: #DCF4E3;
  --ndaify-fg: #424657;

  --ndaify-accents-0: #ffffff;
  --ndaify-accents-1: #fafafa;
  --ndaify-accents-2: #eaeaea;
  --ndaify-accents-3: #999999;
  --ndaify-accents-4: #888888;
  --ndaify-accents-5: #666666;
  --ndaify-accents-6: #444444;
  --ndaify-accents-7: #333333;
  --ndaify-accents-8: #111111;
  --ndaify-accents-9: #1A73E8;

  --ndaify-accents-primary: #CEB778;
  --ndaify-accents-secondary: #0F96CC;
  --ndaify-accents-success: #4AC09A;
  --ndaify-accents-info: #9E82E0;
  --ndaify-accents-warning: #DFA907;
  --ndaify-accents-danger: #DC564A;

  --ndaify-accents-radius-1: 4px;
  --ndaify-accents-radius-2: 8px;
  --ndaify-accents-radius-3: 12px;
  --ndaify-input-radius: 4px;
  --ndaify-button-radius: 4px;

  --ndaify-input-bg: #FFFFFF;
  --ndaify-input-fg: #424657;
  --ndaify-input-placeholder-color: #AAAAAA;
  --ndaify-input-disabled-bg: #AAAAAA;

  --ndaify-button-fg: #FFFFFF;
  
  --ndaify-bg-overlay: #D2E7D8;
  --ndaify-user-action-bg: #BDD8D3;
  --ndaify-link-color: var(--ndaify-fg);
  --ndaify-signature-line: var(--ndaify-accents-8);
  --ndaify-portal-opacity: 0.8;
`;

const darkVars = `
  --ndaify-bg: #424657;
  --ndaify-fg: #FFFFFF;

  --ndaify-accents-0: #000000;
  --ndaify-accents-1: #111111;
  --ndaify-accents-2: #333333;
  --ndaify-accents-3: #444444;
  --ndaify-accents-4: #666666;
  --ndaify-accents-5: #888888;
  --ndaify-accents-6: #999999;
  --ndaify-accents-7: #EAEAEA;
  --ndaify-accents-8: #FAFAFA;
  --ndaify-accents-9: #EDD9A3;

  --ndaify-accents-primary: #CEB778;
  --ndaify-accents-secondary: #0F96CC;
  --ndaify-accents-success: #4AC09A;
  --ndaify-accents-info: #9E82E0;
  --ndaify-accents-warning: #DFA907;
  --ndaify-accents-danger: #DC564A;

  --ndaify-accents-radius-1: 4px;
  --ndaify-accents-radius-2: 8px;
  --ndaify-accents-radius-3: 12px;
  --ndaify-input-radius: 4px;
  --ndaify-button-radius: 4px;

  --ndaify-input-bg: #FFFFFF;
  --ndaify-input-fg: #424657;
  --ndaify-input-placeholder-color: #AAAAAA;
  --ndaify-input-disabled-bg: #AAAAAA;

  --ndaify-button-fg: #FFFFFF;
  
  --ndaify-bg-overlay: #383B49;
  --ndaify-user-action-bg: #5dbfc8;
  --ndaify-link-color: var(--ndaify-fg);
  --ndaify-signature-line: #F1E65D;
  --ndaify-portal-opacity: 0.8;
`;

const themeVars = `
  // default theme in case refers-color-scheme is not supported
  :root {
    ${lightVars}
  }

  @media (prefers-color-scheme: light) {
    :root {
      ${lightVars}
    }

    // dark override
    .dark {
      ${darkVars}
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      ${darkVars}
    }
    
    // light override
    .light {
      ${lightVars}
    }
  }

  @media (prefers-color-scheme: no-preference) {}
`;

const GlobalStyle = createGlobalStyle`
  ${themeVars}

  // mute reach-ui missing style warnings
  :root {
    --reach-menu-button: 1;
    --reach-dialog: 1;
  }

  @font-face {
    font-family: Signerica Fat;
    src: url('/fonts/Signerica_Fat.ttf');
  }

  body {
    font-family: 'Raleway', sans-serif;
    background-color: var(--ndaify-bg);
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
`;

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  window.scrollTo(0, 0);
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

const ALERT_OPTIONS = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let errorPageProps;

    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        if (error instanceof EntityNotFoundError) {
          errorPageProps = {
            ...error.data,
            errorMessage: error.message,
            statusCode: error.statusCode,
          };
        }

        if (error instanceof APIError) {
          errorPageProps = {
            ...error.data,
            errorMessage: error.message,
            statusCode: error.statusCode,
          };
        }
      }
    }

    const ssrNow = Date.now();
    const locale = getLocale(ctx.req?.headers['accept-language'], 'en');

    // eslint-disable-next-line no-console
    console.info(process.browser ? 'Browser' : 'Server', 'locale is set to', locale);

    let theme;
    const lang = 'en';
    const dir = 'ltr';

    return {
      errorPageProps,
      locale,
      messages: MESSAGES[locale],
      pageProps,
      ssrNow,
      theme,
      lang,
      dir,
    };
  }

  render() {
    const {
      Component,
      errorPageProps,
      locale,
      messages,
      pageProps,
      ssrNow,
      theme,
    } = this.props;

    return (
      <>
        <Head />
        <GlobalStyle />

        <ThemeProvider initialTheme={theme}>
          <AlertProvider
            template={Alert}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...ALERT_OPTIONS}
          >
            <IntlProvider
              locale={locale}
              timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
              messages={messages}
              initialNow={ssrNow}
              textComponent={Fragment}
            >
              {
                errorPageProps ? (
                  <ErrorView
                    statusCode={errorPageProps.statusCode}
                    errorMessage={errorPageProps.errorMessage}
                  />
                ) : (
                  <Component
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...pageProps}
                  />
                )
              }
            </IntlProvider>
          </AlertProvider>
        </ThemeProvider>

      </>
    );
  }
}

export default App;
