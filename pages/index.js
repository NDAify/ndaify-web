import React from 'react';

import Head from '../components/Head';
import LogoHeader from '../components/LogoHeader';

const Index = () => (
  <div className="container container-flex">
    <Head />
    <div className="padding-sm container-flex-center-both-ways container-max-width-768 flex-1 flex-column margin-top-lg">
      <LogoHeader />
      <div className="margin-sm container-max-width-576 form-container">
        <p className="text-grey text-32">
          NDAify helps you keep your trade secrets under wraps.
          <span className="text-32 text-white">{' Try it '}
            <span className="font-indie">free</span>.
          </span>
        </p>
        <p className="text-32 text-white magin-top-lg">Send an NDA in a couple minutes.</p>
      </div>
    </div>

    <style jsx>{`
      .container {
        width: 100%;
        height: 100%;
        justify-content: center;
      }
    `}
    </style>

    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        font-family: 'Raleway', sans-serif;
        letter-spacing: 0.6px;
        background-color: #424657;
      }

      .text-16 {
        font-size: 16px;
      }

      .text-24 {
        font-size: 24px;
      }

      .text-32 {
        font-size: 32px;
      }

      .text-white {
        color: #ffffff;
      }

      .text-grey {
        color: #aaaaaa;
      }

      .text-underline {
        text-decoration: underline;
      }

      .container-flex {
        display: flex;
      }

      .container-flex-center-both-ways {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .container-max-width-768 {
        max-width: 768px;
      }

      .container-max-width-576 {
        max-width: 576px;
      }

      .flex-1 {
        flex: 1;
      }

      .flex-row {
        flex-direction: row;
      }

      .flex-column {
        flex-direction: column;
      }

      .margin-top-lg {
        margin-top: 3pc;
      }

      .margin-sm {
        margin: 1pc;
      }

      .padding-sm {
        padding: 1pc;
      }

      .form-container {
        margin: 1pc;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .form {
        border-radius: 4px;
        border: 0;
      }

      .font-indie {
        font-family: 'Shadows Into Light', cursive;
      }
    `}</style>
  </div>
);

export default Index;
