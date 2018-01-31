import React from 'react';
import logo from './logo.svg';
import './LogoHeader.css';

const LogoHeader = () => (
  <div className="LogoHeader-container">
    <img className="LogoHeader-image" src={logo} alt="ndaify-logo" />
  </div>
);

export default LogoHeader;
