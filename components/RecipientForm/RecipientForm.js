import React from "react";
import Link from "next/link";

import styled from "styled-components";

import LogoHeader from "../LogoHeader/LogoHeader";
import Input from "../Input/Input";
import Footer from "../Footer/Footer";
import LinkedInButton from "../LinkedInButton/LinkedInButton";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const PageContentContainer = styled.div`
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

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 994px) {
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

const DocumentUrl = styled.h4`
  color: #aaaaaa;
  font-size: 20px;
  word-wrap: break-word;
  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const DescriptionTitle = styled.h4`
  font-size: 20px;
  margin-top: 2pc;
  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const InputWrapper = styled.div`
  margin-top: 2pc;
`;

const LinkedInButtonWrapper = styled.div`
  margin-top: 3pc;
  display: flex;
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

const RecipientForm = () => (
  <Container>
    <PageContentContainer>
      <LogoHeader />
      <ContentContainer>
        <LinkWrapper>
          <HideIcon src="/static/hideIcon.svg" alt="hidded icon" />
          <DocumentUrl>https://www.dropbox.com/sh/55wo9a…</DocumentUrl>
        </LinkWrapper>
        <DescriptionTitle>
          Recepient does not have access to your link unless he accepts the term
          of the NDA.
        </DescriptionTitle>

        <InputWrapper>
          <Input placeholder="NDA type (one-way, mutual)" />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder="Recipient name" />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder="Recipient email" />
        </InputWrapper>

        <Link href="/nda">
          <LinkedInButtonWrapper>
            <LinkedInButton
              color="#DC564A"
              buttonText="Review and Sign with LinkedIn"
            />
          </LinkedInButtonWrapper>
        </Link>
      </ContentContainer>

      <FooterContainer>
        <Disclaimer>
          Signing the NDA signifies that you have read and agree to the{" "}
          <DisclaimerLink>Terms of Use</DisclaimerLink>
          {" and "}
          <DisclaimerLink>Privacy Policy</DisclaimerLink>.
        </Disclaimer>
        <Footer />
      </FooterContainer>
    </PageContentContainer>
  </Container>
);

export default RecipientForm;
