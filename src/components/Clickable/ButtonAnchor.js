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
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  cursor: pointer;

  :focus {
    filter: brightness(90%);
    outline: -webkit-focus-ring-color auto 0px;
    outline-offset: 0px;
  }

  :disabled {
    cursor: not-allowed;
  }

  :visited {
    color: ffffff;
  }

  ${(props) => (props.color ? `background-color: ${props.color};` : '')}
  ${(props) => (props.disabled ? 'background-color: #aaaaaa;' : '')}
  ${(props) => (
    props.outline ? `
      width: unset;
      height: 40px;
      background-color: transparent;
      border: 1px solid #ffffff;

      :focus {
        filter: brightness(80%);
      }
    ` : ''
  )}
  ${(props) => (props.compact ? `
      width: unset;
      height: 40px;
      border: 0;
    ` : ''
  )}

  @media screen and (min-width: 992px) {
    font-size: 24px;

  ${(props) => ((props.outline || props.compact) ? `
    font-size: 20px;
  ` : ''
  )}
  }
`;

export default ButtonAnchor;
