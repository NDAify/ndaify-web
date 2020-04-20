import React from 'react';
import styled from 'styled-components';

import CreatorInfo from '../CreatorInfo/CreatorInfo';
import HeartIcon from './images/heart.svg';
import LogoIcon from './images/logo.svg';
import productHuntLogo from './images/productHuntLogo.png';
import yCombinatorLogo from './images/yCombinatorLogo.png';

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
  color: #FFFFFF;

  :first-of-type {
    margin-top: 0;
  }
`;

const Dialog = styled.div`
  height: 100%;
  position: relative;
  background-color: #383B49;
  border-radius: 4px;
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
    border-top-color: #383b49;
    border-bottom: 0;
    border-right: 0;
    margin-left: -6px;
    margin-bottom: -12px;
  }
`;

const CustomNote = ({ source = 'Product Hunt' }) => {
  if (!source) {
    return null;
  }

  let sourceData;

  if (source === 'Product Hunt') {
    sourceData = {
      name: 'Product Hunt',
      people: 'Product Hunter',
      logoSrc: productHuntLogo,
    };
  }

  if (source === 'Y Combinator') {
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
