import React from 'react';

const LogoHeader = () => (
  <div className="container">
    <img src="/static/logo.svg" alt="ndaify-logo" />

    <style jsx>{`
      div {
        width: 100%;
        display: flex;
      }

      img {
        height: 120px;
      }
    `}</style>
  </div>
);

export default LogoHeader;
