import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import {
  useSpring, animated, interpolate, useTransition,
} from 'react-spring';

import NDAImpl from '../NDA/NDA';

import TiltView from './TiltView';

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
  background: #424657;
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

const nda = {
  ndaId: '0984a575-c44d-446e-bef6-532ad44652a2',

  metadata: {
    recipientFullName: 'Julia Qiu',
    secretLinks: [
      'http://drive.google.com/secret-document',
    ],
    ndaParamaters: {
      receivingParty: 'Julia Qiu, Slope Ninja',
      disclosingParty: 'Jake Murzy, Committer',
    },
    ndaType: 'f8a74320-8760-11ea-8fac-ff87bd917b7f',
    status: 'signed',
  },

  recipientEmail: 'void',
  recipientId: '6f5bbfd2-cfae-498d-babe-b295aa3fe6ca',

  ownerId: 'a06bdb1b-8b02-431a-836f-33e139f471a2',
  owner: {
    createdAt: '2020-04-14T05:09:07Z',
    linkedInId: 'XXXXXXXXX',
    metadata: {
      status: 'approved',
      linkedInProfile: {
        firstName: 'Jake',
        lastName: 'Murzy',
        profilePicture: 'https://media-exp1.licdn.com/dms/image/C5603AQGsjSSDjWCcbw/profile-displayphoto-shrink_100_100/0?e=1592438400&v=beta&t=X6L58axDyMlEXgJRY9rLy0xpm4mvfOQvuGMax96gtL0',
        emailAddress: 'jake@murzy.com',
      },
    },
    userId: 'a06bdb1b-8b02-431a-836f-33e139f471a2',
  },
};

const user = {
  userId: '6f5bbfd2-cfae-498d-babe-b295aa3fe6ca',
  linkedInId: 'zMPYqX77HK',

  metadata: {
    linkedInProfile: {
      firstName: 'Julia',
      lastName: 'Qiu',
      profilePicture: 'https://media-exp1.licdn.com/dms/image/C4E03AQF09QsKXkfokw/profile-displayphoto-shrink_100_100/0?e=1594252800&v=beta&t=3PofKNdkfx7HJ2PWsod_ItTKyZFkD3dpQoi_HVSISNM',
      emailAddress: 'julia@juliaqiu.com',
    },
  },
};

const Browser = () => {
  const [{ scrollY }, setScrollY] = useSpring(() => ({
    scrollY: 0,
  }));

  const interpScroll = scrollY.interpolate(
    [0,  500,  900, 99999], 
    [50,   0, -780, -780]
  ).interpolate(
    (innerPageY) => `scale(.6) translateY(${innerPageY}px)`,
  );

  const [{ tiltAngleX, tiltAngleY }, setTilt] = useState({
    tiltAngleX: 0,
    tiltAngleY: -30,
  });

  const handleScroll = (event) => void setScrollY({ scrollY: window.scrollY });
  const onScroll = useCallback(handleScroll, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
              />

            </NDAContainer>
          </BrowserInner>
        </BrowserWindow>
      </BrowserFrame>
    </InteractiveBrowser>
  );
};

export default Browser;
