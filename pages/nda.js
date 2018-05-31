import React from 'react';
import Link from 'next/link';

import Head from '../components/Head';
import Footer from '../components/Footer';

const NDA = () => (
  <div className="container container-flex-center-both-ways flex-column">
    <Head />
    <div className="padding-md banner-conatiner">
      <div className="container-flex">
        <span className="text-white text-lg text-light display-block">
          Joe Doe
        </span>
        <span className="text-white text-lg text-light email">
          {'<joe@gmail.com>'}
        </span>
      </div>
      <button className="cancle text-lg text-light">Cancel</button>
    </div>
    <div className="padding-sm container-flex-center-both-ways container-max-width-768 flex-1 flex-column margin-top-lg border-box">
      <div className="container-max-width-576 container-flex-center-align-items flex-column">
        <div className="text-align-center">
          <h4 className="text-white text-lg margin-top-md text-bold">
            Almost done.
          </h4>
          <h4 className="text-white text-lg text-light margin-top-md">
            By signing, both <span className="text-bold">you</span> and{' '}
            <span className="text-bold">Jeremy Voss</span> will agree to terms
            of an NDA to{' '}
            <span className="text-bold">
              protect all parties and materials disclosed
            </span>.
          </h4>
        </div>
      </div>
      <div className="text-align-center">
        <h4 className="text-white text-xl margin-top-lg text-light">
          <span>Non-Disclosure</span>
          <br />
          <span>Agreement</span>
        </h4>
      </div>

      <div className="margin-top-md agreement-content-wrapper">
        <div>
          <span className="text-white text-md text-cap text-bold">
            This Agreement{' '}
          </span>
          <span className="text-white text-md">
            is made on December 6th, 2017.
          </span>
        </div>
        <div>
          <span className="text-white text-md text-cap text-bold">Between</span>
          <div className="container-flex flex-column between text-light">
            <span className="text-white text-md">
              1.{' '}
              <span className="editable-content text-bold" contentEditable>
                Joe Doe
              </span>{' '}
              (the Disclosing Party); and
            </span>
            <span className="text-white text-md">
              2.{' '}
              <span className="editable-content text-bold" contentEditable>
                Jeremy Voss, Flake, Inc.
              </span>{' '}
              (the Receiving Party), collectively referred to as the Parties.
            </span>
          </div>
          <span className="text-white text-md text-light margin-top-sm display-block">
            collectively referred to as the{' '}
            <span className="text-bold">Parties</span>.
          </span>
        </div>
        <div className="margin-top-sm">
          <span className="text-white text-md text-cap text-bold">
            RECITALS
          </span>
          <p className="text-white text-md text-light agreement-content-p margin-top-sm">
            A. The Receiving Party understands that the Disclosing Party has
            disclosed or may disclose information relating to its business,
            operations, plans, prospects, affairs, source code, product designs,
            art, and other related concepts, which to the extent previously,
            presently, or subsequently disclosed to the Receiving Party is
            hereinafter referred to as Proprietary Information of the Disclosing
            Party.
          </p>
        </div>
        <div className="margin-top-sm">
          <span className="text-white text-md text-cap text-bold">
            OPERATIVE PROVISIONS
          </span>
          <p className="text-white text-md text-light agreement-content-p margin-top-sm">
            1. In consideration of the disclosure of Proprietary Information by
            the Disclosing Party, the Receiving Party hereby agrees: (i) to hold
            the Proprietary Information in strict confidence and to take all
            reasonable precautions to protect such Proprietary Information
            (including, without limitation, all precautions…
          </p>
        </div>

        <div className="readmore margin-top-xl">
          <h4 className="text-white text-md text-bold">
            To read all terms,{' '}
            <a className="text-light text-underline">click here</a>.
          </h4>
        </div>

        <div className="container-flex button-wrapper margin-top-xl container-space-between">
          <div className="flex-column container-flex-center-align-items ">
            <button className="resend text-lg text-light">Resend</button>
            <span className="text-white text-md margin-top-sm">
              Jeremy Voss
            </span>
            <span className="text-white text-md reset-line-height">
              Flake, Inc.
            </span>
          </div>
          <div className="flex-column container-flex-center-align-items ">
            <Link href="/final-form">
              <button className="sign text-lg text-light">Sign</button>
            </Link>
            <span className="text-white text-md margin-top-sm">Joe Doe</span>
          </div>
        </div>

        <div className="margin-top-lg">
          <h4 className="text-white text-xl  text-light">Attachments</h4>
          <div className="link-wrapper margin-top-sm">
            <img
              className="hideIcon"
              src="/static/hideIcon.svg"
              alt="hidded icon"
            />
            <h4 className="text-grey text-lg link text-wrap">
              https://www.dropbox.com/sh/55wo9a…
            </h4>
          </div>
          <span className="text-white text-md text-light reset-line-height margin-top-sm display-block">
            Recepient will not have access to your link unless he accepts the
            term of the NDA.
          </span>
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
    </div>

    <style jsx>
      {`
        button {
          width: 230px;
        }

        .email {
          margin-left: 0;
        }

        .banner-conatiner {
          background-color: #5dbfc8;
          width: 100%;
          height: auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .cancle {
          background-color: #dc564a;
          width: 160px;
          margin-top: 1pc;
        }

        .resend {
          background-color: #7254b7;
        }

        .sign {
          background-color: #5dbfc8;
        }

        .container {
          width: 100%;
          height: 100%;
          justify-content: center;
        }

        .agreement-content-wrapper {
          width: 100%;
        }

        .between {
          margin-left: 1pc;
          line-height: 34px;
        }

        .editable-content {
          padding: 4px;
          border: 1px dashed #00ab6c;
        }

        .agreement-content-p {
          line-height: 28px;
        }

        .readmore {
          width: 100%;
          text-align: center;
        }

        .reset-line-height {
          line-height: normal;
        }

        .button-wrapper {
          flex-direction: column;
          height: 300px;
        }

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

        .footer-img-wrapper {
          margin-top: 7pc;
          display: flex;
          justify-content: center;
        }

        @media screen and (min-width: 994px) {
          .email {
            margin-left: 1pc;
          }

          .banner-conatiner {
            height: 90px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .cancle {
            margin-top: 0;
          }

          .button-wrapper {
            flex-direction: row;
            height: auto;
          }

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

export default NDA;
