import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';
import OpenSourceBanner from '../OpenSourceBanner/OpenSourceBanner';

import ActiveLink from '../ActiveLink/ActiveLink';
import Footer from '../Footer/Footer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageContainer = styled.div`
  padding: 1pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
`;

const ApiKeyRow = styled.div`
  padding-top: 2pc;
  padding-bottom: 2pc;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1pc;
`;

const LinksContainer = styled.div`

`;

const StyledLink = styled.a`
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 200;
  margin-right: 2pc;
  padding-bottom: 6px;
  border-bottom: ${({ active }) => active && '4px solid var(--ndaify-accents-9)'};
  cursor: pointer;
  text-decoration: none;

  :visited {
    color: var(--ndaify-fg);
  }

  @media screen and (min-width: 992px) {
    font-size: 24px;
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

const ApiDocs = ({ user }) => (
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

                <UserActionsDropdown user={user} />
              </>
            )}
          />
        ) : (
          <OpenSourceBanner />
        )
      }

      <PageContainer>
        <ApiKeyRow>
          <LinksContainer>
            <ActiveLink scroll={false} href="/dev/keys">
              {
                (active) => (
                  <StyledLink active={active}>API Keys</StyledLink>
                )
              }
            </ActiveLink>
          </LinksContainer>
          <Link passHref href="/dev/docs">
            <ButtonAnchor target="_blank" rel="noopener noreferrer" outline>Docs</ButtonAnchor>
          </Link>
        </ApiKeyRow>

        <Footer withLogo />

      </PageContainer>
    </Container>
  </>
);

export default ApiDocs;
