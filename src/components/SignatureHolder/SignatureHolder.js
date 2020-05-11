import React from 'react';

import styled from 'styled-components';

import parseFullName from '../../utils/parseFullName';

const SignatureHolderContaine = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--ndaify-signature-line);
  display: flex;
  min-height: 60px;
`;

const SignatureIndicator = styled.span`
  align-self: flex-end;
  padding-bottom: 8px;
  font-size: 8px;
  color: var(--ndaify-fg);
`;

const SignatureWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Signature = styled.span`
  font-family: "Signerica Fat", cursive;
  font-size: 28px;
  color: var(--ndaify-fg);

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const getSignatureName = (fullName, maxSignatureLength = 10) => {
  if (!fullName) {
    return null;
  }

  const { firstName, lastName } = parseFullName(fullName);

  if (!lastName) {
    return firstName;
  }

  if (firstName.length + lastName.length > maxSignatureLength) {
    const [firstNameInitial] = firstName;

    return `${firstNameInitial}. ${lastName}`;
  }

  return `${firstName} ${lastName}`;
};

const SignatureHolder = ({ fullName }) => {
  const signatureName = getSignatureName(fullName);

  return (
    <SignatureHolderContaine>
      <SignatureIndicator>X</SignatureIndicator>
      <SignatureWrapper>
        {
          signatureName ? (
            <Signature>{signatureName}</Signature>
          ) : null
        }
      </SignatureWrapper>
    </SignatureHolderContaine>
  );
};

export default SignatureHolder;
