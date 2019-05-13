import React, { Fragment } from "react";
import styled from "styled-components";

import CreatorInfo from '../CreatorInfo/CreatorInfo';
import Dialog from '../Dialog/Dialog';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #4f5263;
  padding-bottom: 3pc;
`;

const SourceLogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3pc;
  width: 200px;
`;

const NdaifyLogo = styled.img`
  width: 42px;
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
  margin-top: 3pc;
`;

const DialogText = styled.p`
  font-weight: 200;
  margin-top: 2pc;

  :first-of-type {
    margin-top: 0;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2pc;
  margin-left: 2pc;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1pc;
`;

const ProfileText = styled.span`
  font-weight: 200;
`;

const ProfileTextLink = styled.a`
  font-weight: 200;
  text-decoration: underline;
`;

const CustomNote = ({ source = "Product Hunt" }) => {
  if (!source) {
    return null;
  }

  let sourceData;

  if (source === "Product Hunt") {
    sourceData = {
      name: "Product Hunt",
      people: "Product Hunter",
      logoSrc: "/static/productHuntLogo.png"
    };
  }

  if (source === "Y Combinator") {
    sourceData = {
      name: "Y Combinator",
      people: "Hacker News Reader",
      logoSrc: "/static/YCombinatorLogo.png"
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
            <DialogText>Hey {sourceData.people},</DialogText>
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
