import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FooterText = styled.span`
  font-size: 16px;
  font-weight: 200;
  margin-top: 1pc;
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>Powered by gluten free coconut coffee.</FooterText>
    <FooterText>© 2018 NDAify</FooterText>
  </FooterContainer>
);

export default Footer;
