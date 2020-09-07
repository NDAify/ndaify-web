import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useIntl, defineMessage, FormattedMessage } from 'react-intl';

import LogoWithTextIcon from './images/logoWithText.svg';

import { SelectInputImpl } from '../Input/SelectInput';

import useTheme from '../../lib/useTheme';
import useLocale from '../../lib/useLocale';

import SunIcon from './images/sun.svg';
import MoonIcon from './images/moon.svg';
import MonitorIcon from './images/monitor.svg';
import GlobeIcon from './images/globe.svg';

const systemThemeLabel = defineMessage({
  id: 'footer-system-theme-label',
  defaultMessage: 'System Theme',
});

const systemThemeLabelDark = defineMessage({
  id: 'footer-system-theme-label-dark',
  defaultMessage: 'Dark',
});

const systemThemeLabelLight = defineMessage({
  id: 'footer-system-theme-label-light',
  defaultMessage: 'Light',
});

const systemLanguageLabel = defineMessage({
  id: 'footer-system-language-label',
  defaultMessage: 'System Language',
});

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
  padding-bottom: 1pc;

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

const FooterNavigation = styled.nav`
  padding: 0;
  margin: 0;
  margin-bottom: 2pc;
`;

const FooterNavigationItem = styled.span`
  float: left;
  width: 100%;
  text-align: center;
  font-weight: 200;
  font-size: 16px;
  color: var(--ndaify-fg);
  list-style-type: none;
  padding: 8px;
  
  @media screen and (min-width: 576px) {
    width: auto;
    padding-right: 1pc;
    padding-left: 1pc;
  }

  & a {
    color: inherit;
  }

  & a:visited {
    color: inherit;
  }
`;

const FooterTextWrapper = styled.div`
  margin-bottom: 2pc;
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

const PreferencesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 3pc;
  flex-direction: column;

  @media screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

const PreferencesInputWrapper = styled.div`
  min-width: 60%;
  padding: 8px;

  @media screen and (min-width: 992px) {
    min-width: 40%;
  }
`;

const currentYear = (new Date()).getFullYear();

const Footer = (props) => {
  const intl = useIntl();

  const [preferredTheme, setPreferredTheme] = useTheme();
  const [preferredLocale, setPreferredLocale] = useLocale();

  let themeIcon = MonitorIcon;
  if (preferredTheme === 'dark') {
    themeIcon = MoonIcon;
  } else if (preferredTheme === 'light') {
    themeIcon = SunIcon;
  }

  const THEME_OPTIONS = [
    {
      label: intl.formatMessage(systemThemeLabel),
      value: 'system',
    },
    {
      label: intl.formatMessage(systemThemeLabelDark),
      value: 'dark',
    },
    {
      label: intl.formatMessage(systemThemeLabelLight),
      value: 'light',
    },
  ];

  const LOCALE_OPTIONS = [
    {
      label: intl.formatMessage(systemLanguageLabel),
      value: 'system',
    },
    {
      label: 'English',
      value: 'en',
    },
    {
      label: '中文',
      value: 'zh',
    },
  ];

  return (
    <Container>
      {props.withLogo && (
        <FooterLogoContainer>
          <Link passHref href="/">
            <a aria-label="NDAify">
              <FooterLogoWrapper>
                <ThemeLogoWithTextIcon />
              </FooterLogoWrapper>
            </a>
          </Link>
        </FooterLogoContainer>
      )}

      <FooterNavigation>
        <FooterNavigationItem>
          <a
            href="/privacy"
            target="_blank"
            rel="noopener"
          >
            <FormattedMessage
              id="footer-nav-privacy"
              defaultMessage="Privacy Policy"
            />
          </a>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <a
            href="/terms"
            target="_blank"
            rel="noopener"
          >
            <FormattedMessage
              id="footer-nav-terms"
              defaultMessage="Terms of Use"
            />
          </a>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <a
            href="/dev/docs"
            target="_blank"
            rel="noopener"
          >
            <FormattedMessage
              id="footer-nav-developers"
              defaultMessage="Developers"
            />
          </a>
        </FooterNavigationItem>
      </FooterNavigation>

      {
        props.renderContent && props.renderContent()
      }

      <FooterTextWrapper>
        <FooterText>
          <FormattedMessage
            id="footer-powered-by"
            defaultMessage="Powered by 25% sweet no ice coconut green tea with oat milk & boba."
          />
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
      </FooterTextWrapper>

      <PreferencesContainer>
        <PreferencesInputWrapper>
          <SelectInputImpl
            compact
            outline
            name="theme"
            labelIcon={themeIcon}
            value={THEME_OPTIONS.find((opt) => opt.value === (preferredTheme || 'system')).value}
            options={THEME_OPTIONS}
            placeholder="Theme"
            onChange={(e) => {
              const { value } = e.target;
              if (value === 'system') {
                setPreferredTheme(null);
              } else {
                setPreferredTheme(value);
              }
            }}
          />
        </PreferencesInputWrapper>
        <PreferencesInputWrapper>
          <SelectInputImpl
            compact
            outline
            labelIcon={GlobeIcon}
            name="locale"
            value={LOCALE_OPTIONS.find((opt) => opt.value === (preferredLocale || 'system')).value}
            options={LOCALE_OPTIONS}
            placeholder="Locale"
            onChange={(e) => {
              const { value } = e.target;
              if (value === 'system') {
                setPreferredLocale(null);
              } else {
                setPreferredLocale(value);
              }
            }}
          />
        </PreferencesInputWrapper>

      </PreferencesContainer>

      <Disclaimer>
        <FormattedMessage
          id="footer-nav-disclaimer"
          defaultMessage="NDAify is not a law firm, does not provide legal services or advice, and does not provide or participate in legal representation. Signing the NDA signifies that you have read and agree to the {privacyPolicy} and {termsOfUse}. When NDAify.com is displayed in a language other than English, we translate the most important information for your browsing and communications. Our translations are provided for your convenience. The English version of NDAify.com, including our Privacy Policy, Terms of Use and the Nondisclosure Agreements, is the definitive version."
          values={{
            privacyPolicy: (
              <a target="_blank" rel="noopener" href="/terms">
                <FormattedMessage
                  id="footer-nav-terms"
                  defaultMessage="Terms of Use"
                />
              </a>
            ),
            termsOfUse: (
              <a target="_blank" rel="noopener" href="/privacy">
                <FormattedMessage
                  id="footer-nav-privacy"
                  defaultMessage="Privacy Policy"
                />
              </a>
            ),
          }}
        />
      </Disclaimer>

      <FooterContainer />
    </Container>
  );
};

export default Footer;
