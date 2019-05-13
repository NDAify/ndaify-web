import React from "react";
import Link from "next/link";

import styled from "styled-components";

import LogoHeader from "../LogoHeader/LogoHeader";
import Input from "../Input/Input";
import Footer from "../Footer/Footer";
import CreatorInfo from "../CreatorInfo/CreatorInfo";
import Dialog from "../Dialog/Dialog";

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
`;

const ContentContainer = styled.div`
  padding: 1pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  margin-top: 3pc;
  flex-direction: column;
  flex: 1;
`;

const Button = styled.button`
  background-color: #39d494;
  font-size: 20px;
  font-weight: 200;
  margin-top: 2pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const DialogTitle = styled.h3`
  font-size: 28px;
  margin-top: 2pc;
  font-weight: 700;
  text-align: center;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const DialogLongText = styled.p`
  font-size: 16px;
  margin-top: 2pc;
  font-weight: 200;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }

  :first-of-type {
    margin-top: 0;
    font-weight: 400;
  }
`;

const PaymentFormContainer = styled.div`
  max-width: 576px;
  width: 100%;
  margin: 2pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 6pc;
`;

const PaymentFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  margin-top: 2pc;
  height: 140px;

  @media screen and (min-width: 994px) {
    flex-direction: row;
    height: auto;
  }

  :first-of-type {
    margin-top: 0;
  }
`;

const TwoColInputContainer = styled.div`
  flex: 1;

  :nth-child(2) {
    margin-left: 0;
  }

  @media screen and (min-width: 994px) {
    :nth-child(2) {
      margin-left: 1pc;
    }
  }
`;

const DividerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 1pc;
`;

const DividerLine = styled.div`
  height: 3px;
  width: 200px;
  background-color: #aaaaaa;
  margin-left: 1pc;
  margin-right: 1pc;
`;

const DividerText = styled.span`
  color: #aaaaaa;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const Total = styled.h4`
  font-size: 20px;
  margin-top: 2pc;
  font-weight: 200;

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

const Divider = () => (
  <DividerContainer>
    <DividerLine />
    <DividerText>Or</DividerText>
    <DividerLine />
  </DividerContainer>
);

const PaymentForm = () => (
  <Container>
    <ContentContainer>
      <LogoHeader />
      <div>
        <DialogTitle>One last thing before delivery…</DialogTitle>

        <Dialog>
          <DialogLongText>Hi Joe,</DialogLongText>
          <DialogLongText>
            It costs money to keep NDAify running. If you use the service and
            find it valuable, plese help me stay online by making a small
            donation.
          </DialogLongText>
          <DialogLongText>
            Or, share a good reason below for why you can’t pay and you can
            still use NDAify for free.
          </DialogLongText>

          <DialogLongText>
            Any questions or comments? Just send me a tweet, I’m always
            listening.
          </DialogLongText>
          <DialogLongText>Thank you for using NDAify!</DialogLongText>
        </Dialog>
        <CreatorInfo />
      </div>

      <PaymentFormContainer>
        <PaymentFormRow>
          <TwoColInputContainer>
            <Input placeholder="Name on card" />
          </TwoColInputContainer>
          <TwoColInputContainer>
            <Input placeholder="Card number" />
          </TwoColInputContainer>
        </PaymentFormRow>
        <PaymentFormRow>
          <TwoColInputContainer>
            <Input placeholder="MM / YY" />
          </TwoColInputContainer>
          <TwoColInputContainer>
            <Input placeholder="CVC" />
          </TwoColInputContainer>
        </PaymentFormRow>

        <Divider />

        <div style={{ marginTop: "1pc" }}>
          <Input placeholder="I can’t pay because…" />
        </div>

        <Total>Total $ 1.00</Total>

        <Link href="nda-sent">
          <Button>Send</Button>
        </Link>
      </PaymentFormContainer>

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
    </ContentContainer>
  </Container>
);

export default PaymentForm;
