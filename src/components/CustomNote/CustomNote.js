import React, { useCallback } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import CreatorInfo from '../CreatorInfo/CreatorInfo';
import Button from '../Clickable/Button';
import Heart from './images/heart.svg';
import LogoIcon from './images/logo.svg';
import productHuntLogo from './images/productHuntLogo.png';
import yCombinatorLogo from './images/yCombinatorLogo.png';

const HeartIcon = styled(Heart)`
  color: var(--ndaify-fg);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 6pc;
`;

const SourceLogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3pc;
  margin-bottom: 2pc;
  width: 200px;
`;

const NdaifyLogo = styled.div`
  svg {
    width: 54px;
  }
`;

const HeartIconWrapper = styled.div`
  svg {
    width: 30px;
  }
`;

const SourceLogo = styled.img`
  width: 54px;
`;

const DialogContainer = styled.div`
  max-width: 768px;
  width: 100%;
`;

const DialogText = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin: 0;
  margin-top: 1pc;
  color: var(--ndaify-fg);

  :first-of-type {
    margin-top: 0;
  }

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const Dialog = styled.div`
  height: 100%;
  position: relative;
  background-color: var(--ndaify-bg-overlay);
  border-radius: var(--ndaify-accents-radius-1);
  line-height: 28px;
  padding: 2pc;
  margin-bottom: 2pc;

  :after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 6%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-top-color: var(--ndaify-bg-overlay);
    border-bottom: 0;
    border-right: 0;
    margin-left: -6px;
    margin-bottom: -12px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const CustomNote = ({ refSource }) => {
  const handleClick = () => {
    Router.push('/');
  };
  const onClick = useCallback(handleClick, []);

  if (!refSource) {
    return null;
  }

  let sourceData;

  if (refSource === 'ph') {
    sourceData = {
      name: 'Product Hunt',
      people: 'Product Hunter',
      logoSrc: productHuntLogo,
    };
  }

  if (refSource === 'hn') {
    sourceData = {
      name: 'Y Combinator',
      people: 'Hacker News Reader',
      logoSrc: yCombinatorLogo,
    };
  }

  return (
    <>
      <Container>
        <SourceLogoContainer>
          <NdaifyLogo>
            <LogoIcon />
          </NdaifyLogo>
          <HeartIconWrapper>
            <HeartIcon />
          </HeartIconWrapper>
          <SourceLogo src={sourceData.logoSrc} alt={sourceData.name} />
        </SourceLogoContainer>
        <DialogContainer>
          <Dialog>
            <StyledButton outline onClick={onClick}>Close</StyledButton>
            <DialogText>
              Hey
              {' '}
              {sourceData.people}
              ,
            </DialogText>
            <DialogText>
              I’m Julia. Thanks for checking out NDAify. This is a free and
              open-source project I work on in my spare time. It helps you
              quickly put secrets behind an NDA-wall.
            </DialogText>
            <DialogText>
              Any questions or comments? Just send me a tweet, I’m always
              listening.
            </DialogText>
          </Dialog>
          <CreatorInfo />
        </DialogContainer>
      </Container>
    </>
  );
};

export default CustomNote;
