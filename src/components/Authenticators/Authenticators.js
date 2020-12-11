import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useAlert } from 'react-alert';
import {
  useIntl,
  defineMessage,
  FormattedMessage,
  FormattedDate,
  FormattedTime,
} from 'react-intl';
import { Formik, Form, Field as FormikField } from 'formik';
import base64url from 'base64url';

import { queryCache } from 'react-query';

import Link from 'next/link';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FieldErrorMessage from '../ErrorMessage/FieldErrorMessage';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import Button from '../Clickable/Button';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';
import OpenSourceBanner from '../OpenSourceBanner/OpenSourceBanner';
import SimpleDialog from '../Dialog/SimpleDialog';
import Input from '../Input/Input';
import Avatar from '../Avatar/Avatar';

import NdaifyService from '../../services/NdaifyService';

import ActiveLink from '../ActiveLink/ActiveLink';
import Footer from '../Footer/Footer';
import AuthenticatorActionsDropdown from './AuthenticatorActionsDropdown';

import FingerprintIcon from './images/fingerprint.svg';

import loggerClient from '../../db/loggerClient';
import getUVPA from '../../utils/getUVPA';

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

const AuthenticatorActionRow = styled.div`
  padding-top: 2pc;
  padding-bottom: 2pc;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;

  @media screen and (min-width: 768px) {
    margin-bottom: 1pc;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const LinksContainer = styled.div`
  margin-bottom: 2pc;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  padding-bottom: 2pc;
  align-self: flex-end;

  @media screen and (min-width: 768px) {
    padding-bottom: 0pc;
    align-self: unset;
  }
`;

const ButtonContainer = styled.div`
  margin-left: 1pc;
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

const AuthenticatorsList = styled.div`
  width: 100%;
`;

const ItemCardContainer = styled.div`
  display: flex;
  border: 1px solid #4E5263;
  border-radius: var(--ndaify-accents-radius-1);
  margin-bottom: 1pc;
  text-decoration: none;
  width: 100%;
`;

const AuthenticatorItemContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1pc 2pc 1pc 2pc;
`;

const AuthenticatorRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FingerprintIconWrapper = styled.div`
  margin-right: 1pc;
  
  svg {
    width: 24px;
    color: var(--ndaify-accents-6);
  }
`;

const AuthenticatorDateRow = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const AuthenticatorDateColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-bottom: 1pc;
`;

const AuthenticatorDetailsTitle = styled.div`
  font-size: 16px;
  color: var(--ndaify-accents-6);
  width: 100%;
  line-height: 32px;
`;

const AuthenticatorDetailsText = styled.div`
  display: block;
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 200;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const DialogButton = styled(Button)``;

const DialogFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 1pc;
`;

const DialogTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 16px;
  color: var(--ndaify-fg);
`;

const DialogText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  line-height: 24px;
  padding-bottom: 16px;
  color: var(--ndaify-fg);
`;

const InputContainer = styled.div`
  margin-top: 2pc;
  margin-bottom: 2pc;
`;

const EmptyAuthenticatorsList = styled.div`
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 700;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const AuthenticatorItemWrapper = styled.div`
  position: relative;
`;

const AuthenticatorItemActions = styled.div`
  position: absolute;
  right: 1pc;
  top: 1pc;
