import React from 'react';

import styled from 'styled-components';

const LogoContaier = styled.div`
  width: 100%;
  display: flex;
  `;

const Logo = styled.img`
  width: 216px;
`;

const LogoHeader = () => (
  <LogoContaier>
    <Logo src="/static/logoWithText.svg" alt="ndaify-logo" />
  </LogoContaier>
);

export default LogoHeader;
