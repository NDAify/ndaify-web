import React, { Fragment } from 'react';

const CustomNote = ({ source }) => {
  if (!source) {
    return null;
  }

  let sourceData;

  if (source === 'Product Hunt') {
    sourceData = {
      name: 'Product Hunt',
      people: 'Product Hunter',
      logoSrc: '/static/productHuntLogo.png',
    };
  }

  if (source === 'Y Combinator') {
    sourceData = {
      name: 'Y Combinator',
      people: 'Hacker News Reader',
      logoSrc: '/static/YCombinatorLogo.png',
    };
  }

  return (
    <Fragment>
      <div className="container-flex-center-both-ways flex-column container">
        <div className="container-flex-center-both-ways margin-top-lg">
          <img className="logo" src="/static/logo.svg" alt="ndaify logo" />
          <img className="heart" src="/static/heart.svg" alt="heart" />
          <img
            className="sourceLogo"
            src={sourceData.logoSrc}
            alt={sourceData.name}
          />
        </div>

        <div className="border-box container-max-width-768 margin-top-lg">
          <div className="dialog padding-md">
            <p className="text-white text-md text-light">Hey {sourceData.people},</p>
            <p className="text-white text-md text-light margin-top-md">
              I’m Julia. Thanks for checking out NDAify. This is a free and
              open-source project I work on in my spare time. It helps you quickly
              put secrets behind an NDA-wall.
            </p>
            <p className="text-white text-md text-light margin-top-md">
              Any questions or comments? Just send me a tweet, I’m always
              listening.
            </p>
          </div>
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
      </div>
      <style jsx>
        {`
          .logo {
            width: 42px;
          }

          .heart {
            width: 30px;
            margin-left: 3pc;
          }

          .sourceLogo {
            width: 54px;
            margin-left: 3pc;
          }

          .container {
            width: 100%;
            height: 100%;
            background-color: #4f5263;
            padding-bottom: 3pc;
          }

          .dialog {
            height: 100%;
            position: relative;
            background: #383b49;
            border-radius: 0.4em;
            line-height: 28px;
          }

          .dialog:after {
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
        `}
      </style>
    </Fragment>
  );
};

export default CustomNote;
