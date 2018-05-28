import React, { Fragment } from 'react';

const Input = props => (
  <Fragment>
    <input className="text-grey text-lg text-light margin-top-md" placeholder={props.placeholder} />

    <style jsx>{`
      input {
        background-color: #ffffff;
        border-radius: 4px;
        border: 0;
        width: 100%;
        height: 60px;
        text-align: center;
        letter-spacing: 1.8px;
      }

      @media screen and (min-width: 994px) {
        input {
          width: 536px;
        }
      }
    `}</style>
  </Fragment>
);

export default Input;
