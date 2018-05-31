import React from 'react';
import Link from 'next/link';

import Head from '../components/Head';
import LogoHeader from '../components/LogoHeader';
import Input from '../components/Input';
import Footer from '../components/Footer';

const Index = () => (
  <div className="container container-flex flex-row">
    <Head />
    <div className="padding-sm container-flex-center-both-ways container-max-width-768 flex-1 flex-column margin-top-lg">
      <LogoHeader />
      <div className="margin-sm container-max-width-576 form-container">
        <h3 className="text-grey text-xl">
          NDAify helps you keep your trade secrets under wraps.
          <span className="text-xl text-white">
            {' Try it '}
            <span className="font-indie">free</span>.
          </span>
        </h3>
        <h3 className="text-xl text-white margin-top-lg">
          Send an NDA in a couple minutes.
        </h3>
        <div className="margin-top-md">
          <Input placeholder="Paste a secret link" />
        </div>

        <h4 className="text-md text-light text-white margin-top-md">
          Try it out by sending yourself a{' '}
          <a className="text-underline">sample NDA</a>.
        </h4>
        <Link href="/form">
          <button className="margin-top-md text-lg text-light">Continue</button>
        </Link>
      </div>

      <footer className="margin-top-lg">
        <Footer />
        <span className="text-xs text-grey margin-top-md display-block text-light">
          NDAify is not a law firm, does not provide legal services or advice,
          and does not provide or participate in legal representation.
        </span>
      </footer>
    </div>

    <style jsx>
      {`
        button {
          background-color: #39d494;
        }
        .container {
          width: 100%;
          height: 100%;
          justify-content: center;
        }
      `}
    </style>
  </div>
);

export default Index;
