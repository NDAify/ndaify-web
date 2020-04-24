import React, { useCallback, useEffect } from 'react';
import isUrl from 'is-url';

import styled from 'styled-components';

import { Formik, Form, Field as FormikField } from 'formik';

import { Link, Router } from '../../routes';

import Anchor from '../Clickable/Anchor';
import LogoHeader from '../LogoHeader/LogoHeader';
import Input from '../Input/Input';
import CustomNote from '../CustomNote/CustomNote';
import Footer from '../Footer/Footer';
import Button from '../Clickable/Button';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import OpenSourceBanner from '../OpenSourceBanner/OpenSourceBanner';
import FieldErrorMessage from '../ErrorMessage/FieldErrorMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';

import UserActionBanner from '../UserActionBanner/UserActionBanner';

import * as sessionStorage from '../../lib/sessionStorage';

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

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const CopyText = styled.span`
  font-size: 28px;
  color: #ffffff;
  padding-bottom: 5pc;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const FreeText = styled.span`
  color: #ffffff;
`;

const Subtitle = styled.h3`
  font-size: 28px;
  color: #ffffff;
  font-weight: 200;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
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

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const ProfileImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-right: 12px;
`;

const Home = ({ user, showCustomNote = false }) => {
  // Let's get rid of the secret if the user returns home
  useEffect(() => {
    sessionStorage.setItem('nda', null);
  }, []);

  const handleFormValidate = (values) => {
    const errors = {};

    if (!isUrl(values.secretLink)) {
      errors.secretLink = 'hmm, are you sure this is a valid url?';
    }

    return errors;
  };

  const onFormValidate = useCallback(handleFormValidate, []);

  const handleSubmit = async ({ secretLink }, { setStatus }) => {
    setStatus();

    try {
      sessionStorage.setItem(
        'nda',
        {
          metadata: {
            secretLinks: [secretLink],
          },
        },
      );
      Router.pushRoute('nda-new');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setStatus({ errorMessage: error.message });
    }
  };

  const onSubmit = useCallback(handleSubmit, []);

  return (
    <Container>

      {
        user ? (
          <UserActionBanner
            user={user}
            actionButton={() => (
              <>
                <Link route="/dashboard/incoming">
                  <ButtonAnchor
                    outline
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  >
                    <ProfileImage
                      alt=""
                      src={user.metadata.linkedInProfile.profilePicture}
                    />
                    <span>
                      Dashboard
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
              Try it
              {' '}
              <FreeText>free</FreeText>
              .
            </CopyText>
          </CopyTitle>
          <Subtitle>Send an NDA in a couple minutes.</Subtitle>

          <Formik
            initialValues={{ secretLink: '' }}
            validateOnChange={false}
            validateOnBlur
            validate={onFormValidate}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form style={{ marginBottom: '1pc' }}>
                {
                  status ? (
                    <ErrorMessage style={{ marginBottom: '3pc' }}>
                      {status.errorMessage}
                    </ErrorMessage>
                  ) : null
                }
                <InputContainer>
                  <FormikField
                    as={Input}
                    name="secretLink"
                    placeholder="Paste a secret link"

                    spellCheck={false}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                  />
                  <FieldErrorMessage style={{ marginTop: '1pc' }} name="secretLink" component="div" />
                </InputContainer>

                <Button
                  type="submit"
                  color="#39d494"
                  spin={isSubmitting}
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>

          {
            user ? (
              <FormCopy>
                Or, go to
                {' '}
                <Link route="/dashboard/incoming">
                  <Anchor>dashboard</Anchor>
                </Link>
                {' '}
                to see your NDAs.
              </FormCopy>
            ) : (
              <FormCopy>
                Or,
                {' '}
                <Link route="/login">
                  <Anchor>log in</Anchor>
                </Link>
                {' '}
                to see your NDAs.
              </FormCopy>
            )
          }
          <Footer />
        </ContentContainer>
      </PageContainer>
    </Container>
  );
};

export default Home;
