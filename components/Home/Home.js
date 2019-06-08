import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';

import LogoHeader from '../LogoHeader/LogoHeader';
import Input from '../Input/Input';
import CustomNote from '../CustomNote/CustomNote';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import OpenSourceBanner from '../OpenSourceBanner/OpenSourceBanner';

const HomePageButton = styled(Button)`
  background-color: #39d494;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
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

const CopyTitle = styled.h3`
  color: #aaaaaa;
  font-size: 28px;
  font-weight: 200;
  margin: 0;
  margin-bottom: 3pc;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const CopyText = styled.span`
  font-size: 28px;
  color: #ffffff;
  padding-bottom: 5pc;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const FreeText = styled.span`
  text-decoration: underline;
  color: #ffffff;
`;

const Subtitle = styled.h3`
  font-size: 28px;
  color: #ffffff;
  font-weight: 200;
  margin-bottom: 2pc;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 2pc;
`;

const FormCopy = styled.h4`
  font-size: 20px;
  font-weight: 200;
  color: #ffffff;
  margin: 0;
  margin-bottom: 3pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const ButtonWrapper = styled.a`
  margin-bottom: 1pc;
`;

const FormLink = styled.a`
  text-decoration: underline;
`;

const Home = ({ showCustomNote = true }) => (
  <Container>
    <OpenSourceBanner />
    {
      // showCustomNote && <CustomNote />
    }
    <PageContainer>
      <LogoImageContainer>
        <LogoHeader />
      </LogoImageContainer>
      <ContentContainer>
        <CopyTitle>
          NDAify helps you keep your trade secrets under wraps.
          {' '}
          <CopyText>
            {'Try it'}
            {' '}
            <FreeText>FREE</FreeText>
            .
          </CopyText>
        </CopyTitle>
        <Subtitle>Send an NDA in a couple minutes.</Subtitle>
        <InputContainer>
          <Input placeholder="Paste a secret link" />
        </InputContainer>
        <Link href="/form">
          <ButtonWrapper>
            <HomePageButton>Continue</HomePageButton>
          </ButtonWrapper>
        </Link>
        <FormCopy>
          Or,
          {' '}
          <FormLink>log in</FormLink>
          {' '}
          to see your NDAs.
        </FormCopy>

        <Footer />
      </ContentContainer>
    </PageContainer>
  </Container>
);

export default Home;
