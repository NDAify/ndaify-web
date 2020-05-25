import React from 'react';
import { RedocStandalone } from 'redoc';
import {
  darken,
  desaturate,
  lighten,
  readableColor,
  transparentize,
} from 'polished';
import styled from 'styled-components';
import Router from 'next/router';
import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';
import OpenSourceBanner from '../OpenSourceBanner/OpenSourceBanner';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const RedocContainer = styled.div`
  margin-top: 1pc;
  width: 100%;
  background-color: #FFFFFF;
  
  & .redoc-markdown a {
    text-decoration: underline;
  }

  & a[href="https://github.com/Redocly/redoc"] { 
    margin-top: 2pc;
    opacity: 0.4; 
    text-decoration: none;
  }
`;

const ProfileImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-right: 12px;
`;

const defaultTheme = {
  spacing: {
    unit: 5,
    sectionHorizontal: ({ spacing }) => spacing.unit * 8,
    sectionVertical: ({ spacing }) => spacing.unit * 8,
  },
  breakpoints: {
    small: '50rem',
    medium: '85rem',
    large: '105rem',
  },
  colors: {
    tonalOffset: 0.3,
    primary: {
      main: '#424657',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    success: {
      main: '#37d247',
      light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.success.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
      contrastText: ({ colors }) => readableColor(colors.success.main),
    },
    warning: {
      main: '#ffa500',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
      contrastText: '#ffffff',
    },
    error: {
      main: '#e53935',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
      contrastText: ({ colors }) => readableColor(colors.error.main),
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
    },
    text: {
      primary: '#333333',
      secondary: ({ colors }) => lighten(colors.tonalOffset, colors.text.primary),
    },
    border: {
      dark: 'rgba(0,0,0, 0.1)',
      light: '#ffffff',
    },
    responses: {
      success: {
        color: ({ colors }) => colors.success.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.success.main),
      },
      error: {
        color: ({ colors }) => colors.error.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.error.main),
      },
      redirect: {
        color: ({ colors }) => colors.warning.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
      },
      info: {
        color: '#87ceeb',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
      },
    },
    http: {
      get: '#6bbd5b',
      post: '#248fb2',
      put: '#9b708b',
      options: '#d3ca12',
      patch: '#e09d43',
      delete: '#e27a7a',
      basic: '#999',
      link: '#31bbb6',
      head: '#c167e4',
    },
  },
  schema: {
    linesColor: (theme) => lighten(
      theme.colors.tonalOffset,
      desaturate(theme.colors.tonalOffset, theme.colors.primary.main),
    ),
    defaultDetailsWidth: '75%',
    typeNameColor: (theme) => theme.colors.text.secondary,
    typeTitleColor: (theme) => theme.schema.typeNameColor,
    requireLabelColor: (theme) => theme.colors.error.main,
    labelsTextSize: '0.9em',
    nestingSpacing: '1em',
    nestedBackground: '#dcf4e3',
    arrow: {
      size: '1.1em',
      color: (theme) => theme.colors.text.secondary,
    },
  },
  typography: {
    fontSize: '14px',
    lineHeight: '1.5em',
    fontWeightRegular: '400',
    fontWeightBold: '700',
    fontWeightLight: '200',
    fontFamily: 'Raleway, sans-serif',
    smoothing: 'antialiased',
    optimizeSpeed: true,
    headings: {
      fontFamily: 'Raleway, sans-serif',
      fontWeight: '400',
      lineHeight: '1.6em',
    },
    code: {
      fontSize: '13px',
      fontFamily: 'Courier, monospace',
      lineHeight: ({ typography }) => typography.lineHeight,
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#e53935',
      backgroundColor: 'rgba(38, 50, 56, 0.05)',
      wrap: false,
    },
    links: {
      color: ({ colors }) => colors.primary.main,
      visited: ({ typography }) => typography.links.color,
      hover: ({ typography }) => lighten(0.2, typography.links.color),
    },
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#424657',
    textColor: '#ffffff',
    activeTextColor: '#ffffff',
    groupItems: {
      textTransform: 'uppercase',
    },
    level1Items: {
      textTransform: 'none',
    },
    arrow: {
      size: '1.5em',
      color: (theme) => theme.sidebar.textColor,
    },
  },
  logo: {
    maxHeight: ({ sidebar: menu }) => menu.width,
    maxWidth: ({ sidebar: menu }) => menu.width,
    gutter: '2px',
  },
  rightPanel: {
    backgroundColor: '#424657',
    width: '40%',
    textColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: darken(0.1, '#424657'),
  },
};

const redocOptions = {
  payloadSampleIdx: 0,
  hideDownloadButton: true,
  noAutoAuth: false,
  showExtensions: true,
  sortPropsAlphabetically: true,
  jsonSampleExpandLevel: 2,
  hideSingleRequestSampleTab: false,
  expandSingleSchemaField: true,
  hideLoading: true,
  theme: defaultTheme,
};

const ApiDocs = ({ openApiSpec, user }) => (
  <>
    <Container>
      {
        user ? (
          <UserActionBanner
            user={user}
            actionButton={() => (
              <>
                <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
                  <ButtonAnchor
                    outline
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  >
                    <ProfileImage
                      alt=""
                      src={user.metadata.linkedInProfile.profilePicture}
                    />
                    <span>
                      <FormattedMessage
                        id="user-action-banner-label-dashboard"
                        defaultMessage="Dashboard"
                      />
                    </span>
                  </ButtonAnchor>
                </Link>

                <UserActionsDropdown
                  user={user}
                  onLogOut={() => { Router.push(Router.router.asPath); }}
                />
              </>
            )}
          />
        ) : (
          <OpenSourceBanner />
        )
      }

      <RedocContainer>
        <RedocStandalone
          spec={openApiSpec}
          options={redocOptions}
        />
      </RedocContainer>
    </Container>
  </>
);

export default ApiDocs;
