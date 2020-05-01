import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import LogoWithTextIcon from './images/logoWithText.svg';

const Container = styled.footer`
  margin-top: 3pc;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FooterLogoContainer = styled.div`
  margin-top: 7pc;
  display: flex;
  justify-content: center;
  margin-bottom: 2pc;
`;

const FooterLogoWrapper = styled.div`
  svg {
    height: 50px;
  }
`;

const Disclaimer = styled.span`
  color: #aaaaaa;
  font-size: 12px;
  text-align: center;
  display: block;
  font-weight: 200;
  line-height: 20px;

  a {
    text-decoration: underline;
    color: #aaaaaa;
  }

  a:visited {
    color: #aaaaaa;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FootetTextWrapper = styled.div`
  margin-bottom: 3pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled.span`
  font-size: 16px;
  font-weight: 200;
  margin-top: 1pc;
  color: #ffffff;
  margin-bottom: 1pc;
  text-align: center;

  a {
    text-decoration: underline;
    background-color: transparent;
    color: #ffffff;
    cursor: pointer;
    transition: none;
  }

  a:visited {
    color: #ffffff;
  }
`;

const currentYear = (new Date()).getFullYear();

const Footer = ({ withLogo }) => (
  <Container>
    {withLogo && (
      <FooterLogoContainer>
        <Link passHref href="/">
          <a>
            <FooterLogoWrapper>
              <LogoWithTextIcon />
            </FooterLogoWrapper>
          </a>
        </Link>
      </FooterLogoContainer>
    )}

    <FootetTextWrapper>
      <FooterText>
        Powered by 25% sweet no ice coconut green tea with oat milk & boba.
      </FooterText>
      <FooterText>
        {`© ${currentYear}`}
        {' '}
        <a
          href="https://github.com/ndaify"
          target="_blank"
          rel="noopener noreferrer"
        >
          NDAify
        </a>
      </FooterText>
    </FootetTextWrapper>

    <Disclaimer>
      NDAify is not a law firm, does not provide legal services or advice, and
      does not provide or participate in legal representation. Singing the NDA
      signifies that you have read and agree to the
      {' '}
      <a target="_blank" rel="noopener noreferrer" href="/terms">Terms of Use</a>
      {' '}
      and
      {' '}
      <a target="_blank" rel="noopener noreferrer" href="/privacy">Privacy Policy</a>
      {' '}
      .
    </Disclaimer>
    <FooterContainer />
  </Container>
);

export default Footer;
