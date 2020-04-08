import React, {
  useState, useCallback, useEffect,
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
  flex-direction: column;
  width: 100%;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    align-items: center;
  }
`;

const HideIcon = styled.img`
  width: 20px;
  margin-left: 0;
  margin-right: 1pc;

  @media screen and (min-width: 992px) {
    width: 28px;
    margin-left: -46px;
    margin-right: 1pc;
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
`;

const UnderlineText = styled.span`
  color: #ffffff;
  text-decoration: underline;
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

const NDA_OPTIONS = [
  {
    label: 'One Way',
    value: 'one-way',
  },
  {
    label: 'Mutual',
    value: 'mutual',
  },
];

const isValidEmail = string => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(string);

const SenderForm = ({ ndaMetadata }) => {
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

    if (!values.recipientName) {
      errors.recipientName = 'Required';
    }

    return errors;
  };
  const onFormValidate = useCallback(handleFormValidate, []);

  const handleSubmit = ({ ndaType, recipientName, recipientEmail }, { setStatus, setSubmitting }) => {
    setStatus();

    try {
      sessionStorage.setItem(
        'ndaMetadata',
        {
          ...ndaMetadata,
          ndaType,
          recipientName,
          recipientEmail,
        },
      );

      const CALLBACK_URL_LINKEDIN = `${getClientOrigin()}/sessions/linkedin/callback`;
      const oAuthState = serializeOAuthState();
      window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${LINKEDIN_CLIENT_SCOPES}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setStatus({ errorMessage: error.message });
    } finally {
      // Pretend like we are doing some work before redirecting to LinkedIn
      // This is much better UX than just navigating away from the form
      timeout(1000).then(() => setSubmitting(false));
    }
  };
  const onSubmit = useCallback(handleSubmit, []);

  const initialValues = {
    ndaType: ndaMetadata.ndaType || 'one-way',
    recipientName: ndaMetadata.recipientName || '',
    recipientEmail: ndaMetadata.recipientEmail || '',
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
              <ErrorMessage style={{ marginBottom: '3pc' }} message={router.query.errorMessage} />
            ) : null
          }

          <LinkWrapper>
            <HideIcon src="/static/hideIcon.svg" alt="hidded icon" />
            <DocumentUrl>{ndaMetadata?.secretLink}</DocumentUrl>
          </LinkWrapper>
          <DescriptionTitle>
            Recipient does not have access to your link unless he accepts the term
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
                      name="recipientName"
                      placeholder="Recipient name"
                      spellCheck={false}
                    />
                    <FieldErrorMessage style={{ marginTop: '1pc' }} name="recipientName" component="div" />
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
                    <UnderlineText>Terms of Use</UnderlineText>
                    {' '}
                and
                {' '}
                    <UnderlineText>Privacy Policy</UnderlineText>
                .
              </DisclaimerText>

                  <LinkedInButtonWrapper>
                    <LinkedInButton
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
