import React from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import LinkedInButton from '../LinkedInButton/LinkedInButton';
import LogoHeader from '../LogoHeader/LogoHeader';
import Footer from '../Footer/Footer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getClientOrigin, serializeOAuthState } from '../../util';

const { publicRuntimeConfig: { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SCOPES } } = getConfig();

const LinkedInButtonWrapper = styled.div`
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
`;

const LogoHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10pc;
`;

const Login = () => {
  const router = useRouter();

  return (
    <Container>
      <PageContentContainer>
        <LogoHeaderContainer>
          <LogoHeader />
        </LogoHeaderContainer>

        <ContentContainer>
          {
            router.query.errorMessage ? (
              <ErrorMessage style={{ marginBottom: '3pc' }}>
                {router.query.errorMessage}
              </ErrorMessage>
            ) : null
          }

          <LinkedInButtonWrapper>
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
              Login with LinkedIn
            </LinkedInButton>
          </LinkedInButtonWrapper>

          <Footer />
        </ContentContainer>

      </PageContentContainer>
    </Container>
  );
};

export default Login;
