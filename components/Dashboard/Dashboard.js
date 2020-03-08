import React from 'react';

import styled from 'styled-components';

import UserActionBanner from '../UserActionBanner/UserActionBanner';
import Footer from '../Footer/Footer';
import Button from '../Clickable/Button';

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

const ActionRow = styled.div`
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
  color: #ffffff;
  font-weight: 200;
  margin-right: 2pc;
  padding-bottom: 6px;
  border-bottom: ${({ active }) => active && '4px solid #EDD9A3'};

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const HistoryList = styled.div`
  width: 100%;
  height: 500px;
`;

const ItemCardContainer = styled.div`
  display: flex;
  border: 1px solid #EDD9A3;
  border-radius: 4px;
  margin-bottom: 1pc;
`;

const RightArrowContainer = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    margin-right: 1pc;
  }
`;

const RightArrowIcon = styled.img`
  width: 20px;
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

const CalendarIcon = styled.img`
  width: 24px;
  margin-right: 1pc;
`;

const HistoryTimeText = styled.span`
  font-size: 20px;
  color: #ffffff;
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
  color: #9B9B9B;
  width: 100%;
  line-height: 32px;
`;

const RecipientInfoText = styled.div`
  display: block;
  font-size: 20px;
  color: #ffffff;
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
  color: #EDD9A3;
`;

const HistoryItem = () => (
  <ItemCardContainer>
    <HistoryItemContainer>
      <HistoryTimeRow>
        <CalendarIcon src="/static/calendarIcon.svg" alt="calendar icon" />
        <HistoryTimeText>March 3, 2019</HistoryTimeText>
      </HistoryTimeRow>
      <RecipientRow>
        <HistoryItemTitle>Recipient</HistoryItemTitle>
        <RecipientInfoText>{'Jeremy Voss <jeremy.voss@gmail.com>'}</RecipientInfoText>
      </RecipientRow>
      <TypeAndStatusRow>
        <TypeContainer>
          <HistoryItemTitle>Type</HistoryItemTitle>
          <RecipientInfoText>Mutual NDA</RecipientInfoText>
        </TypeContainer>
        <StatusContainer>
          <HistoryItemTitle>Statue</HistoryItemTitle>
          <StatusText>Unsigned</StatusText>
        </StatusContainer>
      </TypeAndStatusRow>
    </HistoryItemContainer>
    <RightArrowContainer>
      <RightArrowIcon src="/static/rightArrowIcon.svg" alt="right arrow icon" />

    </RightArrowContainer>
  </ItemCardContainer>
);


const Dashboard = () => (
  <Container>
    <UserActionBanner ActionButton={() => <Button compact color="#dc564a">Log Out</Button>} />
    <PageContainer>
      <ActionRow>
        <LinksContainer>
          <StyledLink>Inbox</StyledLink>
          <StyledLink active>Sent</StyledLink>
        </LinksContainer>
        <Button outline>New</Button>
      </ActionRow>

      <HistoryList>
        <HistoryItem />
        <HistoryItem />
      </HistoryList>

      <Footer withLogo />

    </PageContainer>
  </Container>
);

export default Dashboard;
