import React, { Fragment } from 'react';
import NextApp from 'next/app';
import NProgress from 'nprogress';
import { IntlProvider } from 'react-intl';
import { positions, Provider as AlertProvider } from 'react-alert';

import Router from 'next/router';

import { PageTitle } from '../components/Head/Head';
import Alert from '../components/Alert/Alert';
import ErrorView from '../components/ErrorView/ErrorView';

import { EntityNotFoundError, APIError } from '../api';

import '../css/nprogress.css';

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

    return { pageProps, errorPageProps, ssrNow };
  }

  render() {
    const {
      Component, pageProps, errorPageProps, ssrNow,
    } = this.props;

    return (
      <>
        <PageTitle />

        <AlertProvider
          template={Alert}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...ALERT_OPTIONS}
        >
          <IntlProvider
            locale="en"
            timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            messages={{}}
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
