import React from 'react';
import styled from 'styled-components';
import { Link } from '../../routes';

import LogoWithTextIcon from './images/logoWithText.svg';

const LogoContaier = styled.div`
  width: 100%;
  display: flex;
  `;

const LogoWithTextIconWrapper = styled.div`
  svg {
    width: 216px;
  }
`;

const LogoHeader = () => (
  <LogoContaier>
    <Link route="/">
      <a>
        <LogoWithTextIconWrapper>
          <LogoWithTextIcon />
        </LogoWithTextIconWrapper>
      </a>
    </Link>
  </LogoContaier>
);

export default LogoHeader;
