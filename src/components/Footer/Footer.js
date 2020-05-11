import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import LogoWithTextIcon from './images/logoWithText.svg';
import Button from '../Clickable/Button';

import useTheme from '../../lib/useTheme';

const ThemeLogoWithTextIcon = styled(LogoWithTextIcon)`
  path#logo-type {
    fill: var(--ndaify-fg);
  }
`;

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
  color: var(--ndaify-accents-6);
  font-size: 12px;
  text-align: center;
  display: block;
  font-weight: 200;
  line-height: 20px;

  a {
    text-decoration: underline;
    color: var(--ndaify-accents-6);
  }

  a:visited {
    color: var(--ndaify-accents-6);
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
  color: var(--ndaify-fg);
  margin-bottom: 1pc;
  text-align: center;

  a {
    text-decoration: underline;
    background-color: transparent;
    color: var(--ndaify-fg);
    cursor: pointer;
    transition: none;
  }

  a:visited {
    color: var(--ndaify-fg);
  }
`;

const currentYear = (new Date()).getFullYear();

const Footer = ({ withLogo }) => {
  const [theme, setTheme] = useTheme();

  return (
    <Container>
      {withLogo && (
        <FooterLogoContainer>
          <Link passHref href="/">
            <a>
              <FooterLogoWrapper>
                <ThemeLogoWithTextIcon />
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
  
      <FootetTextWrapper>
        <FooterText>
          current theme: {theme}
        </FooterText>
        
        <Button 
         compact
         color="var(--ndaify-accents-info)"
          onClick={() => {
            setTheme('dark')
          }}
        >
          dark
        </Button>

        <Button 
         compact
         color="var(--ndaify-accents-info)"
          onClick={() => {
            setTheme('light')
          }}
        >
          light
        </Button>
        <Button 
         compact
         color="var(--ndaify-accents-info)"
          onClick={() => {
            setTheme(null)
          }}
        >
          system
        </Button>
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
};

export default Footer;
