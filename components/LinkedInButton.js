import React, { Fragment } from 'react';

const LinkedInButton = props => (
  <Fragment>
    <button className="text-grey text-lg text-light container-flex-center-align-items">
      <img className="linkedInLogo" src="/static/linkedInLogo.svg" alt="linkedin-logo" />
      <span className="flex-1 text-white">{props.buttonText}</span>
    </button>

    <style jsx>{`
      button {
        background-color: ${props.color};
        padding: 0;
      }

      .linkedInLogo {
        width: 64px;
        height: 64px;
        margin-top: -2px;
      }
    `}</style>
  </Fragment>
);

export default LinkedInButton;
