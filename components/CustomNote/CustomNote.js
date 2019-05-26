import React, { Fragment } from 'react';
import styled from 'styled-components';

import CreatorInfo from '../CreatorInfo/CreatorInfo';
import Dialog from '../Dialog/Dialog';

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

const NdaifyLogo = styled.img`
  width: 54px;
`;

const HeartIcon = styled.img`
  width: 30px;
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

const CustomNote = ({ source = 'Product Hunt' }) => {
  if (!source) {
    return null;
  }

  let sourceData;

  if (source === 'Product Hunt') {
    sourceData = {
      name: 'Product Hunt',
      people: 'Product Hunter',
      logoSrc: '/static/productHuntLogo.png',
    };
  }

  if (source === 'Y Combinator') {
    sourceData = {
      name: 'Y Combinator',
      people: 'Hacker News Reader',
      logoSrc: '/static/YCombinatorLogo.png',
    };
  }

  return (
    <Fragment>
      <Container>
        <SourceLogoContainer>
          <NdaifyLogo src="/static/logo.svg" alt="ndaify logo" />
          <HeartIcon src="/static/heart.svg" alt="heart" />
          <SourceLogo src={sourceData.logoSrc} alt={sourceData.name} />
        </SourceLogoContainer>
        <DialogContainer>
          <Dialog>
            <DialogText>
Hey
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
    </Fragment>
  );
};

export default CustomNote;
