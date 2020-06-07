import React from 'react';
import styled from 'styled-components';

const ProfileImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-right: 12px;
`;

const ProfileImagePlaceholder = styled.span`
  display: block;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-right: 12px;
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
  user,
}) => {
  const src = getProfilePhotoSrc(user);

  if (!src) {
    const initials = getFirstNameInitial(user);

    return (
      <ProfileImagePlaceholder>
        {initials}
      </ProfileImagePlaceholder>
    );
  }

  return (
    <ProfileImage
      alt=""
      src={src}
    />
  );
};

export default Avatar;
