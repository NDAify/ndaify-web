import React from "react";

import styled from "styled-components";

const Button = styled.button`
  font-size: 20px;
  font-weight: 200;
  display: flex;
  align-items: center;
  background-color: ${({ color }) => color};
  padding: 0;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const LinkedInLogo = styled.img`
  width: 64px;
  height: 64px;
  margin-top: -2px;
`;

const ButtonText = styled.span`
  flex: 1;
`;

const LinkedInButton = props => (
  <Button color={props.color}>
    <LinkedInLogo src="/static/linkedInLogo.svg" alt="linkedin-logo" />
    <ButtonText>{props.buttonText}</ButtonText>
  </Button>
);

export default LinkedInButton;
