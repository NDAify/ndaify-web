import React from 'react';

import styled from 'styled-components';

const UserDetailBannerContainer = styled.div`
  padding: 1pc;
  background-color: #5dbfc8;
  width: 100%;
  min-height: 90px;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (min-width: 992px) {
    padding: 1pc 2pc;
  }
`;

const UserDetailBannerButton = styled.button`
  font-size: 20px;
  border-radius: 4px;
  font-weight: 200;
  text-align: center;
  letter-spacing: 1.8px;
  color: #ffffff;
  cursor: pointer;
  width: 110px;
  height: 40px;
  border: 0;
  margin-top: 1pc;
  margin-bottom: 1pc;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2pc;
  margin-top: 1pc;
  margin-bottom: 1pc;
  flex: 1;
  width: inherit;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const UserNameText = styled.span`
  font-size: 20px;
  font-weight: 200;
  display: block;
  color: #ffffff;
  margin-right: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 994px) {
    font-size: 24px;
    margin-right: 8px;
  }
`;

const UserEmailText = styled.span`
  font-size: 20px;
  font-weight: 200;
  color: #ffffff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const UserActionBanner = () => (
  <UserDetailBannerContainer>
    <UserDetails>
      <UserNameText>Joe Doe</UserNameText>
      <UserEmailText>
        {'<joejoejoejoejoejoejoejoejoejoe@gmail.com>'}
      </UserEmailText>
    </UserDetails>

    <UserDetailBannerButton style={{ backgroundColor: '#dc564a' }}>
          Discard
    </UserDetailBannerButton>
  </UserDetailBannerContainer>
);

export default UserActionBanner;
