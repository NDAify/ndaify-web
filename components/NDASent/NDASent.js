import React from "react";
import Link from "next/link";

import styled from "styled-components";

import LogoHeader from "../LogoHeader/LogoHeader";
import Footer from "../Footer/Footer";

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  // flex-direction: column;
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

const SucessMessageContainer = styled.div`
  max-width: 576px;
  width: 100%;
  margin: 2pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 6pc;
`;

const SucessMessage = styled.p`
  font-size: 20px;
  font-weight: 200;
  text-align: center;
  margin-top: 2pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const Button = styled.button`
  margin-top: 4pc;
  font-size: 20px;
  font-weight: 200;
  background-color: #39d494;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
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

const FinalForm = () => (
  <Container>
    <PageContentContainer>
      <LogoHeader />

      <SucessMessageContainer>
        <SucessMessage>
          Your request has been sent to Jeremy Voss. You will be notified when
          Jeremy views and/or accepts the NDA.
        </SucessMessage>
        <Link href="/recipient-nda">
          <Button>Okay</Button>
        </Link>
      </SucessMessageContainer>

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

export default FinalForm;
