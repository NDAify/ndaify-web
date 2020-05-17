import React, { useEffect, useRef } from 'react';

import styled, { keyframes } from 'styled-components';

import useLocale from '../../lib/useLocale';
import useTypewriter from '../../lib/useTypewriter';

const ItemsContainer = styled.ul`
  display: none;
`;

const blink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const CursorWrapper = styled.span`
  color: var(--ndaify-fg);
  animation: ${blink} 0.9s cubic-bezier(0.60, 0.01, 0.01, 1) 0s infinite;
`;

const Cursor = () => (
  <CursorWrapper>|</CursorWrapper>
)

const Typewriter = (props) => {
  const ref = useRef(); 
  const [preferredLocale] = useLocale();
  const [output, start, destroy, pause, resume] = useTypewriter();  

  useEffect(() => {
    const items = [...ref.current.children].map(child => child.innerText);
    start(items);

    return () => {
      destroy()
    }
  }, [preferredLocale]);

  return (
    <>
      { output }
      <Cursor />
      <ItemsContainer ref={ref}>
        { 
          React.Children.toArray(props.children).map(
            child => (
              <li key={child.key}>{child}</li>
            )
          )
        }
      </ItemsContainer>
    </>
  );
}

export default Typewriter;


{/* <div>
<button type="button" onClick={() => {
  const items = [...ref.current.children].map(child => child.innerText);
  start(items);
}}>start</button>
<button type="button" onClick={pause}>pause</button>
<button type="button" onClick={resume}>resume</button>
<button type="button" onClick={destroy}>destroy</button>
</div> */}