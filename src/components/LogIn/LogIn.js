import React, { useCallback } from 'react';

import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import getConfig from 'next/config';
import Link from 'next/link';

import { FormattedMessage } from 'react-intl';

import Avatar from '../Avatar/Avatar';
import AnchorButton from '../Clickable/AnchorButton';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import LogoHeader from '../LogoHeader/LogoHeader';
import Footer from '../Footer/Footer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import getFullNameFromUser from '../NDA/getFullNameFromUser';

import { getClientOrigin, serializeOAuthState, scrollToTop } from '../../util';

import NdaifyService from '../../services/NdaifyService';

const { publicRuntimeConfig: { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SCOPES } } = getConfig();

const ActionButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 3pc;
  width:100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const PageContentContainer = styled.div`
  padding: 1pc;
  display: flex;
  align-items: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  margin-top: 3pc;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  flex: 1;
  margin: 1pc;
  max-width: 576px;
  width: 100%;
  margin: 2pc;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 5pc;
`;

const LogoHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5pc;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 200;
  color: var(--ndaify-fg);

  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 200;
  color: var(--ndaify-fg);
  padding-top: 1pc;
`;

const StyledButton = styled(ButtonAnchor)`
  padding: 0;

  :focus {
    svg {
      path:nth-of-type(1) {
        filter: brightness(90%);
      }
    }
  }
`;

const LogOutButtonContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LargeAvatar = styled(Avatar)`
  position: absolute;
  left: 1pc;
  transform: scale(1.5);
`;

const ButtonText = styled.span`
  flex: 1;
`;

const LogOutButtonAnchor = ({ children, user, ...otherProps }) => (
  <StyledButton
    color="var(--ndaify-accents-primary)"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    <LogOutButtonContent>
      <LargeAvatar user={user} />

      <ButtonText>
        {children}
      </ButtonText>

    </LogOutButtonContent>
  </StyledButton>
);

const LogIn = ({ user }) => {
  const router = useRouter();

  const handleLogOutClick = async () => {
    const ndaifyService = new NdaifyService();
    await ndaifyService.endSession();

    Router.push('/').then(scrollToTop);
  };
  const onLogOutClick = useCallback(handleLogOutClick, []);

  return (
    <Container>
      <PageContentContainer>
        <LogoHeaderContainer>
          <LogoHeader />
        </LogoHeaderContainer>

        {
          user ? (
            <>
              <Title>
                <FormattedMessage
                  id="login-welcome-text"
                  defaultMessage="Welcome back, {firstName}!"
                  values={{
                    firstName: user.metadata.linkedInProfile.firstName,
                  }}
                />
              </Title>
              <Description>
                Not
                {' '}
                <AnchorButton
                  type="button"
                  onClick={onLogOutClick}
                >
                  {getFullNameFromUser(user)}
                </AnchorButton>
                ?
              </Description>
            </>
          ) : (
            <Title>
              <FormattedMessage
                id="login-title"
                defaultMessage="You must sign in to continue"
              />
            </Title>
          )
        }

        <ContentContainer>
          {
            router.query.errorMessage ? (
              <ErrorMessage style={{ marginBottom: '3pc' }}>
                {router.query.errorMessage}
              </ErrorMessage>
            ) : null
          }

          <ActionButtonWrapper>
            {
              user ? (
                <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
                  <LogOutButtonAnchor
                    user={user}
                  >
                    <FormattedMessage
                      id="login-button-login"
                      defaultMessage="Log in"
                    />
                  </LogOutButtonAnchor>
                </Link>
              ) : (
                <LinkedInButton
                  onClick={() => {
                    const CALLBACK_URL_LINKEDIN = `${getClientOrigin()}/sessions/linkedin/callback`;

                    const { redirectUrl } = router.query;
                    const oAuthState = serializeOAuthState({ redirectUrl });

                    window.location.assign(
                      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${LINKEDIN_CLIENT_SCOPES}`,
                    );
                  }}
                >
                  <FormattedMessage
                    id="login-button-login-with-linkedin"
                    defaultMessage="Log in with LinkedIn"
                  />
                </LinkedInButton>
              )
            }

          </ActionButtonWrapper>

          <Footer />
        </ContentContainer>

      </PageContentContainer>
    </Container>
  );
};

export default LogIn;
