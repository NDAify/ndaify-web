import React, { useRef, useMemo } from 'react';
import { Router } from '../../routes';

import Link from 'next/link';

import styled from 'styled-components';

import { Formik, Form, Field } from 'formik';
import debounce from 'lodash.debounce';

import LogoHeader from '../LogoHeader/LogoHeader';
import Input from '../Input/Input';
import CustomNote from '../CustomNote/CustomNote';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import OpenSourceBanner from '../OpenSourceBanner/OpenSourceBanner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getItemFromSessionStorage, setItemFromSessionStorage } from '../../lib/sessionStorage';

const HomePageButton = styled(Button)`
  background-color: #39d494;
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

const CopyTitle = styled.h3`
  color: #aaaaaa;
  font-size: 28px;
  font-weight: 200;
  margin: 0;
  margin-bottom: 3pc;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const CopyText = styled.span`
  font-size: 28px;
  color: #ffffff;
  padding-bottom: 5pc;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const FreeText = styled.span`
  text-decoration: underline;
  color: #ffffff;
`;

const Subtitle = styled.h3`
  font-size: 28px;
  color: #ffffff;
  font-weight: 200;
  margin-bottom: 2pc;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 2pc;
`;

const FormCopy = styled.h4`
  font-size: 20px;
  font-weight: 200;
  color: #ffffff;
  margin: 0;
  margin-bottom: 3pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const FormWrapper = styled.div`
  margin-bottom: 1pc;
`;

const FormLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const isUrl = (string) => string && typeof string === 'string' && string.includes('.');

const Home = ({ showCustomNote = false }) => {
  const secretLinkInputRef = useRef();

  const onValidateSecretLink = debounce(secretLink => {
    let error;

    if (!isUrl(secretLink)) {
      error = 'hmm, are you sure this is a valid url?';
    }

    return error;
  }, 100);

  let secretLink = '';
  useMemo(() => {
    secretLink = getItemFromSessionStorage('nda metadata')?.secretLink || '';
  }, []);
  
  return (
    <Container>
      <OpenSourceBanner />
      {
        showCustomNote && <CustomNote />
      }
      <PageContainer>
        <LogoImageContainer>
          <LogoHeader />
        </LogoImageContainer>
        <ContentContainer>
          <CopyTitle>
            NDAify helps you keep your trade secrets under wraps.
            {' '}
            <CopyText>
              {'Try it'}
              {' '}
              <FreeText>FREE</FreeText>
              .
            </CopyText>
          </CopyTitle>
          <Subtitle>Send an NDA in a couple minutes.</Subtitle>

          <Formik
            initialValues={{ secretLink: secretLink }}
            onSubmit={onValidateSecretLink}
          >
            {({ errors, values, isValidating }) => {
              return (
                <FormWrapper>
                  <Form>
                    {
                      errors.secretLink ? (
                        <ErrorMessage>{errors.secretLink}</ErrorMessage>
                      ) : null
                    }
                    <InputContainer>
                      <Field validate={onValidateSecretLink} component={Input} innerRef={secretLinkInputRef} name='secretLink' placeholder="Paste a secret link" />
                    </InputContainer>

                    <HomePageButton
                      disabled={errors.secretLink || isValidating}
                      type='submit'
                      onClick={() => {
                        setItemFromSessionStorage('nda metadata', { secretLink: values.secretLink });
                        Router.pushRoute('form');
                      }}
                    >
                      Continue
                    </HomePageButton>
                  </Form>
                </FormWrapper>
              )
            }}
          </Formik>

          <FormCopy>
            Or,
            {' '}
            <Link href='/login'>
              <FormLink>log in</FormLink>
            </Link>
            {' '}
            to see your NDAs.
          </FormCopy>
          <Footer />
        </ContentContainer>
      </PageContainer>
    </Container>
  );
}

export default Home;
