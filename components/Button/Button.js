import styled from "styled-components";

const Button = styled.button`
  font-size: 20px;
  font-weight: 200;
  border-radius: 4px;
  border: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  letter-spacing: 1.8px;
  color: #ffffff;
  cursor: pointer;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

export default Button;
