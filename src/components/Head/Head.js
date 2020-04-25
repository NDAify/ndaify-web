import React from 'react';
import NextHead from 'next/head';

const META_DESCRIPTION = 'NDAify helps you keep your trade secrets under wraps.';
const TITLE = 'NDAify';

export const PageTitle = ({ title = TITLE, prepend = '', append = '' }) => (
  <NextHead>
    <title>{`${prepend}${title}${append}`}</title>
  </NextHead>
);

export const PageAlternate = (href) => (
  <NextHead>
    <link rel="alternate" href={href} />
  </NextHead>
);

const Head = ({ description = META_DESCRIPTION }) => (
  <NextHead>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#424657" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:200,400,700&display=swap" />

    <link rel="shortcut icon" href="/favicon.png" />
  </NextHead>
);

export default Head;
