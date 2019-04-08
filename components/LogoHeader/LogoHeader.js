import React from "react";

import styled from "styled-components";

const LogoContaier = styled.div`
  width: 100%;
  display: flex;
`;

const Logo = styled.img`
  height: 120px;
`;

const LogoHeader = () => (
  <LogoContaier>
    <Logo src="/static/logo.svg" alt="ndaify-logo" />
  </LogoContaier>
);

export default LogoHeader;