`;

const authenticatorNameInputPlaceholder = defineMessage({
  id: 'authenticator-name-input-placeholder',
  defaultMessage: 'Authenticator Name (e.g. Touch ID, Julia\'s YubiKey)',
});

const maskSecret = (secret) => `${secret.substring(0, 5)}••••••${secret.slice(-5)}`;

const AuthenticatorItem = ({ authenticator }) => {
  const toast = useAlert();

  const [isDeregisterDialogOpen, setDeregisterDialogOpen] = useState(false);

  const handleDegisterClick = async () => {
    setDeregisterDialogOpen(true);
  };
  const onDeregisterClick = useCallback(handleDegisterClick, []);

  const [isDeleting, setDeleting] = useState(false);

  const handleDeleteAuthenticator = async () => {
    setDeleting(true);

    const cachedAuthenticators = queryCache.getQueryData(['authenticators']);

    try {
      const ndaifyService = new NdaifyService();

      // make optimistic update
      queryCache.setQueryData(
        ['authenticators'],
        cachedAuthenticators.filter(
          (cachedAtor) => cachedAtor.authenticatorId !== authenticator.authenticatorId,
        ),
      );
      setDeregisterDialogOpen(false);

      await ndaifyService.deleteAuthenticator(authenticator.authenticatorId);

      queryCache.invalidateQueries(['authenticators']);

      toast.show('Successfully deleted credential');
    } catch (error) {
      // rollback optimistic updates
      queryCache.setQueryData(['authenticators'], cachedAuthenticators);

      loggerClient.error(error);
      toast.show('Failed to delete credential');
    } finally {
      setDeleting(false);
    }
  };
  const onDeleteAuthenticator = useCallback(handleDeleteAuthenticator, [authenticator]);

  return (
    <AuthenticatorItemWrapper>
      <AuthenticatorItemActions>
        <AuthenticatorActionsDropdown
          authenticator={authenticator}
          onDeregisterClick={onDeregisterClick}
        />
      </AuthenticatorItemActions>
      <ItemCardContainer>
        <AuthenticatorItemContainer>
          <AuthenticatorRow>
            <FingerprintIconWrapper>
              <FingerprintIcon />
            </FingerprintIconWrapper>
          </AuthenticatorRow>

          <AuthenticatorDateRow>
            <AuthenticatorDateColumn>
              <AuthenticatorDetailsTitle>Authenticator Name</AuthenticatorDetailsTitle>
              <AuthenticatorDetailsText>
                {authenticator.metadata.authenticatorName}
              </AuthenticatorDetailsText>
            </AuthenticatorDateColumn>
            <AuthenticatorDateColumn>
              <AuthenticatorDetailsTitle>Capabilities</AuthenticatorDetailsTitle>
              <AuthenticatorDetailsText>
                login, 2fa
              </AuthenticatorDetailsText>
            </AuthenticatorDateColumn>
          </AuthenticatorDateRow>

          <AuthenticatorDateRow>
            <AuthenticatorDateColumn>
              <AuthenticatorDetailsTitle>Credential Id</AuthenticatorDetailsTitle>
              <AuthenticatorDetailsText>
                {maskSecret(authenticator.credentialId)}
              </AuthenticatorDetailsText>
            </AuthenticatorDateColumn>

            <AuthenticatorDateColumn>
              <AuthenticatorDetailsTitle>Created</AuthenticatorDetailsTitle>
              <AuthenticatorDetailsText>
                <FormattedDate
                  year="numeric"
                  month="long"
                  day="numeric"
                  value={authenticator.createdAt}
                />
                {' '}
                <FormattedTime
                  value={authenticator.createdAt}
                />
              </AuthenticatorDetailsText>
            </AuthenticatorDateColumn>
          </AuthenticatorDateRow>

        </AuthenticatorItemContainer>
      </ItemCardContainer>

      <SimpleDialog show={isDeregisterDialogOpen}>
        <DialogTitle>
          Are you sure you want to deregister this authenticator?
        </DialogTitle>
        <DialogText>
          This action cannot be undone.
        </DialogText>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isDeleting}
            onClick={() => {
              setDeregisterDialogOpen(false);
            }}
          >
            Cancel
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isDeleting}
            spin={isDeleting}
            onClick={onDeleteAuthenticator}
          >
            Deregister
          </DialogButton>
        </DialogFooter>
      </SimpleDialog>
    </AuthenticatorItemWrapper>
  );
};

const Authenticators = ({ user, authenticators }) => {
  const intl = useIntl();

  const [isRegisterAuthenticatorDialogOpen, setRegisterAuthenticatorDialogOpen] = useState(false);
  const [authenticatorAbortController, setAuthenticatorAbortController] = useState();

  const handleRegisterClick = () => {
    setRegisterAuthenticatorDialogOpen(true);
  };
  const onRegisterClick = useCallback(handleRegisterClick, []);

  const handleFormValidate = (values) => {
    const errors = {};
    if (!values.authenticatorName) {
      errors.authenticatorName = 'You must enter a descriptive name';
    }

    return errors;
  };
  const onFormValidate = useCallback(handleFormValidate, []);

  const handleSubmit = async (
    {
      authenticatorName,
    },
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
          ...attestationOptions
        },
      } = await ndaifyService.createAttestationOptions();

      const abortController = new AbortController();

      setAuthenticatorAbortController(abortController);

      const credential = await navigator.credentials.create({
        signal: abortController.signal,
        publicKey: {
          ...attestationOptions,
          challenge: base64url.toBuffer(attestationOptions.challenge),
          user: {
            ...attestationOptions.user,
            id: base64url.toBuffer(attestationOptions.user.id),
          },
          excludeCredentials: attestationOptions.excludeCredentials.map((cred) => ({
            ...cred,
            id: base64url.toBuffer(cred.id),
          })),
        },
      });

      // too late to abort
      setAuthenticatorAbortController();

      await ndaifyService.createAuthenticator({
        authenticatorName,
        ticketToken,

        credential: {
          id: credential.id,
          type: credential.type,
          rawId: base64url.encode(credential.rawId),
          response: credential.response ? {
            clientDataJSON: base64url.encode(credential.response.clientDataJSON),
            attestationObject: base64url.encode(credential.response.attestationObject),
          } : null,
        },
      });

      queryCache.invalidateQueries(['authenticators']);

      setRegisterAuthenticatorDialogOpen(false);
    } catch (error) {
      loggerClient.error(error);
      setStatus({ errorMessage: error.message });
    }
  };
  const onSubmit = useCallback(handleSubmit, []);

  const [/* uvpa */, setUvpa] = useState(null);

  useEffect(() => {
    async function loadUVPA() {
      const userVerifyingPlatformAuthenticator = await getUVPA();
      setUvpa(userVerifyingPlatformAuthenticator);
    }

    loadUVPA();
  }, []);

  const initialValues = {
    authenticatorName: '',
  };

  return (
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
                      <Avatar user={user} />

                      <span>
                        <FormattedMessage
                          id="user-action-banner-label-inbox"
                          defaultMessage="Inbox"
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

          <AuthenticatorActionRow>
            <LinksContainer>
              <ActiveLink scroll={false} href="/settings/authenticators">
                {
                  (active) => (
                    <StyledLink active={active}>Authenticators</StyledLink>
                  )
                }
              </ActiveLink>
            </LinksContainer>
            <ButtonsContainer>
              <ButtonContainer>
                <Button outline onClick={onRegisterClick} type="button">Register Authenticator</Button>
              </ButtonContainer>
            </ButtonsContainer>
          </AuthenticatorActionRow>

          {
            authenticators.length > 0 ? (
              <AuthenticatorsList>
                {
                  authenticators.map(
                    (authenticator) => (
                      <AuthenticatorItem
                        key={authenticator.credentialId}
                        authenticator={authenticator}
                      />
                    ),
                  )
                }
              </AuthenticatorsList>
            ) : (
              <EmptyAuthenticatorsList>
                No authenticators found
              </EmptyAuthenticatorsList>
            )
          }

          <SimpleDialog show={isRegisterAuthenticatorDialogOpen}>
            <Formik
              initialValues={initialValues}
              validate={onFormValidate}
              validateOnChange={false}
              validateOnBlur={Object.keys(initialValues).length > 1}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, status }) => (
                <Form>
                  <DialogTitle>
                    Register Authenticator
                  </DialogTitle>
                  {
                    status ? (
                      <ErrorMessage style={{ marginTop: '1pc', marginBottom: '1pc' }}>
                        {status.errorMessage}
                      </ErrorMessage>
                    ) : null
                  }
                  <InputContainer>
                    <FormikField
                      as={Input}
                      name="authenticatorName"
                      placeholder={intl.formatMessage(authenticatorNameInputPlaceholder)}

                      spellCheck={false}
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                    />
                    <FieldErrorMessage style={{ marginTop: '1pc' }} name="authenticatorName" component="div" />
                  </InputContainer>
                  <DialogFooter>
                    {
                      authenticatorAbortController ? (
                        <DialogButton
                          outline
                          onClick={() => {
                            if (authenticatorAbortController) {
                              authenticatorAbortController.abort();
                            }
                            setRegisterAuthenticatorDialogOpen(false);
                            setAuthenticatorAbortController();
                          }}
                        >
                          Cancel
                        </DialogButton>
                      ) : (
                        <DialogButton
                          outline
                          disabled={isSubmitting}
                          onClick={() => {
                            setRegisterAuthenticatorDialogOpen(false);
                          }}
                        >
                          Cancel
                        </DialogButton>
                      )
                    }

                    <DialogButton
                      compact
                      color="var(--ndaify-accents-success)"
                      disabled={isSubmitting}
                      spin={isSubmitting}
                      type="submit"
                    >
                      Register
                    </DialogButton>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </SimpleDialog>

          <Footer withLogo />

        </PageContainer>
      </Container>
    </>
  );
};

export default Authenticators;
