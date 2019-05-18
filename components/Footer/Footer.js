import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  margin-top: 3pc;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 576px;
  width: 100%;
`;

const Disclaimer = styled.span`
  color: #aaaaaa;
  font-size: 12px;
  text-align: center;
  display: block;
  font-weight: 200;
  line-height: 20px;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FootetTextWrapper = styled.div`
  margin-bottom: 3pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled.span`
  font-size: 16px;
  font-weight: 200;
  margin-top: 1pc;
  color: #ffffff;
  margin-bottom: 1pc;
  text-align: center;
`;

const Footer = () => (
  <Container>
    <FootetTextWrapper>
    <FooterText>
      Powered by 25% sweet no ice coconut green tea with oat milk & boba.
    </FooterText>
    <FooterText>© 2019 NDAify</FooterText>
    </FootetTextWrapper>
    
    <Disclaimer>
      NDAify is not a law firm, does not provide legal services or advice, and
      does not provide or participate in legal representation. Singing the NDA
      signifies that you have read and agree to the Terms of Use and Privacy
      Policy.
    </Disclaimer>
    <FooterContainer />
  </Container>
);

export default Footer;
