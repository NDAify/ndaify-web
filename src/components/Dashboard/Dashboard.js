import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { FormattedDate } from 'react-intl';

import UserActionBanner from '../UserActionBanner/UserActionBanner';
import Footer from '../Footer/Footer';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import ActiveLink from '../ActiveLink/ActiveLink';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';

import { NDA_TEMPLATE_OPTIONS } from '../SenderForm/SenderForm';
import getFullNameFromUser from '../NDA/getFullNameFromUser';

import CalendarIcon from './images/calendar.svg';
import RightArrow from './images/rightArrow.svg';

const RightArrowIcon = styled(RightArrow)`
  color: var(--ndaify-accents-9);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageContainer = styled.div`
  padding: 1pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
`;

const SigRow = styled.div`
  padding-top: 2pc;
  padding-bottom: 2pc;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1pc;
`;

const LinksContainer = styled.div`

`;

const StyledLink = styled.a`
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 200;
  margin-right: 2pc;
  padding-bottom: 6px;
  border-bottom: ${({ active }) => active && '4px solid var(--ndaify-accents-9)'};
  cursor: pointer;
  text-decoration: none;

  :visited {
    color: var(--ndaify-fg);
  }

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const HistoryList = styled.div`
  width: 100%;
`;

const ItemCardContainer = styled.a`
  display: flex;
  border: 1px solid #4E5263;
  border-radius: var(--ndaify-accents-radius-1);
  margin-bottom: 1pc;
  cursor: pointer;
  text-decoration: none;

  ${(props) => (props.pending ? 'border-color: var(--ndaify-accents-9);' : '')}
`;

const RightArrowContainer = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    margin-right: 1pc;
  }
`;

const RightArrowIconwrapper = styled.div`
  svg {
    width: 20px;
  }
`;

const HistoryItemContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1pc 2pc 1pc 2pc;
`;

const HistoryTimeRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1pc;
`;

const CalendarIconWrapper = styled.div`
  margin-right: 1pc;
  
  svg {
    width: 24px;
  }
`;

const EmptyHistoryList = styled.span`
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 700;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const HistoryTimeText = styled.span`
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const RecipientRow = styled.div`
  margin-bottom: 1pc;
`;

const HistoryItemTitle = styled.div`
  font-size: 16px;
  color: var(--ndaify-accents-6);
  width: 100%;
  line-height: 32px;
`;

const RecipientInfoText = styled.div`
  display: block;
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 200;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const TypeAndStatusRow = styled.div`
  display: flex;
`;

const TypeContainer = styled.div`
  margin-right: 3pc;
`;

const StatusContainer = styled.div`

`;

const StatusText = styled(RecipientInfoText)`
  color: var(--ndaify-accents-9);
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

const NDA_STATUS_LABEL = {
  pending: 'Unsigned',
  signed: 'Signed',
  revoked: 'Revoked',
  declined: 'Declined',
};

const HistoryItem = ({ dashboardType, nda }) => (
  <Link passHref href="/nda/[ndaId]" as={`/nda/${nda.ndaId}`}>
    <ItemCardContainer pending={nda.metadata.status === 'pending'}>
      <HistoryItemContainer>
        <HistoryTimeRow>
          <CalendarIconWrapper>
            <CalendarIcon />
          </CalendarIconWrapper>
          <HistoryTimeText>
            <FormattedDate
              year="numeric"
              month="long"
              day="numeric"
              value={nda.createdAt}
            />
          </HistoryTimeText>
        </HistoryTimeRow>

        {
            dashboardType === 'incoming' ? (
              <RecipientRow>
                <HistoryItemTitle>Sender</HistoryItemTitle>
                <RecipientInfoText>{`${getFullNameFromUser(nda.owner)} <${nda.owner.metadata.linkedInProfile.emailAddress}>`}</RecipientInfoText>
              </RecipientRow>
            ) : (
              <RecipientRow>
                <HistoryItemTitle>Recipient</HistoryItemTitle>
                <RecipientInfoText>{`${nda.metadata.recipientFullName} <${nda.recipientEmail === 'void' ? nda.recipient.metadata.linkedInProfile.emailAddress : nda.recipientEmail}>`}</RecipientInfoText>
              </RecipientRow>
            )
          }
        <TypeAndStatusRow>
          <TypeContainer>
            <HistoryItemTitle>Type</HistoryItemTitle>
            <RecipientInfoText>
              {
                NDA_TEMPLATE_OPTIONS.find(
                  (option) => option.value === nda.metadata.ndaTemplateId,
                ).label
              }
            </RecipientInfoText>
          </TypeContainer>
          <StatusContainer>
            <HistoryItemTitle>Status</HistoryItemTitle>
            <StatusText>{NDA_STATUS_LABEL[nda.metadata.status]}</StatusText>
          </StatusContainer>
        </TypeAndStatusRow>
      </HistoryItemContainer>
      <RightArrowContainer>
        <RightArrowIconwrapper>
          <RightArrowIcon />
        </RightArrowIconwrapper>
      </RightArrowContainer>
    </ItemCardContainer>
  </Link>
);

const Dashboard = ({ dashboardType, user, ndas }) => {
  const byDashboardType = dashboardType === 'incoming' ? (nda) => nda.ownerId !== user.userId : (nda) => nda.ownerId === user.userId;

  const filteredNdas = ndas.filter(byDashboardType);

  return (
    <Container>

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
      <PageContainer>
        <SigRow>
          <LinksContainer>
            <ActiveLink scroll={false} href="/dashboard/[dashboardType]" as="/dashboard/incoming">
              {
                (active) => (
                  <StyledLink active={active}>Inbox</StyledLink>
                )
              }
            </ActiveLink>
            <ActiveLink scroll={false} href="/dashboard/[dashboardType]" as="/dashboard/outgoing">
              {
                (active) => (
                  <StyledLink active={active}>Sent</StyledLink>
                )
              }
            </ActiveLink>
          </LinksContainer>
          <Link passHref href="/">
            <ButtonAnchor outline>New</ButtonAnchor>
          </Link>
        </SigRow>

        {
          filteredNdas.length > 0 ? (
            <HistoryList>
              {
                filteredNdas.map((nda) => (
                  <HistoryItem key={nda.ndaId} nda={nda} dashboardType={dashboardType} />
                ))
              }
            </HistoryList>
          ) : (
            <EmptyHistoryList>
              {
                dashboardType === 'incoming' ? (
                  <>
                    You have nothing in your inbox
                  </>
                ) : (
                  <>
                    You have not sent NDAs
                  </>
                )
              }
            </EmptyHistoryList>
          )
        }

        <Footer withLogo />

      </PageContainer>
    </Container>
  );
};

export default Dashboard;
