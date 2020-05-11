import React, { useCallback, useEffect } from 'react';
import isUrl from 'is-url';
import Link from 'next/link';
import Router from 'next/router';
import { FormattedMessage } from 'react-intl';

import styled from 'styled-components';

import { Formik, Form, Field as FormikField } from 'formik';

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
import Browser from '../Browser/Browser';

import UserActionBanner from '../UserActionBanner/UserActionBanner';
import NdaIcon from './images/nda.svg';

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
  color: var(--ndaify-accents-6);
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
  color: var(--ndaify-fg);
  padding-bottom: 5pc;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const FreeText = styled.span`
  color: var(--ndaify-fg);
`;

const Subtitle = styled.h3`
  font-size: 28px;
  color: var(--ndaify-fg);
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
  color: var(--ndaify-fg);
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

const NdaInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2pc;

  svg {
    width: 140px;
    margin-right: 2pc;
  }
`;

const NDAInfoText = styled.span`
  color: var(--ndaify-accents-9);
  font-size: 16px;
  line-height: 24px;
  font-weight: 200;
  max-width: 140px;
`;

const PageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);
`;

const PageSectionPane = styled.div`
  flex: 1;
  flex-basis: auto;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 1pc;

  width: 50%;

  color: var(--ndaify-fg);
  display: flex;
  flex-direction: column;
  height: 100%;

  span {
    align-self: flex-end;
    box-sizing: border-box;
    margin-right: 1pc;

    font-size: 20px;
    line-height: 30px;
    font-weight: 200;
  }

  @media screen and (min-width: 768px) {
    padding: 2pc;

    span {
      margin-right: 4pc;
      width: 280px;

      font-size: 24px;
      line-height: 32px;
    }
  }
`;

const PageOverflowPane = styled.div`
  flex: 1;
  flex-basis: auto;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 4pc;
  padding-left: 0pc;

  width: 50%;
  height: 100%;
`;

const FAQContainer = styled.div`
  margin-top: 4pc;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 992px;
  padding: 1pc;
`;

const FAQTitle = styled.div`
  font-size: 20px;
  color: var(--ndaify-fg);
  margin-bottom: 2pc;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const FAQcontent = styled.div`
  margin-top: 1pc;
  margin-bottom: 2pc;
  width: 100%;
  font-size: 20px;
  color: var(--ndaify-fg);

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const FAQQuestion = styled.div`
  font-size: 20px;
  color: var(--ndaify-fg);
  margin-bottom: 1pc;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const FAQAnswer = styled.div`
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 200;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const Home = ({ user, ndaStatistics, refSource }) => {
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
      Router.push('/nda/new');
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
                <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
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
        refSource ? (<CustomNote refSource={refSource} />) : null
      }
      <PageContainer>
        <LogoImageContainer>
          <LogoHeader />
        </LogoImageContainer>
        <ContentContainer>
          <CopyTitle>
            <FormattedMessage
              id="home-title"
              defaultMessage="NDAify helps you keep your trade secrets under wraps."
            />
            {' '}
            <CopyText>
              Try it
              {' '}
              <FreeText>free</FreeText>
              .
            </CopyText>
          </CopyTitle>
          <Subtitle>
            <FormattedMessage
              id="home-nda-couple-minutes"
              defaultMessage="Send an NDA in a couple minutes."
            />
          </Subtitle>
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
                  color="var(--ndaify-accents-success)"
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
                <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
                  <Anchor>dashboard</Anchor>
                </Link>
                {' '}
                to see your NDAs.
              </FormCopy>
            ) : (
              <FormCopy>
                Or,
                {' '}
                <Link passHref href="/login">
                  <Anchor>log in</Anchor>
                </Link>
                {' '}
                to see your NDAs.
              </FormCopy>
            )
          }

          <NdaInfoContainer>
            <NdaIcon />
            <NDAInfoText>
              {ndaStatistics.sum7days}
              {' '}
              NDAs were sent in the last 7 days
            </NDAInfoText>
          </NdaInfoContainer>

        </ContentContainer>
      </PageContainer>


      <PageSection>
        <PageSectionPane>
          <span>
            Protect your assets behind an NDA-wall
          </span>
        </PageSectionPane>
        <PageOverflowPane>
          <Browser />
        </PageOverflowPane>
      </PageSection>

      <FAQContainer>
        <FAQTitle>Frequently asked questions</FAQTitle>

        <FAQcontent>
          <FAQQuestion>Can I add a new NDA?</FAQQuestion>
          <FAQAnswer>No. This is the whole point of NDAify. We want to have a standard text that everyone’s familiar with as to how they’re protected by being a party to it.</FAQAnswer>
        </FAQcontent>
        <FAQcontent>
          <FAQQuestion>Can I amend the NDA?</FAQQuestion>
          <FAQAnswer>You can’t currently make ammendments to the NDA.</FAQAnswer>
        </FAQcontent>
        <FAQcontent>
          <FAQQuestion>How much does NDAify cost?</FAQQuestion>
          <FAQAnswer>NDAify is <b>free</b>. If and only if you think it adds value, you can consider supporting the project on Github Sponsorships.</FAQAnswer>
        </FAQcontent>
      </FAQContainer>


      <PageContainer>
      <ContentContainer>
          <Footer />
        </ContentContainer>
      </PageContainer>
    </Container>
  );
};

export default Home;
