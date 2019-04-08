import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';

import Head from '../components/Head';
import LogoHeader from '../components/LogoHeader/LogoHeader';
import Input from '../components/Input/Input';
import Footer from '../components/Footer';

const Button = styled.button`
  background-color: #39d494;
`;

const Dialog = styled.div`
  height: 100%;
  position: relative;
  background: #383b49;
  border-radius: 0.4em;
  line-height: 28px;

  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 6%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-top-color: #383b49;
    border-bottom: 0;
    border-right: 0;
    margin-left: -6px;
    margin-bottom: -12px;
  }
`;

const FinalForm = () => (
  <div className="container container-flex flex-row">
    <Head />
    <div className="border-box padding-sm container-flex-center-both-ways container-max-width-768 flex-1 flex-column margin-top-lg">
      <LogoHeader />

      <div className="border-box">
        <h3 className="text-white text-xl margin-top-md text-bold text-align-center">
          One last thing before delivery…
        </h3>

        <Dialog className="dialog padding-md margin-top-md">
          <p className="text-white text-md text-light">Hi Joe,</p>
          <p className="text-white text-md text-light margin-top-md">
            It costs money to keep NDAify running. If you use the service and
            find it valuable, plese help me stay online by making a small
            donation.
          </p>
          <p className="text-white text-md text-light margin-top-md">
            Or, share a good reason below for why you can’t pay and you can
            still use NDAify for free.
          </p>

          <p className="text-white text-md text-light margin-top-md">
            Any questions or comments? Just send me a tweet, I’m always
            listening.
          </p>
          <p className="text-white text-md text-light margin-top-md">
            Thank you for using NDAify!
          </p>
        </Dialog>
        <div className="container-flex container-flex-center-align-items margin-top-left-md">
          <img className="julia" src="/static/julia.png" alt="julia" />
          <div className="container-flex flex-column margin-left-sm">
            <span className="text-white text-md text-light">Julia</span>
            <a className="text-white text-md text-light text-underline">
              @juliaqiuxy
            </a>
          </div>
        </div>
      </div>

      <div className="container-max-width-576 form-container payment-form">
        <div className="container-flex container-space-between two-col-form">
          <div className="flex-1 responsive-input-wrapper">
            <Input placeholder="Name on card" />
          </div>
          <div className="flex-1 responsive-input-wrapper">
            <Input placeholder="Card number" />
          </div>
        </div>
        <div className="container-flex container-space-between margin-top-sm two-col-form">
          <div className="flex-1 responsive-input-wrapper">
            <Input placeholder="MM / YY" />
          </div>
          <div className="flex-1 responsive-input-wrapper">
            <Input placeholder="CVC" />
          </div>
        </div>

        <div className="container-flex container-space-between container-flex-center-align-items margin-top-sm">
          <div className="line" />
          <span className="or text-bold text-md">Or</span>
          <div className="line" />
        </div>

        <div className="margin-top-sm">
          <Input placeholder="I can’t pay because…" />
        </div>

        <h4 className="text-white text-lg text-light margin-top-lg">
          Total $ 1.00
        </h4>

        <Link href="final-success">
          <Button className="margin-top-md text-lg text-light">Send</Button>
        </Link>
      </div>

      <div className="footer-img-wrapper">
        <img src="/static/footerLogo.svg" alt="ndaify logo" />
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

        .container {
          width: 100%;
          height: 100%;
          justify-content: center;
        }

        .payment-form {
          margin-top: 6pc;
        }

        .two-col-form {
          width: 100%;
          flex-direction: column;
          height: 140px;
        }

        .responsive-input-wrapper:nth-child(2) {
          margin-left: 0;
        }

        .line {
          height: 3px;
          width: 200px;
          background-color: #aaaaaa;
          margin-left: 1pc;
          margin-right: 1pc;
        }

        .or {
          color: #aaaaaa;
          text-transform: uppercase;
        }

        .footer-img-wrapper {
          margin-top: 7pc;
          display: flex;
          justify-content: center;
        }

        @media screen and (min-width: 994px) {
          .two-col-form {
            flex-direction: row;
            height: auto;
          }

          .responsive-input-wrapper:nth-child(2) {
            margin-left: 1pc;
          }
        }
      `}
    </style>
  </div>
);

export default FinalForm;
