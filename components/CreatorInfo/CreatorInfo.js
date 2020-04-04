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

  a {
    text-decoration: underline;
    background-color: transparent;
    color: #ffffff;
    cursor: pointer;
    transition: none;
  }

  a:visited {
    color: #fffff;
  }
`;

const ProfileText = styled.span`
  font-weight: 200;
  font-size: 20px;
  color: #FFFFFF;
  margin-bottom: 6px;
`;

const CreatorInfo = () => (
  <ProfileContainer>
    <ProfileImage src="/static/julia.png" alt="julia" />
    <ProfileTextContainer>
      <ProfileText>
        Julia
      </ProfileText>
      <a
        href="https://twitter.com/juliaqiuxy"
        target="_blank"
        rel="noopener noreferrer"
      >
        @juliaqiuxy
      </a>
    </ProfileTextContainer>
  </ProfileContainer>
);

export default CreatorInfo;
