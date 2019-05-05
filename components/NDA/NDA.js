import React from "react";
import Link from "next/link";

import styled from "styled-components";

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

const NDADisclaimerWrapper = styled.div`
  max-width: 576px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const DisclaimerTitle = styled.h4`
  font-size: 20px;
  margin-top: 3pc;
  font-weight: 700;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const DisclaimerBody = styled.h4`
  font-size: 20px;
  margin-top: 2pc;
  font-weight: 200;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const NDATitleContainer = styled.div`
  text-align: center;
`;

const NDATitle = styled.h4`
  font-size: 28px;
  margin-top: 3pc;
  font-weight: 200;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const NDAContainer = styled.div`
  margin-top: 1pc;
  width: 100%;
`;

const NDASectionTitle = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 1pc;
  display: block;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const NDASectionBodyText = styled.span`
  font-size: 16px;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const BetweenPartyContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 200;
  margin-left: 1pc;
  line-height: 34px;
`;

const EditableText = styled.span`
  font-weight: 700;
  padding: 4px;
  border: 1px dashed #00ab6c;
`;

const DisclaimerEnding = styled.span`
  font-size: 16px;
  display: block;
  font-weight: 200;
  margin-top: 1pc;
  margin-bottom: 1pc;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const LongText = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin-top: 1pc;
  line-height: 28px;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const NDAReadMoreContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 4pc;
`;

const NDAReadMoreText = styled.h4`
  font-size: 16px;
  font-weight: 700;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const NDAReadMoreLink = styled.a`
  text-decoration: underline;
  font-weight: 200;
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

const NDA = () => (
  <Container>
    <UserDetailBannerContainer>
      <UserDetails>
        <UserNameText>Joe Doe</UserNameText>
        <UserEmailText>{"<joe@gmail.com>"}</UserEmailText>
      </UserDetails>

      <Button style={{ backgroundColor: "#dc564a" }}>Cancel</Button>
    </UserDetailBannerContainer>
    <NDADocumentContainer>
      <NDADisclaimerWrapper>
        <DisclaimerTitle>Almost done.</DisclaimerTitle>
        <DisclaimerBody>
          By signing, both <BoldText>you</BoldText> and{" "}
          <BoldText>Jeremy Voss</BoldText> will agree to terms of an NDA to{" "}
          <BoldText>protect all parties and materials disclosed</BoldText>.
        </DisclaimerBody>
      </NDADisclaimerWrapper>
      <NDATitleContainer>
        <NDATitle>
          <span>Non-Disclosure</span>
          <br />
          <span>Agreement</span>
        </NDATitle>
      </NDATitleContainer>

      <NDAContainer>
        <div>
          <NDASectionTitle>This Agreement </NDASectionTitle>
          <NDASectionBodyText>
            is made on December 6th, 2017.
          </NDASectionBodyText>
        </div>
        <div>
          <NDASectionTitle>Between</NDASectionTitle>
          <BetweenPartyContainer>
            <NDASectionBodyText>
              1. <EditableText contentEditable>Joe Doe</EditableText> (the
              Disclosing Party); and
            </NDASectionBodyText>
            <NDASectionBodyText>
              2.{" "}
              <EditableText contentEditable>
                Jeremy Voss, Flake, Inc.
              </EditableText>{" "}
              (the Receiving Party), collectively referred to as the Parties.
            </NDASectionBodyText>
          </BetweenPartyContainer>
          <DisclaimerEnding>
            collectively referred to as the <BoldText>Parties</BoldText>.
          </DisclaimerEnding>
        </div>
        <div>
          <NDASectionTitle>RECITALS</NDASectionTitle>
          <LongText>
            A. The Receiving Party understands that the Disclosing Party has
            disclosed or may disclose information relating to its business,
            operations, plans, prospects, affairs, source code, product designs,
            art, and other related concepts, which to the extent previously,
            presently, or subsequently disclosed to the Receiving Party is
            hereinafter referred to as Proprietary Information of the Disclosing
            Party.
          </LongText>
        </div>
        <div>
          <NDASectionTitle>OPERATIVE PROVISIONS</NDASectionTitle>
          <LongText>
            1. In consideration of the disclosure of Proprietary Information by
            the Disclosing Party, the Receiving Party hereby agrees: (i) to hold
            the Proprietary Information in strict confidence and to take all
            reasonable precautions to protect such Proprietary Information
            (including, without limitation, all precautions…
          </LongText>
        </div>

        <NDAReadMoreContainer>
          <NDAReadMoreText>
            To read all terms, <NDAReadMoreLink>click here</NDAReadMoreLink>.
          </NDAReadMoreText>
        </NDAReadMoreContainer>

        <ActionRow>
          <ButtonWrapper>
            <Button style={{ backgroundColor: "#7254b7" }}>Resend</Button>
            <NDAPartyName>Jeremy Voss</NDAPartyName>
            <NDAPartyOrganization>Flake, Inc.</NDAPartyOrganization>
          </ButtonWrapper>
          <ButtonWrapper>
            <Link href="/final-form">
              <Button style={{ backgroundColor: "#5dbfc8" }}>Sign</Button>
            </Link>
            <NDAPartyName>Joe Doe</NDAPartyName>
          </ButtonWrapper>
        </ActionRow>

        <AttachmentSectionContainer>
          <AttachmentTitle>Attachments</AttachmentTitle>
          <AttachmentUrlContainer>
            <HideIcon
              className="hideIcon"
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

export default NDA;
