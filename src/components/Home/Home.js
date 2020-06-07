import React, {
  useCallback, useEffect,
} from 'react';
import isUrl from 'is-url';
import Link from 'next/link';
import Router from 'next/router';
import { useIntl, defineMessage, FormattedMessage } from 'react-intl';

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
import Typewriter from '../Typewriter/Typewriter';
import Avatar from '../Avatar/Avatar';

import UserActionBanner from '../UserActionBanner/UserActionBanner';
import NdaIcon from './images/nda.svg';

import * as sessionStorage from '../../lib/sessionStorage';
import loggerClient from '../../db/loggerClient';

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
  margin-bottom: 7pc;
  position: relative;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const CopyText = styled.span`
  font-size: 28px;
  color: var(--ndaify-fg);

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const FormattedMessageContainer = styled.span`
  position: absolute;
  top: 0;
  left: 0;
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
  margin-bottom: 4pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
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
  font-size: 20px;
  line-height: 28px;
  font-weight: 200;
  max-width: 200px;

  @media screen and (min-width: 992px) {
    font-size: 24px;
    line-height: 32px;
    max-width: 240px;
  }
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
  margin-bottom: 1pc;
  width: 100%;
  font-size: 20px;
  line-height: 28px;
  color: var(--ndaify-fg);

  @media screen and (min-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }

  a {
    text-decoration: underline;
    background-color: transparent;
    color: var(--ndaify-fg);
  }

  a:visited {
    color: var(--ndaify-fg);
  }
`;

const FAQQuestion = styled.div`
font-size: inherit;
line-height: inherit;
  color: var(--ndaify-fg);
  margin-bottom: 1pc;

  @media screen and (min-width: 768px) {
  }
`;

const FAQAnswer = styled.div`
  font-size: inherit;
  line-height: inherit;
  color: var(--ndaify-fg);
  font-weight: 200;

  @media screen and (min-width: 768px) {
  }
`;

const secretLinkInputPlaceholder = defineMessage({
  id: 'secret-link-input-placeholder',
  defaultMessage: 'Paste a secret link',
});

const Home = ({ user, ndaStatistics, refSource }) => {
  const intl = useIntl();
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
      loggerClient.error(error);
      setStatus({ errorMessage: error.message });
    }
  };

  const onSubmit = useCallback(handleSubmit, []);

  const initialValues = {
    secretLink: '',
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
            <FormattedMessageContainer>
              <FormattedMessage
                id="home-title"
                defaultMessage="NDAify helps you keep your {typeOfSecret} secrets under wraps."
                values={{
                  typeOfSecret: (
                    <Typewriter>
                      <FormattedMessage
                        id="home-title-value-trade"
                        defaultMessage="trade"
                      />
                      <FormattedMessage
                        id="home-title-value-personal"
                        defaultMessage="personal"
                      />
                    </Typewriter>
                  ),
                }}
              />

              {' '}
              <CopyText>
                <FormattedMessage
                  id="home-title-decoration"
                  defaultMessage="Try it free."
                />
              </CopyText>
            </FormattedMessageContainer>
          </CopyTitle>
          <Subtitle>
            <FormattedMessage
              id="home-nda-couple-minutes"
              defaultMessage="Send an NDA in a couple minutes."
            />
          </Subtitle>
          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={Object.keys(initialValues).length > 1}
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
                    placeholder={intl.formatMessage(secretLinkInputPlaceholder)}

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
                  <FormattedMessage
                    id="button-continue"
                    defaultMessage="Continue"
                  />
                </Button>
              </Form>
            )}
          </Formik>

          {
            user ? (
              <FormCopy>
                <FormattedMessage
                  id="home-form-dashboard-info"
                  defaultMessage="Or, go to {dashboard} to see your NDAs."
                  values={{
                    dashboard: (
                      <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
                        <Anchor>
                          <FormattedMessage
                            id="home-form-dashboard-info-dashboard"
                            defaultMessage="dashboard"
                          />
                        </Anchor>
                      </Link>
                    ),
                  }}
                />
              </FormCopy>
            ) : (
              <FormCopy>
                <FormattedMessage
                  id="home-form-login-info"
                  defaultMessage="Or, {login} to see your NDAs."
                  values={{
                    login: (
                      <Link passHref href="/login">
                        <Anchor>
                          <FormattedMessage
                            id="home-form-login-info-login"
                            defaultMessage="log in"
                          />
                        </Anchor>
                      </Link>
                    ),
                  }}
                />
              </FormCopy>
            )
          }

          <NdaInfoContainer>
            <NdaIcon />
            <NDAInfoText>
              <FormattedMessage
                id="home-nda-statistics-sum-7-days"
                defaultMessage="{num7days} NDAs were sent in the last 7 days"
                values={{
                  num7days: ndaStatistics.sum7days,
                }}
              />
            </NDAInfoText>
          </NdaInfoContainer>

        </ContentContainer>
      </PageContainer>

      <PageSection>
        <PageSectionPane>
          <span>
            <FormattedMessage
              id="home-copy-behind-wall"
              defaultMessage="Protect your assets behind an NDA-wall"
            />
          </span>
        </PageSectionPane>
        <PageOverflowPane>
          <Browser />
        </PageOverflowPane>
      </PageSection>

      <FAQContainer>
        <FAQTitle>
          <FormattedMessage
            id="home-faq-title"
            defaultMessage="Frequently asked questions"
          />
        </FAQTitle>

        <FAQcontent>
          <FAQQuestion>
            <FormattedMessage
              id="home-faq-new-nda"
              defaultMessage="Can I add a new NDA?"
            />
          </FAQQuestion>
          <FAQAnswer>
            <FormattedMessage
              id="home-faq-answer-new-nda"
              defaultMessage="No. This is the whole point of NDAify. We want to have a standard text that everyone’s familiar with as to how they’re protected by being a party to it."
            />
          </FAQAnswer>
        </FAQcontent>
        <FAQcontent>
          <FAQQuestion>
            <FormattedMessage
              id="home-faq-question-amend-nda"
              defaultMessage="Can I amend the NDA?"
            />
          </FAQQuestion>
          <FAQAnswer>
            <FormattedMessage
              id="home-faq-answer-amend-nda"
              defaultMessage="You can’t currently make ammendments to the NDA."
            />
          </FAQAnswer>
        </FAQcontent>
        <FAQcontent>
          <FAQQuestion>
            <FormattedMessage
              id="home-faq-question-cost"
              defaultMessage="How much does NDAify cost?"
            />
          </FAQQuestion>
          <FAQAnswer>
            <FormattedMessage
              id="home-faq-answer-cost"
              defaultMessage="NDAify is {free}. Now and then we may solicit contributions but the basic functionality of sending and receiving NDAs will {remainFreeForever}."
              values={{
                free: (
                  <b>
                    <FormattedMessage
                      id="home-faq-answer-cost-free"
                      defaultMessage="free"
                    />
                  </b>
                ),
                remainFreeForever: (
                  <a
                    href="https://www.npr.org/sections/money/2012/07/13/156737801/the-cost-of-free-doughnuts-70-years-of-regret"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FormattedMessage
                      id="home-faq-answer-cost-remain-free"
                      defaultMessage="remain free forever"
                    />
                  </a>
                ),
              }}
            />
          </FAQAnswer>
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
