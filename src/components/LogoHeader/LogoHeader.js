import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import LogoWithTextIcon from './images/logoWithText.svg';

const ThemeLogoWithTextIcon = styled(LogoWithTextIcon)`
  path#logo-type {
    fill: var(--ndaify-fg);
  }
`;

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
    <Link passHref href="/">
      <a>
        <LogoWithTextIconWrapper>
          <ThemeLogoWithTextIcon />
        </LogoWithTextIconWrapper>
      </a>
    </Link>
  </LogoContaier>
);

export default LogoHeader;
