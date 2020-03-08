import React from 'react';
import styled from 'styled-components';
import { Link } from '../../routes';

const LogoContaier = styled.div`
  width: 100%;
  display: flex;
  `;

const Logo = styled.img`
  width: 216px;
`;

const LogoHeader = () => (
  <LogoContaier>
    <Link route="/">
      <a>
        <Logo src="/static/logoWithText.svg" alt="ndaify-logo" />
      </a>
    </Link>
  </LogoContaier>
);

export default LogoHeader;
