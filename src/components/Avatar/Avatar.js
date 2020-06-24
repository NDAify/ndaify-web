import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const ProfileImagePlaceholder = styled.span`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ndaify-accents-9);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getProfilePhotoSrc = (
  user,
) => user.metadata.profilePhoto || user.metadata.linkedInProfile.profilePicture;

const getFirstNameInitial = (user) => user.metadata.linkedInProfile.firstName.charAt(0);

const Avatar = ({
  className,
  user,
  withInitials,
}) => {
  const src = getProfilePhotoSrc(user);

  return (
    <Wrapper className={className}>
      {
        (withInitials || !src) ? (
          <ProfileImagePlaceholder>
            {getFirstNameInitial(user)}
          </ProfileImagePlaceholder>
        ) : (
          <ProfileImage
            alt=""
            src={src}
          />
        )
      }
    </Wrapper>
  );
};

export default Avatar;
