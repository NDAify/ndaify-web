import React from 'react';

import styled from 'styled-components';

import getFullNameFromUser from '../NDA/getFullNameFromUser';

const UserDetailBannerContainer = styled.div`
  padding: 1pc;
  background-color: var(--ndaify-user-action-bg);
  width: 100%;
  min-height: 90px;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 992px) {
    padding: 1pc 2pc;
  }
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
  color: var(--ndaify-fg);
  margin-right: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    font-size: 24px;
    margin-right: 8px;
  }
`;

const UserEmailText = styled.span`
  font-size: 20px;
  font-weight: 200;
  color: var(--ndaify-fg);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const UserActionButtonContainer = styled.div`
  display: flex;
`;

const UserActionBanner = ({ user, actionButton }) => {
  if (!user) {
    return null;
  }
  return (
    <UserDetailBannerContainer>
      <UserDetails>
        <UserNameText>{getFullNameFromUser(user)}</UserNameText>
        <UserEmailText>
          {`<${user.metadata.linkedInProfile.emailAddress}>`}
        </UserEmailText>
      </UserDetails>

      {
        actionButton ? (
          <UserActionButtonContainer>
            {actionButton()}
          </UserActionButtonContainer>
        ) : null
      }

    </UserDetailBannerContainer>
  );
};

export default UserActionBanner;
