import React from "react";
import Link from "next/link";

import styled from "styled-components";

import NDA from "../NDA/NDA";
import Footer from "../Footer/Footer";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserDetailBannerContainer = styled.div`
  padding: 2pc;
  background-color: #5dbfc8;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 994px) {
    height: 90px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const UserDetails = styled.div`
  display: flex;
`;

const UserNameText = styled.span`
  font-size: 20px;
  font-weight: 200;
  display: block;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const UserEmailText = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-left: 0;

  @media screen and (min-width: 994px) {
    font-size: 24px;
    margin-left: 1pc;
  }
`;

const Button = styled.button`
  font-size: 20px;
  font-weight: 200;
  width: 160px;
  margin-top: 1pc;
  width: 230px;

  @media screen and (min-width: 994px) {
    font-size: 24px;
    margin-top: 0;
  }
`;

const NDADocumentContainer = styled.div`
  padding: 1pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  margin-top: 3pc;
`;

const NDAContainer = styled.div`
  margin-top: 1pc;
  width: 100%;
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  margin-top: 4pc;
  justify-content: space-between;

  @media screen and (min-width: 994px) {
    flex-direction: row;
    height: auto;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const NDAPartyName = styled.span`
  font-size: 16px;
  margin-top: 1pc;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const NDAPartyOrganization = styled.span`
  font-size: 16px;
  line-height: normal;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const AttachmentSectionContainer = styled.div`
  margin-top: 3pc;
`;

const AttachmentTitle = styled.h4`
  font-size: 28px;
  font-weight: 200;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const AttachmentUrlContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1pc;

  @media screen and (min-width: 994px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const HideIcon = styled.img`
  width: 28px;
  margin-left: 0;
  margin-right: 1pc;

  @media screen and (min-width: 994px) {
    width: 36px;
    margin-left: -56px;
    margin-right: 1pc;
  }
`;

const AttachmentUrl = styled.h4`
  color: #aaaaaa;
  font-size: 20px;
  word-wrap: break-word;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const AttachmentDisclaimer = styled.span`
  font-size: 16px;
  line-height: normal;
  font-weight: 200;
  display: block;
  margin-top: 1pc;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const FooterLogoContainer = styled.div`
  margin-top: 7pc;
  display: flex;
  justify-content: center;
`;

const FooterContainer = styled.footer`
  margin-top: 3pc;
`;

const Disclaimer = styled.span`
  color: #aaaaaa;
  font-size: 12px;
  @media screen and (min-width: 994px) {
    font-size: 16px;
  }
  margin-top: 1pc;
  display: block;
  font-weight: 200;
`;

const DisclaimerLink = styled.a`
  color: #ffffff;
  text-decoration: underline;
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
      <UserDetailBannerContainer>
        <UserDetails>
          <UserNameText>Joe Doe</UserNameText>
          <UserEmailText>{"<joe@gmail.com>"}</UserEmailText>
        </UserDetails>

        <Button style={{ backgroundColor: "#dc564a" }}>Cancel</Button>
      </UserDetailBannerContainer>
      <NDADocumentContainer>
        <NDAContainer>
          <NDA sender={sender} recipient={recipient} />
          <ActionRow>
            <ButtonWrapper>
              <Button style={{ backgroundColor: "#7254b7" }}>Resend</Button>
              <NDAPartyName>Jeremy Voss</NDAPartyName>
              <NDAPartyOrganization>Flake, Inc.</NDAPartyOrganization>
            </ButtonWrapper>
            <ButtonWrapper>
              <Link href="/payment-form">
                <Button style={{ backgroundColor: "#5dbfc8" }}>Sign</Button>
              </Link>
              <NDAPartyName>Joe Doe</NDAPartyName>
            </ButtonWrapper>
          </ActionRow>

          <AttachmentSectionContainer>
            <AttachmentTitle>Attachments</AttachmentTitle>
            <AttachmentUrlContainer>
              <HideIcon
                src="/static/hideIcon.svg"
                alt="hidded icon"
              />
              <AttachmentUrl>https://www.dropbox.com/sh/55wo9a…</AttachmentUrl>
            </AttachmentUrlContainer>
            <AttachmentDisclaimer>
              Recepient will not have access to your link unless he accepts the
              term of the NDA.
            </AttachmentDisclaimer>
          </AttachmentSectionContainer>

          <FooterLogoContainer>
            <img src="/static/footerLogo.svg" alt="ndaify logo" />
          </FooterLogoContainer>

          <FooterContainer>
            <Disclaimer>
              Signing the NDA signifies that you have read and agree to the{" "}
              <DisclaimerLink>Terms of Use</DisclaimerLink>
              {" and "}
              <DisclaimerLink>Privacy Policy</DisclaimerLink>.
            </Disclaimer>
            <Footer />
          </FooterContainer>
        </NDAContainer>
      </NDADocumentContainer>
    </Container>
  );
};

export default SenderNDA;
