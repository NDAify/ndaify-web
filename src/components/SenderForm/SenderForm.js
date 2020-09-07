import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useIntl, defineMessage, FormattedMessage } from 'react-intl';

import {
  Formik,
  Field as FormikField,
  Form,
} from 'formik';

import Link from 'next/link';

import loggerClient from '../../db/loggerClient';

import LogoHeader from '../LogoHeader/LogoHeader';
import Input from '../Input/Input';
import EmailInput from '../Input/EmailInput';
import SelectInput from '../Input/SelectInput';
import AnchorButton from '../Clickable/AnchorButton';
import Footer from '../Footer/Footer';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FieldErrorMessage from '../ErrorMessage/FieldErrorMessage';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';
import Avatar from '../Avatar/Avatar';
import { PageTitle } from '../Head/Head';

import { getClientOrigin, serializeOAuthState, timeout } from '../../util';
import * as sessionStorage from '../../lib/sessionStorage';

import HideImg from './images/hide.svg';

import useNdaTemplateQuery from '../../queries/useNdaTemplateQuery';

const HideIcon = styled(HideImg)`
  color: var(--ndaify-fg);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageContentContainer = styled.div`
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

const ContentContainer = styled.div`
  margin: 1pc;
  max-width: 576px;
  width: 100%;
  margin: 2pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

const LogoImageContainer = styled.div`
  margin-top: 3pc;
  display: flex;
  width: 100%;
  margin-bottom: 5pc;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 2pc;
`;

const HideIconWrapper = styled.div`
  margin-left: 0;
  margin-right: 1pc;

  svg {
    width: 20px;
    color: var(--ndaify-fg)
  }

  @media screen and (min-width: 992px) {
    margin-left: -46px;
    margin-right: 1pc;

    svg {
      width: 28px;
    }
  }
`;

const DocumentUrl = styled.a`
  color: var(--ndaify-accents-6);
  font-size: 20px;
  word-wrap: break-word;
  font-weight: 200;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const DescriptionTitle = styled.h4`
  font-weight: 200;
  color: var(--ndaify-fg);
  font-size: 20px;
  margin: 0;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const DisclaimerText = styled.span`
  display: block;
  margin-bottom: 2pc;
  color: var(--ndaify-accents-6);
  font-size: 16px;
  font-weight: 200;
  line-height: 28px;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }

  a {
    text-decoration: underline;
    color: var(--ndaify-fg);
  }

  a:visited {
    color: var(--ndaify-fg);
  }
`;

const NdaDescriptionText = styled.span`
  display: block;
  color: var(--ndaify-accents-6);
  font-size: 16px;
  font-weight: 200;
  line-height: 28px;
  margin-top: 6px;

  a {
    text-decoration: underline;
    color: var(--ndaify-fg);
  }

  a:visited {
    color: var(--ndaify-fg);
  }

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 2pc;

  :last-of-type {
    margin-bottom: 0;
  }
`;

const LinkedInButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 3pc;
`;

