import React, { Fragment } from 'react';
import Document from 'next/document';

import { ServerStyleSheet, createGlobalStyle } from 'styled-components';

import Head from '../components/Head';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
  }

  body {
    margin: 0;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b, strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  @font-face {
    font-family: Signerica Fat;
    src: url('fonts/Signerica_Fat.ttf');
  }

  .background {
    background-color: purple;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito Sans', sans-serif;
    dont-size: 16px;
    font-weight: 400;
    letter-spacing: 0.6px;
    background-color: #424657;
    color: #ffffff;
  }

  h3 {
    font-weight: 400;
    margin: 0;
  }

  h4 {
    font-weight: 400;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  button {
    border-radius: 4px;
    border: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    letter-spacing: 1.8px;
    color: #ffffff;
    cursor: pointer;
  }

  footer {
    margin-bottom: 3pc;
  }

  .border-box {
    box-sizing: border-box;
  }

  .text-cap {
    text-transform: uppercase;
  }

  .text-align-center {
    text-align: center;
  }

  .text-xs {
    font-size: 12px;
  }

  .text-xs {
    font-size: 12px;
  }

  .text-sm {
    font-size: 12px;
  }

  .text-md {
    font-size: 16px;
  }

  .text-lg {
    font-size: 20px;
  }

  .text-xl {
    font-size: 28px;
  }
  .text-white {
    color: #ffffff;
  }

  .text-grey {
    color: #aaaaaa;
  }

  .text-light {
    font-weight: 200;
  }

  .text-bold {
    font-weight: 700;
  }

  .text-underline {
    text-decoration: underline;
  }

  .text-wrap {
    word-wrap: break-word;
  }

  .position-relative {
    position: relative;
  }

  .container-flex {
    display: flex;
  }

  .container-space-between {
    justify-content: space-between;
  }

  .container-flex-center-align-items {
    display: flex;
    align-items: center;
  }

  .container-flex-center-justify-content {
    display: flex;
    justify-content: center;
  }

  .container-flex-center-both-ways {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-max-width-768 {
    max-width: 768px;
    width: 100%;
  }

  .container-max-width-576 {
    max-width: 576px;
    width: 100%;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-row {
    flex-direction: row;
  }

  .flex-column {
    flex-direction: column;
  }

  .margin-top-sm {
    margin-top: 1pc;
  }

  .margin-top-md {
    margin-top: 2pc;
  }

  .margin-top-lg {
    margin-top: 3pc;
  }

  .margin-top-xl {
    margin-top: 4pc;
  }

  .margin-top-left-md {
    margin-top: 2pc;
    margin-left: 2pc;
  }

  .margin-left-sm {
    margin-left: 1pc;
  }

  .margin-sm {
    margin: 1pc;
  }

  .padding-sm {
    padding: 1pc;
  }

  .padding-md {
    padding: 2pc;
  }

  .form-container {
    margin: 2pc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }

  .display-block {
    display: block;
  }

  .font-indie {
    font-family: 'Shadows Into Light', cursive;
  }

  .font-script {
    font-family: 'Signerica Fat', cursive;
  }

  @media screen and (min-width: 994px) {
    body {
      line-height: 38px;
    }

    .text-xs {
      font-size: 12px;
    }

    .text-sm {
      font-size: 16px;
    }

    .text-md {
      font-size: 20px;
    }

    .text-lg {
      font-size: 24px;
    }

    .text-xl {
      font-size: 32px;
    }
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
        styles: <>{initialProps.styles}{sheet.getStyleElement()}</>,
      };
    } finally {
      sheet.seal();
    }
  }
}
