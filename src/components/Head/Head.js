import React from 'react';
import NextHead from 'next/head';
import { withRouter } from 'next/router';

import loggerClient from '../../db/loggerClient';

const META_KEYWORDS = [
  'NDA',
  'PANDA',
  'MNDA',
  'one-way NDA',
  'one way NDA',
  'mutual NDA',
  'privacy NDA',
  'NDA template',
  'NDA form',
  'mutual NDA',
  'disclosure template',
  'disclosure form',
  'nondisclosure agreement',
  'nondisclosure',
  'non-disclsoure',
  'non-disclsosure agreement',
  'non disclosure agreement',
  'non disclosure',
  'mutual nondisclosure agreement',
  'mutual confidentiality agreement',
  'disclosure agreement',
  'non disclosure PDF',
  'non disclosure agreement PDF',
  'confidentiality template',
  'confidentiality agreement',
  'free non disclosure agreement',
  'free NDA',
  'free MNDA',
  'free confidentiality agreement',
  'manage NDA',
  'NDA SaaS',
  'NDA PDF',
  'electronic NDA',
  'digital NDA',
  'download non disclosure agreement',
  'download NDA',
  'download MNDA',
  'downloadable NDA',
  'downloadable non-disclosure agreement',
  'downloadable non disclosure agreement',
  'downloadable MNDA',
  'eSignature',
  'e-sign',
  'esign NDA',
];
const META_DESCRIPTION = 'NDAify helps you keep your secrets under wraps. Send, sign, download and manage NDA online';
const TITLE = 'NDAify';

const JSONLD_DATA = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'NDAify',
  description: META_DESCRIPTION,
  url: 'https://ndaify.com',
  image: 'https://ndaify.com/images/meta.png',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://ndaify.com',
  },
};

const GOOGLE_MAX_LENGTH = 160;

export const PageTitle = ({ title = TITLE, prepend = '', append = '' }) => (
  <NextHead>
    <title>{`${prepend}${title}${append}`}</title>
    <meta property="og:title" content={title} key="og:title" />
    <meta name="twitter:title" key="twitter:title" content={title} />
  </NextHead>
);

export const PageDescription = ({ description = META_DESCRIPTION }) => {
  if (description.length > GOOGLE_MAX_LENGTH) {
    loggerClient.warn(`You should keep your page description under ${GOOGLE_MAX_LENGTH} characters`);
  }

  return (
    <NextHead>
      <meta name="description" content={description} />
      <meta
        property="og:description"
        key="og:description"
        content={description}
      />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={description}
      />
    </NextHead>
  );
};

export const PageAlternate = (href) => (
  <NextHead>
    <link rel="alternate" href={href} />
  </NextHead>
);

// StaticHead is rendered in _document
export const StaticHead = () => (
  <NextHead>
    { /* eslint-disable react/no-danger */}
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_ID}');
        `,
      }}
    />
    { /* eslint-enable react/no-danger */}

    {/* JsonLD */}
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_DATA) }}
    />
  </NextHead>
);

// Head is rendered in _app
const Head = withRouter((props) => (
  <NextHead>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />

    <meta name="keywords" content={META_KEYWORDS.join(', ')} />

    <meta name="theme-color" content="#424657" />

    <link rel="shortcut icon" href="/images/favicon.png" />
    <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
    <link rel="apple-touch-icon" href="/images/favicon.png" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;700&display=swap" />

    {/* OPEN GRAPH */}
    <meta property="og:locale" content={props.locale} />
    <meta property="og:type" key="og:type" content="website" />
    <meta
      property="og:url"
      key="og:url"
      content={`https://ndaify.com${props.router.asPath}`}
    />
    <meta
      property="og:image"
      key="og:image"
      content="https://ndaify.com/images/meta.png"
    />

    {/* TWITTER */}
    <meta
      name="twitter:card"
      key="twitter:card"
      content="summary_large_image"
    />
    <meta name="twitter:site" key="twitter:site" content="@ndaify" />
    <meta name="twitter:creator" key="twitter:creator" content="@ndaify" />
    <meta
      name="twitter:image"
      key="twitter:image"
      content="https://ndaify.com/images/meta.png"
    />
  </NextHead>
));

export default Head;
