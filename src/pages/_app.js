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

const MESSAGES = {
  es,
  'es-ES': es,
  'es-US': es,
  'es-MX': es,
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Signerica Fat;
    src: url('/fonts/Signerica_Fat.ttf');
  }

  body {
    font-family: 'Raleway', sans-serif;
    background-color: #424657;
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  // mute reach-ui missing style warnings
  :root {
    --reach-menu-button: 1;
    --reach-dialog: 1;
  }
`;

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
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

    return {
      errorPageProps,
      locale,
      messages: MESSAGES[locale],
      pageProps,
      ssrNow,
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
    } = this.props;

    return (
      <>
        <Head />
        <GlobalStyle />

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

      </>
    );
  }
}

export default App;
