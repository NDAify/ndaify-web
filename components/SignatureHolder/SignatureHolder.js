import React from "react";

import styled from "styled-components";

const SignatureHolderContaine = styled.div`
  width: 100%;
  border-bottom: 2px solid #f1e65d;
  display: flex;
  min-height: 60px;
`;

const SignatureIndicator = styled.span`
  align-self: flex-end;
  padding-bottom: 8px;
  font-size: 8px;
  color: #ffffff;
`;

const SignatureWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Signature = styled.span`
  font-family: "Signerica Fat", cursive;
  font-size: 28px;

  @media screen and (min-width: 994px) {
    font-size: 32px;
  }
`;

const SignatureHolder = ({name}) => (
  <SignatureHolderContaine>
    <SignatureIndicator>X</SignatureIndicator>
    <SignatureWrapper>
      <Signature>{name}</Signature>
    </SignatureWrapper>
  </SignatureHolderContaine>
);

export default SignatureHolder;
