import React from 'react';
import LogoHeader from '../LogoHeader/LogoHeader';

/* eslint-disable max-len */
const Home = () => (
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
);
/* eslint-enable */

export default Home;
