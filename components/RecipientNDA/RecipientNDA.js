import React from "react";
import Link from "next/link";

import styled from "styled-components";

import NDA from "../NDA/NDA";
import Footer from "../Footer/Footer";
import LinkedInButton from "../LinkedInButton/LinkedInButton";

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
  justify-content: center;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  margin-top: 4pc;
  justify-content: space-between;
  flex-direction: column;
  max-width: 576px;

  @media screen and (min-width: 994px) {
    flex-direction: row;
    max-width: unset;
  }
`;

const RecipientAcceptButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 994px) {
    max-width: 50%;
  }
`;

const RecipientAcceptButtonDiscliamer = styled.span`
  color: #f1e65d;
  font-size: 16px;
  word-wrap: break-word;
  line-height: normal;
  text-align: center;
  font-weight: 700;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const RecipientButtonWrapper = styled.div`
  margin-top: 1pc;
  width: 100%;
`;

const RecipientName = styled.span`
  font-weight: 700;
  font-size: 16px;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const RecipientConsent = styled.p`
  color: #aaaaaa;
  line-height: normal;
`;

const SenderSignatureContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 92px;
  
  @media screen and (min-width: 994px) {
    margin-left: 4pc;
  }
`;

const SenderSignatureHolder = styled.div`
width: 100%;
border-bottom: 2px solid #f1e65d;
display: flex;
`;

const SignatureIndicator = styled.span`
font-size: 8px;
`;

const SignatureWrapper = styled.div`
display: flex;
flex: 1;
justify-content: center;
`;

const Signature = styled.span`
font-family: 'Signerica Fat', cursive;
font-size: 28px;

@media screen and (min-width: 994px) {
  font-size: 32px;
}
`;

const SenderInfoContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

const SenderName = styled.span`
margin-top: 1pc;
font-size: 16px;

@media screen and (min-width: 994px) {
  font-size: 20px;
}
`;

const SenderDate = styled.span`
font-size: 16px;
font-weight: 200;

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

const AttachmentDisclaimer = styled.span`
color: #5dbfc8;
font-size: 20px;
line-height: normal;
  font-weight: 200;
  display: block;
  margin-top: 1pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
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
  margin-top: 1pc;
  display: block;
  font-weight: 200;

  @media screen and (min-width: 994px) {
    font-size: 16px;
  }
`;

const DisclaimerLink = styled.a`
  color: #ffffff;
  text-decoration: underline;
`;

const RecipientNDA = () => {
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
          <NDA isRecipientNDA sender={sender} recipient={recipient} />
          <ActionRow>
            <ActionButtonsContainer>
              <RecipientAcceptButtonWrapper>
                <RecipientAcceptButtonDiscliamer>
                  {
                    "LinkedIn email should match recipient <jeremyvoss@gmail.com>."
                  }
                </RecipientAcceptButtonDiscliamer>
                <RecipientButtonWrapper>
                  <LinkedInButton
                    color="#5dbfc8"
                    buttonText="Accept with LinkedIn"
                  />
                </RecipientButtonWrapper>
                <div style={{ marginTop: "1pc" }}>
                  <RecipientName>Jeremy Voss</RecipientName>
                  <RecipientConsent>
                    I, Jeremy Voss, certify that I have read the contract, and
                    understand that clicking 'Accept with LinkedIn' constitutes
                    a legally binding signature.
                  </RecipientConsent>
                </div>
              </RecipientAcceptButtonWrapper>
              <SenderSignatureContainer>
                <SenderSignatureHolder>
                  <SignatureIndicator>X</SignatureIndicator>
                  <SignatureWrapper>
                    <Signature>
                      Joe Doe
                    </Signature>
                  </SignatureWrapper>
                </SenderSignatureHolder>
                <SenderInfoContainer>
                  <SenderName>
                    Joe Doe
                  </SenderName>
                  <SenderDate>
                    {"December 6th, 2017."}
                  </SenderDate>
                </SenderInfoContainer>
              </SenderSignatureContainer>
            </ActionButtonsContainer>
          </ActionRow>

          <AttachmentSectionContainer>
            <AttachmentTitle>Attachments</AttachmentTitle>
            <AttachmentDisclaimer>You need to accept to view attachments.</AttachmentDisclaimer>
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
      </NDADocumentContainer>s
    </Container>
  );
};

export default RecipientNDA;
