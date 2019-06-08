import React, { Fragment } from 'react';
import NextApp, { Container } from 'next/app';
import NProgress from 'nprogress';
import { Router } from '../routes';

import { PageTitle } from '../components/Head/Head';

import '../css/nprogress.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <PageTitle />
        <Container>
          <Component {...pageProps} />
        </Container>
      </Fragment>
    );
  }
}

export default App;
