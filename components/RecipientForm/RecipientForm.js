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

const DisclaimerText = styled.span`
  margin-bottom: 2pc;
  color: #aaaaaa;
  font-size: 16px;
  font-weight: 200;
  line-height: 28px;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const UnderlineText = styled.span`
  color: #ffffff;
  text-decoration: underline;
`;

const FormContainer = styled.form`
  margin-bottom: 2pc;
`;

const InputWrapper = styled.div`
  margin-bottom: 2pc;

  :last-of-type {
    margin-bottom: 0;
  }
`;

const LinkedInButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 3pc;
`;

const ErrorPopUp = styled.div`
  margin-bottom: 3pc;
  color: #edd9a3;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #edd9a3;
  border-radius: 10px;
`;

const WarningIcon = styled.img`
  width: 18px;
  margin-right: 0.5pc;
`;

const ErrorMessage = () => (
  <ErrorPopUp>
    <WarningIcon src="/static/warningIcon.svg" alt="warning icon" />
    Failed to authenticate
  </ErrorPopUp>
);

const RecipientForm = ({ error = true }) => (
  <Container>
    <PageContentContainer>
      <LogoImageContainer>
        <LogoHeader />
      </LogoImageContainer>

      <ContentContainer>
        {error && <ErrorMessage />}

        <LinkWrapper>
          <HideIcon src="/static/hideIcon.svg" alt="hidded icon" />
          <DocumentUrl>https://www.dropbox.com/sh/55wo9a…</DocumentUrl>
        </LinkWrapper>
        <DescriptionTitle>
          Recepient does not have access to your link unless he accepts the term
          of the NDA.
        </DescriptionTitle>

        <FormContainer>
          <InputWrapper>
            <Input placeholder="NDA type (one-way, mutual)" />
          </InputWrapper>
          <InputWrapper>
            <Input placeholder="Recipient name" />
          </InputWrapper>
          <InputWrapper>
            <Input placeholder="Recipient email" />
          </InputWrapper>
        </FormContainer>

        <DisclaimerText>
          Singing the NDA signifies that you have read and agree to the{" "}
          <UnderlineText>Terms of Use</UnderlineText> and{" "}
          <UnderlineText>Privacy Policy</UnderlineText>.
        </DisclaimerText>

        <Link href="/nda">
          <LinkedInButtonWrapper>
            <LinkedInButton
              color="#DC564A"
              buttonText="Review and Sign with LinkedIn"
            />
          </LinkedInButtonWrapper>
        </Link>
      </ContentContainer>

      <Footer />
    </PageContentContainer>
  </Container>
);

export default RecipientForm;
