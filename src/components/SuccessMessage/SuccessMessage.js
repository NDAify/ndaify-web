import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import LogoHeader from '../LogoHeader/LogoHeader';
import Footer from '../Footer/Footer';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';
import Avatar from '../Avatar/Avatar';

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
  margin-bottom: 6pc;
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
  line-height: 28px;
  text-align: center;
  margin: 0;
  color: var(--ndaify-fg);
  margin-bottom: 3pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const SuccessMessage = ({ user, nda }) => (
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
                  <Avatar user={user} />

                  <span>
                    <FormattedMessage
                      id="user-action-banner-label-inbox"
                      defaultMessage="Inbox"
                    />
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
          <FormattedMessage
            id="success-message-text"
            defaultMessage="Your request has been sent to {recipientFullName}. You will be notified when they accept the NDA."
            values={{
              recipientFullName: nda.metadata.recipientFullName,
            }}
          />
        </SucessMessage>
        <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/outgoing" replace>
          <ButtonAnchor style={{ backgroundColor: 'var(--ndaify-accents-success)' }}>
            <FormattedMessage
              id="success-message-button"
              defaultMessage="Done"
            />
          </ButtonAnchor>
        </Link>
      </SucessMessageContainer>

      <Footer />
    </PageContentContainer>
  </Container>
);

export default SuccessMessage;
