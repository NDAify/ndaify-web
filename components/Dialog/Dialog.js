import styled from "styled-components";

const Dialog = styled.div`
height: 100%;
position: relative;
background: #383b49;
border-radius: 0.4em;
line-height: 28px;
padding: 2pc;
margin-top: 2pc;

:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 6%;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  border-top-color: #383b49;
  border-bottom: 0;
  border-right: 0;
  margin-left: -6px;
  margin-bottom: -12px;
}
`;

export default Dialog;