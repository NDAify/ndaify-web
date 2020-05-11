import React from 'react';
import styled from 'styled-components';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Footer from '../Footer/Footer';
import { PageTitle } from '../Head/Head';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 5pc;
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

const ErrorView = ({ statusCode, errorMessage }) => (
  <>
    <PageTitle prepend={`${statusCode} — `} />

    <Container>
      <PageContainer>
        <ErrorMessage color="#FF0000" style={{ marginTop: '3pc' }}>
          {`${statusCode} - ${errorMessage}`}
        </ErrorMessage>

        <Footer withLogo />
      </PageContainer>
    </Container>
  </>
);

export default ErrorView;
