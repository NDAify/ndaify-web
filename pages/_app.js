import React, { Fragment } from 'react';
import NextApp, { Container } from 'next/app';
import NProgress from 'nprogress';
import { IntlProvider } from 'react-intl';
import { positions, Provider as AlertProvider } from 'react-alert';

import { Router } from '../routes';

import { PageTitle } from '../components/Head/Head';
import Alert from '../components/Alert/Alert';

import '../css/nprogress.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
  window.scrollTo(0, 0);
});
Router.events.on('routeChangeError', () => NProgress.done());

const ALERT_OPTIONS = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const ssrNow = Date.now();

    return { pageProps, ssrNow };
  }

  render() {
    const { Component, pageProps, ssrNow } = this.props;

    return (
      <>

        <PageTitle />

        <AlertProvider template={Alert} {...ALERT_OPTIONS}>
          <Container>
            <IntlProvider
              locale="en"
              timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
              messages={{}}
              initialNow={ssrNow}
              textComponent={Fragment}
            >
              <Component {...pageProps} />
            </IntlProvider>
          </Container>
        </AlertProvider>

      </>
    );
  }
}

export default App;
