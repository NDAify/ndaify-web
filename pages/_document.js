import React, { Fragment } from 'react';
import Document from 'next/document';

import { ServerStyleSheet, createGlobalStyle } from 'styled-components';

import Head from '../components/Head/Head';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Signerica Fat;
    src: url('fonts/Signerica_Fat.ttf');
  }

  body {
    font-family: 'Raleway', sans-serif;
    background-color: #424657;
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(
          <Fragment>
            <Head />
            <GlobalStyle />
            <App {...props} />
          </Fragment>,
        ),
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
