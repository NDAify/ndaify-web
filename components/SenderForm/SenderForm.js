import React, { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

import styled from 'styled-components';

import debounce from 'lodash.debounce';

import { Formik, Form } from 'formik';

import LogoHeader from '../LogoHeader/LogoHeader';
import Input from '../Input/Input';
import Footer from '../Footer/Footer';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import getEmailSuggestions from '../../utils/getEmailSuggestions';

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

  @media screen and (min-width: 994px) {
    flex-direction: row;
    align-items: center;
  }
`;

const HideIcon = styled.img`
  width: 20px;
  margin-left: 0;
  margin-right: 1pc;

  @media screen and (min-width: 994px) {
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

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const DescriptionTitle = styled.h4`
  font-weight: 200;
  color: #ffffff;
  font-size: 20px;
  margin: 0;
  margin-bottom: 2pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const DisclaimerText = styled.span`
  margin-bottom: 2pc;
  color: #aaaaaa;
  font-size: 16px;
  font-weight: 200;
  line-height: 28px;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const UnderlineText = styled.span`
  color: #ffffff;
  text-decoration: underline;
`;

const FormContainer = styled(Form)`
  margin-bottom: 2pc;
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

const ButtonLink = styled.button`
  border: 0;
  padding: 0;
  text-decoration: underline;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  margin-left: 6px;
`;

const isValidEmail = (string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(string);

const SenderForm = (props) => {
  const [ suggestedEmail, setSuggestedEmail ] = useState();

  const handleMisspelledEmail = (email) => {
    if (email) {
      const correctedEmail = getEmailSuggestions(email);
      if (correctedEmail) {
        setSuggestedEmail(correctedEmail);
        return;
      }
    }

    setSuggestedEmail(null);
  };

  const EmailError = ({ errors, setFieldValue }) => {
    if (suggestedEmail) {
      return (
        <ErrorMessage style={{ marginTop: '1pc' }}>
          Did you mean
        <ButtonLink
            type='button'
            onClick={() => {
              setFieldValue('email', suggestedEmail, true);
              setSuggestedEmail(null);
            }}
          >
            {suggestedEmail}
          </ButtonLink>?
      </ErrorMessage>
      )
    } else if (errors.email) {
      return (
        <ErrorMessage style={{ marginTop: '1pc' }}>
          {errors.email}
        </ErrorMessage>
      );
    }

    return null;
  };

  return (
    <Container>
      <PageContentContainer>
        <LogoImageContainer>
          <LogoHeader />
        </LogoImageContainer>

        <ContentContainer>
          {
            props.router.query.errorMessage ? (
              <ErrorMessage message={props.router.query.errorMessage} />
            ) : null
          }

          <LinkWrapper>
            <HideIcon src="/static/hideIcon.svg" alt="hidded icon" />
            <DocumentUrl>https://www.dropbox.com/sh/55wo9a…</DocumentUrl>
          </LinkWrapper>
          <DescriptionTitle>
            Recipient does not have access to your link unless he accepts the term
            of the NDA.
          </DescriptionTitle>

          <Formik
            noValidate
            initialValues={{ email: '', name: '', ndaType: '' }}
            validate={values => {
              let errors = {};

              if (!values.email) {
                errors.email = 'Required';
              }

              if (!isValidEmail(values.email)) {
                errors.email = 'Invalid email';
              }

              return errors;
            }}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ values,
              errors,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => {
              return (
                <FormContainer>
                  <InputWrapper>
                    <Input placeholder="NDA type (one-way, mutual)" />
                  </InputWrapper>
                  <InputWrapper>
                    <Input placeholder="Recipient name" />
                  </InputWrapper>
                  <InputWrapper>
                    <Input
                      autoCapitalize="none"
                      autoComplete="new-password"
                      autoCorrect="off"
                      name='email'
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        handleMisspelledEmail(e.target.value);
                      }}
                      placeholder="Recipient email"
                      spellCheck={false}
                      value={values.email}
                    />
                    <EmailError setFieldValue={setFieldValue} errors={errors} />
                  </InputWrapper>
                </FormContainer>
              )
            }}
          </Formik>

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
              buttonText="Review and Sign with LinkedIn"
            />
          </LinkedInButtonWrapper>
          <Footer />
        </ContentContainer>
      </PageContentContainer>
    </Container>
  );
}

export default withRouter(SenderForm);
