import React from "react";
import Link from "next/link";

import styled from "styled-components";

import NDA from "../NDA/NDA";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import SignatureHolder from "../SignatureHolder/SignatureHolder";
import UserActionBanner from "../UserActionBanner/UserActionBanner";

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

  @media screen and (min-width: 994px) {
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

  @media screen and (min-width: 994px) {
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

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const NDAPartyOrganization = styled.span`
  font-size: 16px;
  line-height: 28px;
  color: #ffffff;
  font-weight: 200;

  @media screen and (min-width: 994px) {
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

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
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

const SenderNDA = () => {
  const sender = {
    name: "Jake Murzy"
  };
  const recipient = {
    name: "Jeremy Voss",
    company: "Flake, Inc."
  };
  return (
    <Container>
      <UserActionBanner />
      <NDADocumentContainer>
        <NDAContainer>
          <NDAWrapper>
            <NDA sender={sender} recipient={recipient} />
          </NDAWrapper>
          <ActionRow>
            <PartyWrapper>
              <SignatureHolder />
              <NDAPartyName>Jeremy Voss</NDAPartyName>
              <NDAPartyOrganization>Flake, Inc.</NDAPartyOrganization>
            </PartyWrapper>
            <PartyWrapper>
              <Link href="/payment-form">
                <Button style={{ backgroundColor: "#4AC09A" }}>Sign</Button>
              </Link>
              <NDAPartyName>Joe Doe</NDAPartyName>
              <NDASenderDisclaimer>
                I, Joe Doe, certify that I have read the contract, and
                understand that clicking ‘Sign' constitutes a legally binding
                signature.
              </NDASenderDisclaimer>
            </PartyWrapper>
          </ActionRow>

          <AttachmentSectionContainer>
            <AttachmentTitle>Attachments</AttachmentTitle>
            <LinkWrapper>
              <HideIcon src="/static/hideIcon.svg" alt="hidded icon" />
              <DocumentUrl>https://www.dropbox.com/sh/55wo9a…</DocumentUrl>
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
