import React, { useState, useCallback } from 'react';
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
import { useClipboard } from 'use-clipboard-copy';

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
import ApiKeyActionsDropdown from './ApiKeyActionsDropdown';

import KeyIcon from './images/key.svg';

import loggerClient from '../../db/loggerClient';
import { timeout } from '../../util';

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

const ApiKeyActionRow = styled.div`
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

const ApiKeysList = styled.div`
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

const ApiItemContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1pc 2pc 1pc 2pc;
`;

const ApiRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const KeyIconWrapper = styled.div`
  margin-right: 1pc;
  
  svg {
    width: 24px;
    color: var(--ndaify-accents-6);
  }
`;

const ApiKeyDetailsRow = styled.div`
  margin-bottom: 1pc;
`;

const ApiKeyDateRow = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const ApiKeyDateColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ApiKeyDetailsTitle = styled.div`
  font-size: 16px;
  color: var(--ndaify-accents-6);
  width: 100%;
  line-height: 32px;
`;

const ApiKeyDetailsText = styled.div`
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

const ApiKeySecret = styled.span`
  color: var(--ndaify-accents-9);
`;

const InputContainer = styled.div`
  margin-top: 2pc;
  margin-bottom: 2pc;
`;

const EmptyApiKeysList = styled.div`
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 700;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const ApiKeyItemWrapper = styled.div`
  position: relative;
`;

const ApiKeyItemActions = styled.div`
  position: absolute;
  right: 1pc;
  top: 1pc;
