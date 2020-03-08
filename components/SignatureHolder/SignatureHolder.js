import React from 'react';

import styled from 'styled-components';

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
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const getSignature = (firstName, lastName) => {
  if ((firstName.length + lastName.length) > 10) {
    const [firstNameInitial] = firstName;

    return `${firstNameInitial}. ${lastName}`;
  }

  return `${firstName} ${lastName}`;
};

const SignatureHolder = ({ firstName, lastName }) => (
  <SignatureHolderContaine>
    <SignatureIndicator>X</SignatureIndicator>
    <SignatureWrapper>
      {
        firstName || lastName ? (
          <Signature>{getSignature(firstName, lastName)}</Signature>
        ) : null
      }
    </SignatureWrapper>
  </SignatureHolderContaine>
);

export default SignatureHolder;
