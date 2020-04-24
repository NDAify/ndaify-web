import React, { useCallback } from 'react';
import styled from 'styled-components';

import {
  Formik,
  Form,
} from 'formik';

import { Router } from '../../routes';

import NDABody from './NDABody';
import Button from '../Clickable/Button';
import Footer from '../Footer/Footer';
import SignatureHolder from '../SignatureHolder/SignatureHolder';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import * as sessionStorage from '../../lib/sessionStorage';
import { timeout } from '../../util';

import HideIcon from './images/hide.svg';

import getFullNameFromUser from './getFullNameFromUser';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NDADocumentContainer = styled.div`
  padding: 1pc;
  padding-top: 2pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  margin-top: 3pc;
  box-sizing: border-box;
`;

const NDAContainer = styled.div`
  width: 100%;
`;

const NDAWrapper = styled.div`
  margin-bottom: 5pc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SigRow = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  margin-bottom: 3pc;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    height: auto;
  }
`;

const PartyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  flex: 1;
  align-items: center;

  :first-of-type {
    margin-bottom: 3pc;
  }

  @media screen and (min-width: 992px) {
    align-items: flex-start;
    padding-left: 3pc;
    padding-right: 3pc;

    :first-of-type {
      padding-left: 0;
      margin-bottom: 0;
    }

    :nth-of-type(2) {
      padding-right: 0;
    }
  }
`;

const NDAPartyName = styled.span`
  font-size: 16px;
  margin-top: 1pc;
  color: #ffffff;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDAPartyOrganization = styled.span`
  font-size: 16px;
  line-height: 28px;
  color: #ffffff;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDASenderDisclaimer = styled.span`
  font-size: 12px;
  color: #aaaaaa;
  margin-top: 8px;
  line-heitgh: 20px;
`;

const AttachmentSectionContainer = styled.div`
`;

const AttachmentTitle = styled.h4`
  font-size: 28px;
  font-weight: 200;
  margin: 0;
  color: #ffffff;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
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

const DocumentUrl = styled.a`
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

const DisclaimerTitle = styled.h4`
  font-size: 20px;
  margin: 0;
  color: #ffffff;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
  color: #ffffff;
`;

const NDADisclaimerWrapper = styled.div`
  width: 100%;
  max-width: 576px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const DisclaimerBody = styled.h4`
  font-size: 20px;
  line-height: 28px;
  margin: 0;
  margin-bottom: 4pc;
  font-weight: 200;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

export const extractCompanyNameFromText = (text, personName) => {
  if (!text || !personName) {
    return null;
  }
  const lowerCaseText = text.toLowerCase();
  const lowerCasePersonName = personName.toLowerCase();

  if (lowerCaseText === lowerCasePersonName) {
    return null;
  }

  if (lowerCaseText.startsWith(`${lowerCasePersonName},`)) {
    const [, ...parts] = text.split(',');
    return parts.join().trim();
  }

  return text;
};

const NDAComposer = ({ user, nda }) => {
  const handleDiscardButtonClick = () => {
    Router.replaceRoute('/');
    sessionStorage.clear();
  };
  const onDiscardButtonClick = useCallback(handleDiscardButtonClick, []);

  const handleSubmit = async (
    {
      disclosingParty,
      receivingParty,
    },
    {
      setStatus,
    },
  ) => {
    // clear all error messages before retrying
    setStatus();

    try {
      sessionStorage.setItem(
        'nda',
        {
          ...nda,
          metadata: {
            ...nda.metadata,
            ndaParamaters: {
              disclosingParty,
              receivingParty,
            },
          },
        },
      );

      // Pretend like we are doing some work before moving to next step
      // This is much better UX than just navigating away from the form
      await timeout(1000);

      Router.replaceRoute('nda-pay');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setStatus({ errorMessage: error.message });
    }
  };
  const onSubmit = useCallback(handleSubmit, []);

  const ownerFullName = getFullNameFromUser(user);

  const initialValues = {
    disclosingParty: ownerFullName,
    receivingParty: nda.metadata.recipientFullName,
  };

  const { recipientFullName } = nda.metadata;

  return (
    <Container>
      <UserActionBanner
        user={user}
        actionButton={() => (
          <Button
            compact
            color="#dc564a"
            onClick={onDiscardButtonClick}
          >
            Discard
          </Button>
        )}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ values, status, isSubmitting }) => {
          const ownerCompanyName = extractCompanyNameFromText(
            values.disclosingParty,
            ownerFullName,
          );
          const recipientCompanyName = extractCompanyNameFromText(
            values.receivingParty, nda.metadata.recipientName,
          );

          return (
            <Form>
              <NDADocumentContainer>
                <NDAContainer>
                  <NDAWrapper>

                    <NDADisclaimerWrapper>
                      <DisclaimerTitle>
                        <BoldText>Almost done.</BoldText>
                      </DisclaimerTitle>
                    </NDADisclaimerWrapper>

                    <NDADisclaimerWrapper>
                      <DisclaimerBody>
                        By signing, both
                        {' '}
                        <BoldText>you</BoldText>
                        {' '}
                        and
                        {' '}
                        <BoldText>{recipientFullName}</BoldText>
                        {' '}
                        are agreeing to terms of an NDA to
                        {' '}
                        <BoldText>protect all parties and materials disclosed</BoldText>
                        .
                      </DisclaimerBody>
                    </NDADisclaimerWrapper>

                    <NDABody
                      editable
                      nda={{
                        ...nda,
                        owner: user,
                      }}
                    />
                  </NDAWrapper>

                  {
                    status ? (
                      <ErrorMessage style={{ marginBottom: '3pc' }}>
                        {status.errorMessage}
                      </ErrorMessage>
                    ) : null
                  }

                  <SigRow>
                    <PartyWrapper>
                      <SignatureHolder />
                      <NDAPartyName>{nda.metadata.recipientName}</NDAPartyName>
                      <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
                    </PartyWrapper>
                    <PartyWrapper>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ backgroundColor: '#4AC09A' }}
                        spin={isSubmitting}
                      >
                        Sign
                      </Button>
                      <NDAPartyName>{ownerFullName}</NDAPartyName>
                      <NDAPartyOrganization>{ownerCompanyName}</NDAPartyOrganization>
                      <NDASenderDisclaimer>
                        I,
                        {' '}
                        {ownerFullName}
                        , certify that I have read the contract,
                        {' '}
                        and understand that clicking &#39;Sign&#39;
                        {' '}
                        constitutes a legally binding signature.
                      </NDASenderDisclaimer>
                    </PartyWrapper>
                  </SigRow>

                  <AttachmentSectionContainer>
                    <AttachmentTitle>Attachments</AttachmentTitle>
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
                      Recipient does not have access to your link unless he accepts the
                      terms of the NDA.
                    </DescriptionTitle>
                  </AttachmentSectionContainer>

                  <Footer withLogo />
                </NDAContainer>
              </NDADocumentContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default NDAComposer;