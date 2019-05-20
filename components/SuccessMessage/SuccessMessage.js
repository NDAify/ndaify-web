import React from "react";
import Link from "next/link";

import styled from "styled-components";

import LogoHeader from "../LogoHeader/LogoHeader";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import UserActionBanner from "../UserActionBanner/UserActionBanner";

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
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
  box-sizing: border-box;
`;

const LogoHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10pc;
`;

const SucessMessageContainer = styled.div`
  max-width: 576px;
  width: 100%;
  margin: 2pc;
  margin-top: 0;
  margin-bottom: 10pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

const SucessMessage = styled.p`
  font-size: 20px;
  font-weight: 200;
  text-align: center;
  margin: 0;
  color: #ffffff;
  margin-bottom: 3pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const SuccessMessage = () => (
  <Container>
    <UserActionBanner />
    <PageContentContainer>
      <LogoHeaderContainer>
        <LogoHeader />
      </LogoHeaderContainer>

      <SucessMessageContainer>
        <SucessMessage>
          Your request has been sent to Jeremy Voss. You will be notified when
          Jeremy views and/or accepts the NDA.
        </SucessMessage>
        <Link href="/recipient-nda">
          <Button style={{ backgroundColor: "#39d494" }}>Done</Button>
        </Link>
      </SucessMessageContainer>

      <Footer />
    </PageContentContainer>
  </Container>
);

export default SuccessMessage;
