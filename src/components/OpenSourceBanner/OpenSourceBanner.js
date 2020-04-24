import React from 'react';
import styled from 'styled-components';

import GithubLogoIcon from './images/githubLogo.svg';

const BannerLink = styled.a`
  background-color: #edd9a3;
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
  color: #424657;
  font-weight: 200;
  text-align: center;
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
