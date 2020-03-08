import styled from 'styled-components';

const ButtonAnchor = styled.a`
  display: inline-block;
  margin: 0;
  padding: 0;
  padding-left: 1pc;
  padding-right: 1pc;
  text-align: center;
  font-family: inherit;
  font-size: 20px;
  font-weight: 200;
  border-radius: 4px;
  border: 0;
  text-decoration: none;
  letter-spacing: 1.8px;
  color: #ffffff;
  width: 100%;
  height: 60px;

  cursor: pointer;

  :focus {
    outline: -webkit-focus-ring-color auto 5px;;
    outline-offset: 0px;
  }

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

export default ButtonAnchor;
