import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FormattedDate } from 'react-intl';

import {
  Formik,
  Form,
} from 'formik';

import NDA from './NDA';
import Button from '../Clickable/Button';
import Footer from '../Footer/Footer';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import SignatureHolder from '../SignatureHolder/SignatureHolder';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { extractCompanyNameFromText } from './SenderNDA';

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
`;


const ActionRow = styled.div`
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
    padding-left: 4pc;
    padding-right: 4pc;

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

const NDASignedDate = styled.span`
  font-size: 12px;
  color: #ffffff;
  line-height: 28px;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 16px;
  }
`;

const NDASenderDisclaimer = styled.span`
  font-size: 12px;
  color: #aaaaaa;
  margin-top: 8px;
  line-heitgh: 20px;
`;

const AttachmentSectionContainer = styled.div``;

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

const AttachmentMessage = styled.h4`
  margin: 0;
  font-size: 20px;
  font-weight: 200;
  color: #4ac09a;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const DeclineButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 2pc;
  padding-bottom: 0;
  box-sizing: border-box;
`;

const RecipientDNA = ({ nda }) => {
  const senderFullName = getFullNameFromUser(nda.owner);

  const senderCompanyName = extractCompanyNameFromText(
    nda.metadata.ndaParamaters.disclosingParty,
    senderFullName,
  );
  const recipientCompanyName = extractCompanyNameFromText(
    nda.metadata.ndaParamaters.receivingParty,
    nda.metadata.recipientFullName,
  );

  const handleSubmit = async () => {};
  const onSubmit = useCallback(handleSubmit, []);

  return (
    <Container>
      <UserActionBanner />
      <DeclineButtonWrapper>
        <Button compact color="#dc564a">Decline</Button>
      </DeclineButtonWrapper>
      <Formik
        onSubmit={onSubmit}
      >
        {({ status, isSubmitting }) => (
          <Form>
            <NDADocumentContainer>
              <NDAContainer>
                <NDAWrapper>
                  <NDA
                    nda={nda}
                    isRecipientNDA
                  />
                </NDAWrapper>

                {
                  status ? (
                    <ErrorMessage style={{ marginBottom: '3pc' }}>
                      {status.errorMessage}
                    </ErrorMessage>
                  ) : null
                }

                <ActionRow>
                  <PartyWrapper>
                    <LinkedInButton
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Sign with LinkedIn
                    </LinkedInButton>
                    <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
                    {
                      recipientCompanyName ? (
                        <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
                      ) : null
                    }
                    <NDASenderDisclaimer>
                      {`I, ${nda.metadata.recipientFullName}, certify that I have read the contract, and understand that clicking 'Sign' constitutes a legally binding signature.`}
                    </NDASenderDisclaimer>
                  </PartyWrapper>
                  <PartyWrapper>
                    <SignatureHolder name={senderFullName} />
                    <NDAPartyName>{senderFullName}</NDAPartyName>
                    {
                      senderCompanyName ? (
                        <NDAPartyOrganization>{senderCompanyName}</NDAPartyOrganization>
                      ) : null
                    }
                    <NDASignedDate>
                      <FormattedDate
                        year="numeric"
                        month="long"
                        day="numeric"
                        value={nda.createdAt}
                      />
                    </NDASignedDate>
                  </PartyWrapper>
                </ActionRow>

                <AttachmentSectionContainer>
                  <AttachmentTitle>Attachments</AttachmentTitle>
                  <AttachmentMessage>
                    You need to accept to view attachments.
                  </AttachmentMessage>
                </AttachmentSectionContainer>

                <Footer withLogo />
              </NDAContainer>
            </NDADocumentContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RecipientDNA;
