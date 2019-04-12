import React from "react";
import Link from "next/link";

import styled from "styled-components";

import LogoHeader from "../LogoHeader/LogoHeader";
import Input from "../Input/Input";
import CustomNote from "../CustomNote/CustomNote";

const Button = styled.button`
  background-color: #39d494;
  font-size: 20px;
  font-weight: 200;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
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

const CopyTitle = styled.h3`
  color: #aaaaaa;
  font-size: 28px;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const CopyText = styled.span`
  font-size: 28px;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const FreeText = styled.span`
  font-family: "Shadows Into Light", cursive;
`;

const CopyWhitText = styled.h3`
  font-size: 28px;
  margin-top: 3pc;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const InputContainer = styled.div`
  margin-top: 2pc;
`;

const FormCopy = styled.h4`
  font-size: 20px;
  font-weight: 200;
  margin-top: 2pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const ButtonWrapper = styled.a`
  margin-top: 2pc;
`;

const FormLink = styled.a`
  text-decoration: underline;
`;

const FooterContainer = styled.footer`
  margin-top: 3pc;
`;

const FooterDesclaimer = styled.span`
  font-size: 12px;
  color: #aaaaaa;
  margin-top: 2pc;
  font-weight: 200;
  display: block;

  @media screen and (min-width: 994px) {
    font-size: 12px;
  }
`;

const Homepage = () => (
  <Container>
    <CustomNote />
    <PageContainer>
      <LogoHeader />
      <ContentContainer>
        <CopyTitle>
          NDAify helps you keep your trade secrets under wraps.
          <CopyText>
            {" Try it "}
            <FreeText>free</FreeText>.
          </CopyText>
        </CopyTitle>
        <CopyWhitText>Send an NDA in a couple minutes.</CopyWhitText>
        <InputContainer>
          <Input placeholder="Paste a secret link" />
        </InputContainer>

        <FormCopy>
          Try it out by sending yourself a <FormLink>sample NDA</FormLink>.
        </FormCopy>
        <Link href="/form">
          <ButtonWrapper>
            <Button>Continue</Button>
          </ButtonWrapper>
        </Link>
      </ContentContainer>

      <FooterContainer>
        <FooterContainer />
        <FooterDesclaimer>
          NDAify is not a law firm, does not provide legal services or advice,
          and does not provide or participate in legal representation.
        </FooterDesclaimer>
      </FooterContainer>
    </PageContainer>
  </Container>
);

export default Homepage;
