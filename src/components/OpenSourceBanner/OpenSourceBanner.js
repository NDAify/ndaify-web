import React from 'react';
import styled from 'styled-components';

import GithubLogo from './images/githubLogo.svg';

const GithubLogoIcon = styled(GithubLogo)`
  color: var(--ndaify-accents-1);
`;

const BannerLink = styled.a`
  background-color: var(--ndaify-accents-9);
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const GithubLogoIconWrapper = styled.div`
  margin-left: 14px;
  margin-right: 8px;

  svg {
    width: 20px;
    height: auto;
  }
`;

const BannerText = styled.span`
  color: var(--ndaify-accents-0);
  font-weight: 200;
  padding: 8px;
  padding-left: 0;
`;

const OpenSourceBanner = () => (
  <BannerLink
    href="https://github.com/ndaify"
    target="_blank"
    rel="noopener noreferrer"
  >
    <GithubLogoIconWrapper>
      <GithubLogoIcon />
    </GithubLogoIconWrapper>
    <BannerText>
      NDAify is open source. Send a pull request on GitHub.
    </BannerText>
  </BannerLink>
);

export default OpenSourceBanner;
