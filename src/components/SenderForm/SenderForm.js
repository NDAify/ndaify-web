import React, {
  useState, useCallback, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import getConfig from 'next/config';
import { FormattedMessage } from 'react-intl';

import {
  Formik,
  Field as FormikField,
  Form,
} from 'formik';

import Link from 'next/link';

import loggerClient from '../../db/loggerClient';

import NdaifyService from '../../services/NdaifyService';

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
import getTemplateIdParts from '../../utils/getTemplateIdParts';

import HideImg from './images/hide.svg';

const { publicRuntimeConfig: { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SCOPES } } = getConfig();

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
export const NDA_TEMPLATE_OPTIONS = [
  {
    label: 'Mutual',
    value: 'ndaify/ndaify-templates/b3ece24fd09f3a5d2efec55642398d17b721f4a9/STANDARD_MUTUAL.md',
  },
  {
    label: 'PANDA',
    value: 'ndaify/ndaify-templates/b3ece24fd09f3a5d2efec55642398d17b721f4a9/PANDA.md',
  },
];

const isValidEmail = (string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(string);

const TemplateDescription = (props) => {
  const [ndaTemplate, setNdaTemplate] = useState();

  const loadNdaDescription = useCallback(async (ndaTemplateId) => {
    const ndaifyService = new NdaifyService();
    const {
      owner, repo, ref, path,
    } = getTemplateIdParts(ndaTemplateId);

    const response = await ndaifyService.getNdaTemplate(owner, repo, ref, path);

    setNdaTemplate(response.ndaTemplate);
  }, []);

  useEffect(() => {
    loadNdaDescription(props.ndaTemplateId);
  }, [loadNdaDescription, props.ndaTemplateId]);

  if (!ndaTemplate) {
    return null;
  }

  const {
    owner, repo, ref, path,
  } = getTemplateIdParts(props.ndaTemplateId);

  return (
    <>
      <PageTitle prepend={`New ${ndaTemplate.data.title} - `} />
      <NdaDescriptionText>
        <a
          href={`https://github.com/${owner}/${repo}/blob/${ref}/${path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ndaTemplate.data.description}
        </a>
      </NdaDescriptionText>
    </>
  );
};

const SenderForm = ({ user, nda }) => {
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
        `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${LINKEDIN_CLIENT_SCOPES}`,
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
    ndaTemplateId: nda.metadata.ndaTemplateId || NDA_TEMPLATE_OPTIONS.find(
      (opt) => opt.label === 'Mutual',
    ).value,
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
            >
              {nda.metadata.secretLinks[0]}
            </DocumentUrl>
          </LinkWrapper>
          <DescriptionTitle>
            Recipient does not have access to your link unless they accept the terms
            of the NDA.
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
                  <FormikField
                    as={SelectInput}
                    name="ndaTemplateId"
                    options={NDA_TEMPLATE_OPTIONS}
                    placeholder="NDA type (one-way, mutual)"
                  />
                  <TemplateDescription ndaTemplateId={values.ndaTemplateId} />
                  <FieldErrorMessage name="ndaTemplateId" component="div" />
                </InputContainer>

                <InputContainer>
                  <FormikField
                    as={Input}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    name="recipientFullName"
                    placeholder="Recipient name"
                    spellCheck={false}
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
                    placeholder="Recipient email"
                    spellCheck={false}
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
                  Signing the NDA signifies that you have read and agree to the
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="/terms">Terms of Use</a>
                  {' '}
                  and
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="/privacy">Privacy Policy</a>
                  {' '}
                  .
                </DisclaimerText>

                <LinkedInButtonWrapper>
                  <LinkedInButton
                    disabled={isSubmitting}
                    type="submit"
                    spin={isSubmitting}
                  >
                    Review and Sign with LinkedIn
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
