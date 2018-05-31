import React, { Fragment } from 'react';
import NextHead from 'next/head';
import { NORMALIZE_STYLE, GLOBAL_STYLE } from './globalStyles';

const Head = props => (
  <Fragment>
    <NextHead>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content={props.description || 'NDAify helps you keep your trade secrets under wraps 🔒'} />
      <meta name="theme-color" content="#000000" />
      <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Mrs+Saint+Delafield" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,400,700" rel="stylesheet" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <title>{props.title || 'NDAify'}</title>
    </NextHead>

    <style jsx global>{ GLOBAL_STYLE }</style>

    <style jsx global>{ NORMALIZE_STYLE }</style>
  </Fragment>
);

export default Head;
