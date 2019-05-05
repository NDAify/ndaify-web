import React from 'react';
import Link from 'next/link';

import LogoHeader from '../components/LogoHeader/LogoHeader';
import Footer from '../components/Footer/Footer';

const FinalForm = () => (
  <div className="container container-flex flex-row">
    <div className="border-box padding-sm container-flex-center-both-ways container-max-width-768 flex-1 flex-column margin-top-lg">
      <LogoHeader />

      <div className="container-max-width-576 form-container payment-form">
        <p className="text-white text-lg margin-top-md text-light text-align-center">
          Your request has been sent to Jeremy Voss. You will be notified when
          Jeremy views and/or accepts the NDA.
        </p>
        <Link href="/recipient-nda">
          <button className="margin-top-xl text-lg text-light">Okay</button>
        </Link>
      </div>

      <footer className="margin-top-lg">
        <span className="text-sm text-grey margin-top-lg display-block text-light">
          Signing the NDA signifies that you have read and agree to the{' '}
          <a className="text-white text-underline">Terms of Use</a>
          {' and '}
          <a className="text-white text-underline">Privacy Policy</a>.
        </span>
        <Footer />
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

        .payment-form {
          margin-top: 6pc;
        }

        .reset-line-height {
          line-height: normal;
        }

        @media screen and (min-width: 994px) {
        }
      `}
    </style>
  </div>
);

export default FinalForm;
