import styled from 'styled-components';

const AnchorButton = styled.button`
  display: inline-block;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 16px;
  font-weight: 200;
  border: none;
  text-decoration: underline;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: none;

  :visited {
    color: #000000;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export default (props) => (
  <AnchorButton type="button" {...props} />
);
