import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';

import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';
import OpenSourceBanner from '../OpenSourceBanner/OpenSourceBanner';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const ProfileImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-right: 12px;
`;

const ApiDocs = ({ user }) => (
  <>
    <Container>
      {
        user ? (
          <UserActionBanner
            user={user}
            actionButton={() => (
              <>
                <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
                  <ButtonAnchor
                    outline
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  >
                    <ProfileImage
                      alt=""
                      src={user.metadata.linkedInProfile.profilePicture}
                    />
                    <span>
                      Dashboard
                    </span>
                  </ButtonAnchor>
                </Link>

                <UserActionsDropdown user={user} />
              </>
            )}
          />
        ) : (
          <OpenSourceBanner />
        )
      }

    </Container>
  </>
);

export default ApiDocs;
