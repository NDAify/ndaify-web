import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
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

import { getClientOrigin, serializeOAuthState } from '../../util';

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

const InputWrapper = styled.div`
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

const SenderFormBody = ({
  setFieldValue,
  ndaMetadata,
}) => {
  const [suggestedEmail, setSuggestedEmail] = useState();

  const ndaType = ndaMetadata?.ndaType;
  const name = ndaMetadata?.name;
  const email = ndaMetadata?.email;

  useEffect(() => {
    if (ndaType) {
      setFieldValue('ndaType', ndaType);
    }

    if (name) {
      setFieldValue('name', name);
    }

    if (email) {
      setFieldValue('email', email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Form>
      <InputWrapper>
        <FormikField
          as={SelectInput}
          name="ndaType"
          options={NDA_OPTIONS}
          placeholder="NDA type (one-way, mutual)"
        />
        <FieldErrorMessage name="ndaType" component="div" />
      </InputWrapper>

      <InputWrapper>
        <FormikField
          as={Input}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          name="name"
          placeholder="Recipient name"
          spellCheck={false}
        />
        <FieldErrorMessage style={{ marginTop: '1pc' }} name="name" component="div" />
      </InputWrapper>

      <InputWrapper>
        <FormikField
          as={EmailInput}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          name="email"
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
                  setFieldValue('email', suggestedEmail, true);
                  setSuggestedEmail(null);
                }}
              >
                {suggestedEmail}
              </AnchorButton>
              ?
            </ErrorMessage>
          )
        }

        <FieldErrorMessage style={{ marginTop: '1pc' }} name="email" component="div" />

      </InputWrapper>

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
          buttonText="Review and Sign with LinkedIn"
        />
      </LinkedInButtonWrapper>
    </Form>
  );
};

const SenderForm = () => {
  const router = useRouter();

  const ndaMetadata = useMemo(() => sessionStorage.getItem('nda metadata'), []);

  const handleFormValidate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }

    if (values.email && !isValidEmail(values.email)) {
      errors.email = 'Invalid email';
    }

    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  };
  const onFormValidate = useCallback(handleFormValidate);

  const handleSubmit = ({ ndaType, email, name }) => {
    sessionStorage.setItem(
      'nda metadata',
      {
        ...ndaMetadata,
        ndaType,
        email,
        name,
      },
    );

    const CALLBACK_URL_LINKEDIN = `${getClientOrigin()}/sessions/linkedin/callback`;
    const oAuthState = serializeOAuthState();
    window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${LINKEDIN_CLIENT_SCOPES}`);
  };
  const onSubmit = useCallback(handleSubmit);

  const initialValues = {
    ndaType: 'one-way',
    name: '',
    email: '',
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
            {props => <SenderFormBody {...props} ndaMetadata={ndaMetadata} />}
          </Formik>
          <Footer />
        </ContentContainer>
      </PageContentContainer>
    </Container>
  );
};

export default SenderForm;
