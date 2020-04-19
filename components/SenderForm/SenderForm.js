import React, {
  useState, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FadingCircle as Spinner } from 'better-react-spinkit';
import getConfig from 'next/config';

import {
  Formik,
  Field as FormikField,
  Form,
} from 'formik';

import LogoHeader from '../LogoHeader/LogoHeader';
import Input from '../Input/Input';
import EmailInput from '../Input/EmailInput';
import SelectInput from '../Input/SelectInput';
import AnchorButton from '../Clickable/AnchorButton';
import Footer from '../Footer/Footer';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FieldErrorMessage from '../ErrorMessage/FieldErrorMessage';

import { getClientOrigin, serializeOAuthState, timeout } from '../../util';
import * as sessionStorage from '../../lib/sessionStorage';

import HideIcon from './images/hide.svg';

const { publicRuntimeConfig: { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SCOPES } } = getConfig();

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
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
  }

  @media screen and (min-width: 992px) {
    margin-left: -46px;
    margin-right: 1pc;

    svg {
      width: 28px;
    }
  }
`;

const DocumentUrl = styled.h4`
  color: #aaaaaa;
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
  color: #ffffff;
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
  color: #aaaaaa;
  font-size: 16px;
  font-weight: 200;
  line-height: 28px;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }

  a {
    text-decoration: underline;
    color: #ffffff;
  }

  a:visited {
    color: #fffff;
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

export const NDA_OPTIONS = [
  {
    label: 'One Way',
    value: 'one-way',
  },
  {
    label: 'Mutual',
    value: 'mutual',
  },
];

const isValidEmail = (string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(string);

const SenderForm = ({ nda }) => {
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
      ndaType,
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
            ndaType,
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
      window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${LINKEDIN_CLIENT_SCOPES}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
    ndaType: nda.metadata.ndaType || 'one-way',
    recipientFullName: nda.metadata.recipientFullName || '',
    recipientEmail: nda.recipientEmail || '',
  };

  return (
    <Container>
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
            <DocumentUrl>{nda.metadata.secretLinks[0]}</DocumentUrl>
          </LinkWrapper>
          <DescriptionTitle>
            Recipient does not have access to your link unless he accepts the terms
            of the NDA.
          </DescriptionTitle>

          <Formik
            initialValues={initialValues}
            validate={onFormValidate}
            validateOnChange={false}
            validateOnBlur
            onSubmit={onSubmit}
          >
            {({
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
                    name="ndaType"
                    options={NDA_OPTIONS}
                    placeholder="NDA type (one-way, mutual)"
                  />
                  <FieldErrorMessage name="ndaType" component="div" />
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
                        <ErrorMessage style={{ marginTop: '1pc' }} color="#fff">
                          Did you mean
                          <AnchorButton
                            style={{
                              marginLeft: '6px',
                            }}
                            type="button"
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
                  Singing the NDA signifies that you have read and agree to the
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
                  >
                    {
                      isSubmitting ? (
                        <Spinner color="#FFFFFF" size={14} />
                      ) : 'Review and Sign with LinkedIn'
                    }
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
