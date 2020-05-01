import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import LogoHeader from '../LogoHeader/LogoHeader';
import Footer from '../Footer/Footer';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const PageContentContainer = styled.div`
  padding: 1pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  margin-top: 3pc;
  box-sizing: border-box;
`;

const LogoHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10pc;
`;

const SucessMessageContainer = styled.div`
  max-width: 576px;
  width: 100%;
  margin: 2pc;
  margin-top: 0;
  margin-bottom: 10pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

const SucessMessage = styled.p`
  font-size: 20px;
  font-weight: 200;
  text-align: center;
  margin: 0;
  color: #ffffff;
  margin-bottom: 3pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
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

const SuccessMessage = ({ user, nda }) => (
  <Container>
    {
      user ? (
        <UserActionBanner
          user={user}
          actionButton={() => (
            <>
              <Link href="/dashboard/[dashboardType]" as="/dashboard/incoming">
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
      ) : null
    }

    <PageContentContainer>
      <LogoHeaderContainer>
        <LogoHeader />
      </LogoHeaderContainer>

      <SucessMessageContainer>
        <SucessMessage>
          Your request has been sent to
          {' '}
          {nda.metadata.recipientFullName}
          . You will be notified when
          {' '}
          {nda.metadata.recipientFullName}
          {' '}
          views and/or accepts the NDA.
        </SucessMessage>
        <Link href="/dashboard/[dashboardType]" as="/dashboard/outgoing" replace>
          <ButtonAnchor style={{ backgroundColor: '#39d494' }}>Done</ButtonAnchor>
        </Link>
      </SucessMessageContainer>

      <Footer />
    </PageContentContainer>
  </Container>
);

export default SuccessMessage;
