import styled from 'styled-components';

const Anchor = styled.a`
  display: inline;
  align-self: flex-start;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 200;
  border: none;
  text-decoration: underline;
  background-color: transparent;
  color: var(--ndaify-accents-8);
  cursor: pointer;
  transition: none;

  :visited {
    color: var(--ndaify-accents-8);
  }

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

export default Anchor;
