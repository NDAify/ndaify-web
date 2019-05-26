import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2pc;
`;

const ProfileImage = styled.img`
  width: 60px;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1pc;
`;

const ProfileText = styled.span`
  font-weight: 200;
  font-size: 20px;
  color: #FFFFFF;
  margin-bottom: 6px;
`;

const ProfileTextLink = styled.a`
  font-weight: 200;
  text-decoration: underline;
  font-size: 16px;
  color: #FFFFFF;
  cursor: pointer;
`;

const CreatorInfo = () => (
  <ProfileContainer>
    <ProfileImage src="/static/julia.png" alt="julia" />
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
