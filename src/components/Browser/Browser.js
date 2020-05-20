import React, {
  useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import NDAImpl from '../NDA/NDA';

import TiltView from './TiltView';

import ndaTemplate from './nda-template.mock.json';
import nda from './nda.mock.json';
import user from './user.mock.json';

const InteractiveBrowser = styled(TiltView)`
  width: 576px;
  height: 500px;
  user-select: none;
`;

const BrowserFrame = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  background: #E4E4E4;
  padding: 2px;
`;

const BrowserToolbar = styled.div`
  background: linear-gradient(180deg, #E4E4E4 0%, #CDCCCC 100%);

  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  height: 30px;
  width: 100%;

  display: flex;
`;

const BrowserToolbarButtonGroup = styled.div`
  height: 100%;
  width: 52px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
`;

const BrowserToolbarButton = styled.div`
  background: #979797;
  width: 10px;
  height: 10px;
  border-radius: 10px;
`;

const BrowserToolbarAddressBar = styled.div`
  flex: 1;
  height: 20px;
  margin-left: 40px;
  margin-right: 40px;
  align-self: center;

  background: linear-gradient(180deg, #FBFBFB 0%, #F3F3F3 100%);
  box-shadow: inset 0px 2px 0px #FFFFFF;
  border-radius: 5px;
  border: 1px solid #CECECE;

  font-size: 12px;
  font-weight: 700;
  color: #A3A3A3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BrowserWindow = styled.div`
  width: 100%;
  height: 466px;
  background: rgb(var(--ndaify-bg));
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-sizing: border-box;
`;

const BrowserInner = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  transform: translateZ(40px);
`;

const NDAContainer = styled(animated.div)`
  width: 956px;
  pointer-events: none; 
  transform-origin: top left;
`;

const Browser = () => {
  const [{ scrollY }, setScrollY] = useSpring(() => ({
    scrollY: 0,
  }));

  const interpScroll = scrollY.interpolate(
    [0, 500, 900, 99999],
    [50, 0, -780, -780],
  ).interpolate(
    (innerPageY) => `scale(.6) translateY(${innerPageY}px)`,
  );

  const [{ tiltAngleX, tiltAngleY }] = useState({
    tiltAngleX: 0,
    tiltAngleY: -30,
  });

  // eslint-disable-next-line no-void
  const handleScroll = () => void setScrollY({ scrollY: window.scrollY });
  const onScroll = useCallback(handleScroll, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  // TODO
  // useLayoutEffect(() => {
  // perform measurements here to calc a more accurate input to interpScroll
  // }, []);

  return (
    <InteractiveBrowser
      tiltX={tiltAngleX}
      tiltY={tiltAngleY}
    >
      <BrowserFrame>
        <BrowserToolbar>
          <BrowserToolbarButtonGroup>
            <BrowserToolbarButton />
            <BrowserToolbarButton />
            <BrowserToolbarButton />
          </BrowserToolbarButtonGroup>
          <BrowserToolbarAddressBar>
            ndaify.com
          </BrowserToolbarAddressBar>
        </BrowserToolbar>
        <BrowserWindow>
          <BrowserInner>
            <NDAContainer
              style={{
                transform: interpScroll,
              }}
            >

              <NDAImpl
                user={user}
                nda={nda}
                ndaTemplate={ndaTemplate}
              />

            </NDAContainer>
          </BrowserInner>
        </BrowserWindow>
      </BrowserFrame>
    </InteractiveBrowser>
  );
};

export default Browser;
