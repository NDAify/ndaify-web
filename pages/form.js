import React from 'react';
import Link from 'next/link';

import Head from '../components/Head';
import LogoHeader from '../components/LogoHeader';
import Input from '../components/Input';
import Footer from '../components/Footer';
import LinkedInButton from '../components/LinkedInButton';

const Index = () => (
  <div className="container container-flex flex-row">
    <Head />
    <div className="border-box padding-sm container-flex-center-both-ways container-max-width-768 flex-1 flex-column margin-top-lg">
      <LogoHeader />
      <div className="margin-sm container-max-width-576 form-container">
        <div className="link-wrapper">
          <img className="hideIcon" src="/static/hideIcon.svg" alt="hidded icon" />
          <h4 className="text-grey text-lg text-wrap">
            https://www.dropbox.com/sh/55wo9a…
          </h4>
        </div>
        <h4 className="text-white text-lg margin-top-md">
          Recepient does not have access to your link unless he accepts the term of the NDA.
        </h4>

        <div className="margin-top-md">
          <Input placeholder="NDA type (one-way, mutual)" />
        </div>
        <div className="margin-top-md">
          <Input placeholder="Recipient name" />
        </div>
        <div className="margin-top-md">
          <Input placeholder="Recipient email" />
        </div>

        <Link href="/nda">
          <div className="container-flex margin-top-xl">
            <LinkedInButton color="#DC564A" buttonText="Review and Sign with LinkedIn" />
          </div>
        </Link>

      </div>

      <footer className="margin-top-lg">
        <span className="text-sm text-grey margin-top-lg display-block text-light">
          Signing the NDA signifies that you have read and agree to the {' '}
          <a className="text-white text-underline">Terms of Use</a>
          {' and '}
          <a className="text-white text-underline">Privacy Policy</a>.
        </span>
        <Footer />
      </footer>
    </div>

    <style jsx>
      {`
        .link-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .hideIcon {
          width: 28px;
          margin-left: 0;
          margin-right: 1pc;
        }

        .container {
          width: 100%;
          height: 100%;
          justify-content: center;
        }

        @media screen and (min-width: 994px) {
          .link-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .hideIcon {
            width: 36px;
            margin-left: -56px;
            margin-right: 1pc;
          }
        }
      `}
    </style>
  </div>
);

export default Index;
