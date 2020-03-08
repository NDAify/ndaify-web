import React from 'react';

import styled from 'styled-components';

import LinkedInButton from '../LinkedInButton/LinkedInButton';
import LogoHeader from '../LogoHeader/LogoHeader';
import Footer from '../Footer/Footer';

const LinkedInButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 3pc;
  width:100%;
  max-width: 400px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const PageContentContainer = styled.div`
  padding: 1pc;
  display: flex;
  justify-content: space-between;
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

const Login = () => (
  <Container>
    <PageContentContainer>
      <LogoHeaderContainer>
        <LogoHeader />
      </LogoHeaderContainer>

      <LinkedInButtonWrapper>
        <LinkedInButton
          buttonText="Login with LinkedIn"
        />
      </LinkedInButtonWrapper>

      <Footer />
    </PageContentContainer>
  </Container>
);

export default Login;
