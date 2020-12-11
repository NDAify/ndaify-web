import React, { useCallback, useState } from 'react';

import styled, { keyframes } from 'styled-components';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import base64url from 'base64url';
import { Formik, Form } from 'formik';

import { FormattedMessage } from 'react-intl';

import Avatar from '../Avatar/Avatar';
import Button from '../Clickable/Button';
import AnchorButton from '../Clickable/AnchorButton';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import LogoHeader from '../LogoHeader/LogoHeader';
import Footer from '../Footer/Footer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import getFullNameFromUser from '../NDA/getFullNameFromUser';

import { getClientOrigin, serializeOAuthState, scrollToTop } from '../../util';

import NdaifyService, {
  redirect, InvalidSessionError,
} from '../../services/NdaifyService';

import Biometrics from './images/biometrics.svg';

import loggerClient from '../../db/loggerClient';

const BiometricsIcon = styled(Biometrics)`
  color: var(--ndaify-fg);
  width: 32px;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 3pc;
  width: 100%;
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

const StyledWebAuthnButton = styled(Button)`
  padding: 0;
  max-width: 60px;
  margin-left: 4px;

  :focus {
    svg {
      path:nth-of-type(1) {
        filter: brightness(90%);
      }
    }
  }
`;

const pulsate = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const WebauthnButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // background: red;
  width: 100%;
  height: 100%;
  position: absolute;

  :before,
  :after {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 1px solid var(--ndaify-fg);
    border-radius: 50%;
    opacity: 0;
    background-visibility: hidden;
    
    animation: ${pulsate} 1.5s linear infinite;

    ${(props) => (props.pulse ? '' : 'animation: none;')}
}
  
  :after {
    animation-delay: 0.5s;
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

const LogInViaWebauthnButton = ({ children, pulse, ...otherProps }) => (
  <StyledWebAuthnButton
    color="var(--ndaify-accents-primary)"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    <WebauthnButtonContent pulse={pulse}>
      <BiometricsIcon />
    </WebauthnButtonContent>
  </StyledWebAuthnButton>
);

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

  const handleFormValidate = () => {
    const errors = {};
    return errors;
  };
  const onFormValidate = useCallback(handleFormValidate, []);

  const [authenticatorAbortController, setAuthenticatorAbortController] = useState();

  const handleCancelWebauthnClick = () => {
    if (authenticatorAbortController) {
      authenticatorAbortController.abort();
    }
  };
  const onCancelWebauthn = useCallback(handleCancelWebauthnClick, [authenticatorAbortController]);

  const handleSubmit = async (
    values,
    {
      setStatus,
    },
  ) => {
    // clear all error messages before retrying
    setStatus();

    const ndaifyService = new NdaifyService();

    try {
      const {
        options: {
          ticketToken,
          ...assertionOptions
        },
      } = await ndaifyService.createAssertionOptions();

      const abortController = new AbortController();

      setAuthenticatorAbortController(abortController);

      const credential = await navigator.credentials.get({
        signal: abortController.signal,
        publicKey: {
          ...assertionOptions,
          challenge: base64url.toBuffer(assertionOptions.challenge),
          allowCredentials: assertionOptions.allowCredentials.map((cred) => ({
            ...cred,
            id: base64url.toBuffer(cred.id),
          })),
        },
      });

      // too late to abort
      setAuthenticatorAbortController();

      await ndaifyService.startSessionByAuthenticator({
        ticketToken,

        credential: {
          id: credential.id,
          type: credential.type,
          rawId: base64url.encode(credential.rawId),
          response: credential.response ? {
            clientDataJSON: base64url.encode(credential.response.clientDataJSON),
            authenticatorData: base64url.encode(credential.response.authenticatorData),
            signature: base64url.encode(credential.response.signature),
            userHandle: credential.response.userHandle
              ? base64url.encode(credential.response.userHandle) : null,
          } : null,
        },
      });

      const { redirectUrl } = router.query;

      if (redirectUrl) {
        redirect(null, redirectUrl);
        return;
      }

      redirect(null, '/dashboard/incoming');
    } catch (error) {
      loggerClient.error(error);

      if (error instanceof InvalidSessionError) {
        setStatus({ errorMessage: error.message });
      } else {
        // User is suspended or something else went wrong
        setStatus({ errorMessage: 'Failed to authenticate' });
      }
    }
  };
  const onSubmit = useCallback(handleSubmit, []);

  const initialValues = {};

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
          <Formik
            initialValues={initialValues}
            validate={onFormValidate}
            validateOnChange={false}
            validateOnBlur={Object.keys(initialValues).length > 1}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>

                {
                  // only display these if there isn't a client side form error
                  router.query.errorMessage && !status ? (
                    <ErrorMessage style={{ marginBottom: '3pc' }}>
                      {router.query.errorMessage}
                    </ErrorMessage>
                  ) : null
                }

                {
                  status ? (
                    <ErrorMessage style={{ marginBottom: '3pc' }}>
                      {status.errorMessage}
                    </ErrorMessage>
                  ) : null
                }

                {
                  user ? (
                    <ActionButtonWrapper>
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
                    </ActionButtonWrapper>
                  ) : (
                    <>
                      <ActionButtonWrapper>
                        <LinkedInButton
                          onClick={() => {
                            const CALLBACK_URL_LINKEDIN = `${getClientOrigin()}/sessions/linkedin/callback`;

                            const { redirectUrl } = router.query;
                            const oAuthState = serializeOAuthState({ redirectUrl });

                            window.location.assign(
                              `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${process.env.LINKEDIN_CLIENT_SCOPES}`,
                            );
                          }}
                        >
                          <FormattedMessage
                            id="login-button-login-with-linkedin"
                            defaultMessage="Log in with LinkedIn"
                          />
                        </LinkedInButton>

                        {
                          isSubmitting ? (
                            <LogInViaWebauthnButton
                              pulse
                              onClick={onCancelWebauthn}
                            />
                          ) : (
                            <LogInViaWebauthnButton
                              type="submit"
                            />
                          )
                        }
                      </ActionButtonWrapper>
                    </>
                  )
                }
              </Form>
            )}
          </Formik>
          <Footer />
        </ContentContainer>

      </PageContentContainer>
    </Container>
  );
};

export default LogIn;
