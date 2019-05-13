import React from "react";
import styled from "styled-components";

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

const CreatorInfo = () => (
    <ProfileContainer>
      <img src="/static/julia.png" alt="julia" />
      <ProfileTextContainer>
        <ProfileText>
          Julia
        </ProfileText>
        <ProfileTextLink>
          @juliaqiuxy
        </ProfileTextLink>
      </ProfileTextContainer>
    </ProfileContainer>  
);

export default CreatorInfo;
