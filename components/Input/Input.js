import React, { Fragment } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  color: #aaaaaa;
  font-size: 20px;
  font-weight: 200;
  background-color: #ffffff;
  border-radius: 4px;
  border: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  letter-spacing: 1.8px;
`;

const Input = props => (
  <Fragment>
    <StyledInput placeholder={props.placeholder} />
  </Fragment>
);

export default Input;
