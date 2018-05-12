import React from 'react';
import NextHead from 'next/head';
import normalize from 'normalize.css/normalize.css';

const Head = props => (
  <NextHead>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content={props.description || 'NDAify helps you keep your trade secrets under wraps 🔒'} />
    <meta name="theme-color" content="#000000" />
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,600" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <title>NDAify</title>
    <style>{normalize}</style>
  </NextHead>
);

export default Head;