const isValidEmail = (string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(string);

const TemplateDescription = ({ ndaTemplate }) => {
  if (!ndaTemplate) {
    return null;
  }

  return (
    <>
      <PageTitle prepend={`New ${ndaTemplate.data.title} - `} />
      <NdaDescriptionText>
        <a
          href={`/sample/${ndaTemplate.ndaTemplateId}`}
          // eslint-disable-next-line react/jsx-no-target-blank
          target="_blank"
          rel="noopener"
        >
          {ndaTemplate.data.description}
        </a>
      </NdaDescriptionText>
    </>
  );
};

const TemplateOptionsSelectInputField = ({ ndaTemplateOptions, ndaTemplateId }) => {
  const [query, ndaTemplate] = useNdaTemplateQuery(ndaTemplateId);

  return (
    <>
      <FormikField
        as={SelectInput}
        spin={query.status === 'loading'}
        name="ndaTemplateId"
        options={ndaTemplateOptions.filter((opt) => opt.active).map((opt) => ({
          label: opt.data.title,
          value: opt.ndaTemplateId,
        }))}
        placeholder="NDA type (one-way, mutual)"
      />
      <TemplateDescription ndaTemplate={ndaTemplate} />
      <FieldErrorMessage name="ndaTemplateId" component="div" />
    </>
  );
};

const recipientNameInputPlaceholder = defineMessage({
  id: 'sender-form-recipient-name-input-placeholder',
  defaultMessage: 'Recipient name',
});

const recipientEmailInputPlaceholder = defineMessage({
  id: 'sender-form-recipient-email-input-placeholder',
  defaultMessage: 'Recipient email',
});

const SenderForm = ({ user, nda, ndaTemplateOptions }) => {
  const intl = useIntl();

  const router = useRouter();
  const [suggestedEmail, setSuggestedEmail] = useState();

  const handleFormValidate = (values) => {
    const errors = {};
    if (!values.recipientEmail) {
      errors.recipientEmail = 'Required';
    }

    if (values.recipientEmail && !isValidEmail(values.recipientEmail)) {
      errors.recipientEmail = 'Invalid email';
    }

    if (!values.recipientFullName) {
      errors.recipientFullName = 'Required';
    }

    return errors;
  };
  const onFormValidate = useCallback(handleFormValidate, []);

  const handleSubmit = (
    {
      ndaTemplateId,
      recipientFullName,
      recipientEmail,
    },
    {
      setStatus,
      setSubmitting,
    },
  ) => {
    setStatus();

    try {
      sessionStorage.setItem(
        'nda',
        {
          ...nda,
          recipientEmail,
          metadata: {
            ...nda.metadata,
            ndaTemplateId,
            recipientFullName,
          },
        },
      );

      const CALLBACK_URL_LINKEDIN = `${getClientOrigin()}/sessions/linkedin/callback`;
      const oAuthState = serializeOAuthState({
        redirectUrl: '/nda/compose',
        // If there is an error during the login phase, redirect the errors properly
        redirectOnErrorUrl: '/nda/new',
      });
      window.location.replace(
        `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${process.env.LINKEDIN_CLIENT_SCOPES}`,
      );
    } catch (error) {
      loggerClient.error(error);
      setStatus({ errorMessage: error.message });
    } finally {
      // Keep the spinner running during the transition to LinkedIn oAuth
      // This is much better UX than spinner flickering momentarily before
      // we navigate away
      timeout(5000).then(() => setSubmitting(false));
    }
  };
  const onSubmit = useCallback(handleSubmit, []);

  const initialValues = {
    ndaTemplateId: nda.metadata.ndaTemplateId || ndaTemplateOptions[0].ndaTemplateId,
    recipientFullName: nda.metadata.recipientFullName || '',
    recipientEmail: nda.recipientEmail || '',
  };

  return (
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
        ) : null
      }

      <PageContentContainer>
        <LogoImageContainer>
          <LogoHeader />
        </LogoImageContainer>

        <ContentContainer>
          {
            router.query.errorMessage ? (
              <ErrorMessage style={{ marginBottom: '3pc' }}>
                {router.query.errorMessage}
              </ErrorMessage>
            ) : null
          }

          <LinkWrapper>
            <HideIconWrapper>
              <HideIcon />
            </HideIconWrapper>
            <DocumentUrl
              href={nda.metadata.secretLinks[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nda.metadata.secretLinks[0]}
            </DocumentUrl>
          </LinkWrapper>

          <DescriptionTitle>
            <FormattedMessage
              id="sender-form-description-title"
              defaultMessage="Recipient does not have access to your link unless they accept the terms
              of the NDA."
            />
          </DescriptionTitle>

          <Formik
            initialValues={initialValues}
            validate={onFormValidate}
            validateOnChange={false}
            validateOnBlur={Object.keys(initialValues).length > 1}
            onSubmit={onSubmit}
          >
            {({
              values,
              setFieldValue,
              status,
              isSubmitting,
            }) => (
              <Form>
                {
                  status ? (
                    <ErrorMessage style={{ marginBottom: '3pc' }}>
                      {status.errorMessage}
                    </ErrorMessage>
                  ) : null
                }

                <InputContainer>

                  <TemplateOptionsSelectInputField
                    ndaTemplateId={values.ndaTemplateId}
                    ndaTemplateOptions={ndaTemplateOptions}
                  />

                </InputContainer>

                <InputContainer>
                  <FormikField
                    as={Input}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    name="recipientFullName"
                    spellCheck={false}
                    placeholder={intl.formatMessage(recipientNameInputPlaceholder)}
                  />
                  <FieldErrorMessage style={{ marginTop: '1pc' }} name="recipientFullName" component="div" />
                </InputContainer>

                <InputContainer>
                  <FormikField
                    as={EmailInput}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    name="recipientEmail"
                    onEmailSuggest={setSuggestedEmail}
                    spellCheck={false}
                    placeholder={intl.formatMessage(recipientEmailInputPlaceholder)}
                  />

                  {
                      suggestedEmail && (
                        <ErrorMessage style={{ marginTop: '1pc' }} color="var(--ndaify-accents-8)">
                          Did you mean
                          <AnchorButton
                            type="button"
                            style={{
                              marginLeft: '6px',
                            }}
                            onClick={() => {
                              setFieldValue('recipientEmail', suggestedEmail, true);
                              setSuggestedEmail(null);
                            }}
                          >
                            {suggestedEmail}
                          </AnchorButton>
                          ?
                        </ErrorMessage>
                      )
                    }

                  <FieldErrorMessage style={{ marginTop: '1pc' }} name="recipientEmail" component="div" />

                </InputContainer>

                <DisclaimerText>
                  <FormattedMessage
                    id="sender-form-disclaimer"
                    defaultMessage="Signing the NDA signifies that you have read and agree to the {privacyPolicy} and {termsOfUse}."
                    values={{
                      privacyPolicy: (
                        <a target="_blank" rel="noopener" href="/terms">
                          <FormattedMessage
                            id="sender-form-terms"
                            defaultMessage="Terms of Use"
                          />
                        </a>
                      ),
                      termsOfUse: (
                        <a target="_blank" rel="noopener" href="/privacy">
                          <FormattedMessage
                            id="sender-form-privacy"
                            defaultMessage="Privacy Policy"
                          />
                        </a>
                      ),
                    }}
                  />
                </DisclaimerText>

                <LinkedInButtonWrapper>
                  <LinkedInButton
                    disabled={isSubmitting}
                    type="submit"
                    spin={isSubmitting}
                  >
                    <FormattedMessage
                      id="sender-form-linkedin-button"
                      defaultMessage="Review and Sign with LinkedIn"
                    />
                  </LinkedInButton>
                </LinkedInButtonWrapper>
              </Form>
            )}
          </Formik>
          <Footer />
        </ContentContainer>
      </PageContentContainer>
    </Container>
  );
};

export default SenderForm;
