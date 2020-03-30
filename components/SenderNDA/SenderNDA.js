import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from '../../routes';

import NDA from '../NDA/NDA';
import Button from '../Clickable/Button';
import Footer from '../Footer/Footer';
import SignatureHolder from '../SignatureHolder/SignatureHolder';
import UserActionBanner from '../UserActionBanner/UserActionBanner';

import * as sessionStorage from '../../lib/sessionStorage';

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

const isValidCompany = string => string && /\S/.test(string);
const extractNameFromInput = (string) => {
  if (string?.includes(',')) {
    return string.split(',')[0];
  }
  return string;
};
const extractCompanyFromInput = (string) => {
  if (string?.includes(',') && string.split(',').slice(-1)[0] && isValidCompany(string.split(',').slice(-1)[0])) {
    return string.split(',').slice(-1)[0];
  }
  return null;
};

const SenderNDA = (props) => {
  const { user } = props;
  const senderName = `${user?.metadata.linkedInProfile.firstName} ${user?.metadata.linkedInProfile.lastName}`;
  const senderEmail = user?.metadata.linkedInProfile.emailAddress;

  const ndaMetadata = useMemo(() => sessionStorage.getItem('nda metadata'), []);

  const [recipientInput, setRecipientInput] = useState(ndaMetadata?.name || '');
  const [senderInput, setSenderInput] = useState(senderName || '');

  const handleRecipientInputChange = (e) => {
    setRecipientInput(e.currentTarget.innerText);
  };

  const handleSenderInputChange = (e) => {
    setSenderInput(e.currentTarget.innerText);
  };

  const sender = {
    name: senderName,
    email: senderEmail,
  };

  const recipient = {
    name: extractNameFromInput(recipientInput),
  };

  const senderCompany = extractCompanyFromInput(senderInput);
  const recipientCompany = extractCompanyFromInput(recipientInput);

  return (
    <Container>
      <UserActionBanner
        user={sender}
        ActionButton={() => (
          <Button
            compact
            color="#dc564a"
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            Discard
          </Button>
        )}
      />
      <NDADocumentContainer>
        <NDAContainer>
          <NDAWrapper>
            <NDA
              sender={sender}
              recipient={recipient}
              onRecipientChange={handleRecipientInputChange}
              onSenderChange={handleSenderInputChange}
            />
          </NDAWrapper>
          <ActionRow>
            <PartyWrapper>
              <SignatureHolder />
              <NDAPartyName>{recipient.name}</NDAPartyName>
              <NDAPartyOrganization>{recipientCompany}</NDAPartyOrganization>
            </PartyWrapper>
            <PartyWrapper>
              <Link route="/payment-form">
                <Button style={{ backgroundColor: '#4AC09A' }}>Sign</Button>
              </Link>
              <NDAPartyName>{sender.name}</NDAPartyName>
              <NDAPartyOrganization>{senderCompany}</NDAPartyOrganization>
              <NDASenderDisclaimer>
                I,
                {' '}
                {sender.name}
                , certify that I have read the contract,
                {' '}
                and understand that clicking &#39;Sign&#39;
                {' '}
                constitutes a legally binding signature.
              </NDASenderDisclaimer>
            </PartyWrapper>
          </ActionRow>

          <AttachmentSectionContainer>
            <AttachmentTitle>Attachments</AttachmentTitle>
            <LinkWrapper>
              <HideIcon src="/static/hideIcon.svg" alt="hidded icon" />
              <DocumentUrl>{ndaMetadata?.secretLink}</DocumentUrl>
            </LinkWrapper>
            <DescriptionTitle>
              Recipient does not have access to your link unless he accepts the
              term of the NDA.
            </DescriptionTitle>
          </AttachmentSectionContainer>

          <Footer withLogo />
        </NDAContainer>
      </NDADocumentContainer>
    </Container>
  );
};

export default SenderNDA;