`;

const apiKeyNameInputPlaceholder = defineMessage({
  id: 'api-key-name-input-placeholder',
  defaultMessage: 'Key Name (e.g. Slack integration)',
});

const maskSecret = (secret) => `${secret.substring(0, 2)}••••••${secret.slice(-2)}`;

const ApiKeyItem = ({ apiKey }) => {
  const toast = useAlert();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteDialogOpen(true);
  };
  const onDeleteClick = useCallback(handleDeleteClick, []);

  const [isDeleting, setDeleting] = useState(false);

  const handleDeleteApiKey = async () => {
    setDeleting(true);

    const cachedApiKeys = queryCache.getQueryData(['apiKeys']);

    try {
      const ndaifyService = new NdaifyService();

      // make optimistic update
      queryCache.setQueryData(
        ['apiKeys'],
        cachedApiKeys.filter(
          (cachedApiKey) => cachedApiKey.apiKeyId !== apiKey.apiKeyId,
        ),
      );
      setDeleteDialogOpen(false);

      await ndaifyService.deleteApiKey(apiKey.apiKeyId);

      queryCache.invalidateQueries(['apiKeys']);

      toast.show('Successfully deleted API Key');
    } catch (error) {
      // rollback optimistic updates
      queryCache.setQueryData(['apiKeys'], cachedApiKeys);

      loggerClient.error(error);
      toast.show('Failed to delete API Key');
    } finally {
      setDeleting(false);
    }
  };
  const onDeleteApiKey = useCallback(handleDeleteApiKey, [apiKey]);

  return (
    <ApiKeyItemWrapper>
      <ApiKeyItemActions>
        <ApiKeyActionsDropdown apiKey={apiKey} onDeleteClick={onDeleteClick} />
      </ApiKeyItemActions>
      <ItemCardContainer>
        <ApiItemContainer>
          <ApiRow>
            <KeyIconWrapper>
              <KeyIcon />
            </KeyIconWrapper>
          </ApiRow>

          <ApiKeyDetailsRow>
            <ApiKeyDetailsTitle>Name</ApiKeyDetailsTitle>
            <ApiKeyDetailsText>{apiKey.name}</ApiKeyDetailsText>
          </ApiKeyDetailsRow>

          <ApiKeyDetailsRow>
            <ApiKeyDetailsTitle>Token</ApiKeyDetailsTitle>
            <ApiKeyDetailsText>
              {maskSecret(apiKey.secret)}
            </ApiKeyDetailsText>
          </ApiKeyDetailsRow>

          <ApiKeyDateRow>
            <ApiKeyDateColumn>
              <ApiKeyDetailsTitle>Created</ApiKeyDetailsTitle>
              <ApiKeyDetailsText>
                <FormattedDate
                  year="numeric"
                  month="long"
                  day="numeric"
                  value={apiKey.createdAt}
                />
                {' '}
                <FormattedTime
                  value={apiKey.createdAt}
                />
              </ApiKeyDetailsText>
            </ApiKeyDateColumn>

            <ApiKeyDateColumn>
              <ApiKeyDetailsTitle>Last Used</ApiKeyDetailsTitle>
              <ApiKeyDetailsText>
                {
                  apiKey.lastUsedAt ? (
                    <>
                      <FormattedDate
                        year="numeric"
                        month="long"
                        day="numeric"
                        value={apiKey.lastUsedAt}
                      />
                      {' '}
                      <FormattedTime
                        value={apiKey.lastUsedAt}
                      />
                    </>
                  ) : '-'
                }
              </ApiKeyDetailsText>
            </ApiKeyDateColumn>
          </ApiKeyDateRow>

        </ApiItemContainer>
      </ItemCardContainer>

      <SimpleDialog show={isDeleteDialogOpen}>
        <DialogTitle>
          Are you sure you want to delete this key?
        </DialogTitle>
        <DialogText>
          This action cannot be undone.
        </DialogText>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isDeleting}
            onClick={() => {
              setDeleteDialogOpen(false);
            }}
          >
            Cancel
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isDeleting}
            spin={isDeleting}
            onClick={onDeleteApiKey}
          >
            Delete
          </DialogButton>
        </DialogFooter>
      </SimpleDialog>
    </ApiKeyItemWrapper>
  );
};

const ApiDocs = ({ user, apiKeys }) => {
  const intl = useIntl();
  const clipboard = useClipboard({ copiedTimeout: 750 });

  const [isCreateApiKeyDialogOpen, setCreateApiKeyDialogOpen] = useState(false);
  const [createdApiKey, setCreatedApiKey] = useState(null);

  const handleCreateClick = () => {
    setCreateApiKeyDialogOpen(true);
  };
  const onCreateClick = useCallback(handleCreateClick, []);

  const handleCloseClick = async () => {
    setCreateApiKeyDialogOpen(false);
    /* wait till the dialog leave animation to end before resetting state */
    await timeout(1000);
    setCreatedApiKey(null);
  };
  const onCloseClick = useCallback(handleCloseClick, []);

  const handleFormValidate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'You must enter a descriptive name';
    }

    return errors;
  };
  const onFormValidate = useCallback(handleFormValidate, []);

  const handleSubmit = async (
    {
      name,
    },
    {
      setStatus,
    },
  ) => {
    // clear all error messages before retrying
    setStatus();

    const ndaifyService = new NdaifyService();

    try {
      const { apiKey } = await ndaifyService.createApiKey(name);

      queryCache.invalidateQueries(['apiKeys']);

      setCreatedApiKey(apiKey);
    } catch (error) {
      loggerClient.error(error);
      setStatus({ errorMessage: error.message });
    }
  };
  const onSubmit = useCallback(handleSubmit, []);

  const initialValues = {
    name: '',
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

          <ApiKeyActionRow>
            <LinksContainer>
              <ActiveLink scroll={false} href="/dev/keys">
                {
                  (active) => (
                    <StyledLink active={active}>API Keys</StyledLink>
                  )
                }
              </ActiveLink>
            </LinksContainer>
            <ButtonsContainer>
              <Link passHref href="/dev/docs">
                <ButtonAnchor target="_blank" rel="noopener" outline>Docs</ButtonAnchor>
              </Link>
              <ButtonContainer>
                <Button outline onClick={onCreateClick} type="button">Create API Key</Button>
              </ButtonContainer>
            </ButtonsContainer>
          </ApiKeyActionRow>

          {
            apiKeys.length > 0 ? (
              <ApiKeysList>
                {
                  apiKeys.map(
                    (apiKey) => (
                      <ApiKeyItem
                        key={apiKey.apiKeyId}
                        apiKey={apiKey}
                      />
                    ),
                  )
                }
              </ApiKeysList>
            ) : (
              <EmptyApiKeysList>
                No API keys found
              </EmptyApiKeysList>
            )
          }

          <SimpleDialog show={isCreateApiKeyDialogOpen}>
            {
              createdApiKey ? (
                <>
                  <DialogTitle>
                    Your API Key:
                    {' '}
                    {createdApiKey.name}
                  </DialogTitle>

                  <DialogText>
                    <ApiKeySecret>
                      {createdApiKey.secret}
                    </ApiKeySecret>
                  </DialogText>

                  <ErrorMessage
                    style={{ marginTop: '1pc', marginBottom: '1pc' }}
                    color="var(--ndaify-accents-8)"
                  >
                    Please store your API key in a safe place.
                    {' '}
                    You can no longer view it after closing this dialog.
                  </ErrorMessage>

                  <DialogFooter>
                    <DialogButton
                      compact={!clipboard.copied}
                      outline={clipboard.copied}
                      disabled={false}
                      onClick={() => clipboard.copy(createdApiKey.secret)}
                      color="var(--ndaify-accents-success)"
                    >
                      {clipboard.copied ? 'Copied' : 'Copy to Clipboard'}
                    </DialogButton>

                    <DialogButton
                      outline
                      disabled={false}
                      onClick={onCloseClick}
                    >
                      Okay
                    </DialogButton>
                  </DialogFooter>
                </>
              ) : (
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
                        API Key Name
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
                          name="name"
                          placeholder={intl.formatMessage(apiKeyNameInputPlaceholder)}

                          spellCheck={false}
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                        />
                        <FieldErrorMessage style={{ marginTop: '1pc' }} name="name" component="div" />
                      </InputContainer>
                      <DialogFooter>
                        <DialogButton
                          outline
                          disabled={isSubmitting}
                          onClick={() => {
                            setCreateApiKeyDialogOpen(false);
                          }}
                        >
                          Cancel
                        </DialogButton>
                        <DialogButton
                          compact
                          color="var(--ndaify-accents-success)"
                          disabled={isSubmitting}
                          spin={isSubmitting}
                          type="submit"
                        >
                          Create
                        </DialogButton>
                      </DialogFooter>
                    </Form>
                  )}
                </Formik>
              )
            }
          </SimpleDialog>

          <Footer withLogo />

        </PageContainer>
      </Container>
    </>
  );
};

export default ApiDocs;
