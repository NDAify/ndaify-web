import React from 'react';

import styled from 'styled-components';

import Footer from '../Footer/Footer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DocumentContainer = styled.div`
  padding: 1pc;
  padding-top: 2pc;
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

const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-weight: 200;
  margin-bottom: 3pc;
  font-size: 28px;
`;

const Disclainer = styled.p`
  margin: 0;
  margin-bottom: 2pc;
  color: #ffffff;
  font-weight: 200;
  text-transform: uppercase;
  line-height: 24px;
  font-size: 20px;
`;

const SectionTitle = styled.h5`
  margin: 0;
  margin-bottom: 1pc;
  color: #ffffff;
  font-size: 20px;
  align-self: flex-start;
  text-transform: uppercase;
`;

const SectionContentText = styled.div`
  margin-bottom: 2pc;
  color: #ffffff;
  font-weight: 200;
  line-height: 24px;
  font-size: 20px;
`;

const SectionList = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 1pc;
  margin-left: 20px;
`;

const SectionListItem = styled.li`
  font-weight: 200;
  line-height: 32px;
  font-size: 20px;
  color: #ffffff;
`;

/* eslint-disable max-len */
const LegalPolicy = ({ title }) => (
  <Container>
    <DocumentContainer>
      <Title>{title}</Title>
      <Disclainer>Both the United States Electronic Signatures in Global and National Commerce (ESIGN) Act, and the Uniform Electronic Transactions Act (UETA), have four major requirements for an electronic signature to be recognized as valid under U.S. law. Those requirements are:</Disclainer>
      <SectionTitle>INTENT TO SIGN</SectionTitle>
      <SectionContentText>Electronic signatures, like traditional wet ink signatures, are valid only if each party intended to sign.</SectionContentText>
      <SectionTitle>CONSENT TO DO BUSINES ELECTRONICALLY</SectionTitle>
      <SectionContentText>
        The parties to the transaction must consent to do business electronically. Establishing that a business consented can be done by analyzing the circumstances of the interaction, but consumers require special considerations. Electronic records may be used in transactions with consumers only when the consumer has:
        <SectionList>
          <SectionListItem>Received UETA Consumer Consent Disclosures</SectionListItem>
          <SectionListItem>Affirmatively agreed to use electronic records for the transaction</SectionListItem>
          <SectionListItem>Has not withdrawn such consent</SectionListItem>
        </SectionList>
      </SectionContentText>
      <SectionTitle>ASSOCIATION OF SIGNATURE WITH THE RECORD</SectionTitle>
      <SectionContentText>
        In order to qualify as an electronic signature under the ESIGN Act and UETA, the system used to capture the transaction must keep an associated record that reflects the process by which the signature was created, or generate a textual or graphic statement (which is added to the signed record) proving that it was executed with an electronic signature.
      </SectionContentText>
      <SectionTitle>RECORD RETENTION</SectionTitle>
      <SectionContentText>U.S. laws on eSignatures and electronic transactions require that electronic signature records be capable of retention and accurate reproduction for reference by all parties or persons entitled to retain the contract or record.</SectionContentText>
      <Footer withLogo />
    </DocumentContainer>
  </Container>
);
/* eslint-enable */

export default LegalPolicy;
