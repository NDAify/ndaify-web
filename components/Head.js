import React, { Fragment } from 'react';
import NextHead from 'next/head';

const Head = (props) => {
  const { title, description } = props;

  return (
    <Fragment>
      <NextHead>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content={description || 'NDAify helps you keep your trade secrets under wraps 🔒'} />
        <meta name="theme-color" content="#000000" />
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,400,700" rel="stylesheet" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <title>{title || 'NDAify'}</title>
      </NextHead>
    </Fragment>
  );
};

export default Head;
