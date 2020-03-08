import React from 'react';

import styled from 'styled-components';

import AnchorButton from '../Clickable/AnchorButton';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NDADisclaimerWrapper = styled.div`
  max-width: 576px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const BoldText = styled.span`
  font-weight: 700;
  color: #ffffff;
`;

const DisclaimerTitle = styled.h4`
  font-size: 20px;
  margin: 0;
  color: #ffffff;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const DisclaimerBody = styled.h4`
  font-size: 20px;
  margin: 0;
  margin-bottom: 4pc;
  font-weight: 200;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const NDATitleContainer = styled.div`
  text-align: center;
`;

const NDATitle = styled.h4`
  font-size: 28px;
  margin: 0;
  margin-bottom: 4pc;
  font-weight: 200;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const NDASectionContainer = styled.div`
  width: 100%;
`;

const NDASectionTitle = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1pc;
  display: block;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDASectionBodyText = styled.span`
  font-size: 16px;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const BetweenPartyContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 200;
  margin-left: 1pc;
  margin-top: 8px;
  line-height: 34px;
`;

const EditableText = styled.span`
  font-weight: 700;
  padding: 4px;
  outline: 1px dashed #edd9a3;
  color: #ffffff;
`;

const DisclaimerEnding = styled.span`
  font-size: 16px;
  display: block;
  font-weight: 200;
  margin-top: 1pc;
  margin-bottom: 1pc;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const LongText = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin-top: 1pc;
  line-height: 28px;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDAReadMoreContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 4pc;
`;

const NDAReadMoreText = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const DisclaimerTitleText = ({ isRecipientNDA, sender }) => (isRecipientNDA ? (
  <DisclaimerTitle>
    <BoldText>{sender.name}</BoldText>
    {' '}
    has requested your signature
  </DisclaimerTitle>
) : (
  <DisclaimerTitle>
    <BoldText>Almost done.</BoldText>
  </DisclaimerTitle>
));

const BetweenParty = ({
  isRecipientNDA, sender, recipient, onRecipientChange, onSenderChange,
}) => (isRecipientNDA ? (
  <BetweenPartyContainer>
    <NDASectionBodyText>
      1.
      {' '}
      <BoldText>{sender.name}</BoldText>
      {' '}
      (the Disclosing Party); and
    </NDASectionBodyText>
    <NDASectionBodyText>
      2.
      {' '}
      <BoldText>
        {recipient.name}
        {recipient.company ? recipient.company : null}
      </BoldText>
      {' '}
      (the Receiving Party), collectively referred to as the Parties.
    </NDASectionBodyText>
  </BetweenPartyContainer>
) : (
  <BetweenPartyContainer>
    <NDASectionBodyText>
      1.
      {' '}
      <EditableText contentEditable onInput={onSenderChange} suppressContentEditableWarning>
        {sender.name}
      </EditableText>
      {' '}
      (the Disclosing Party) and
    </NDASectionBodyText>
    <NDASectionBodyText>
      2.
      {' '}
      <EditableText contentEditable onInput={onRecipientChange} suppressContentEditableWarning>
        {recipient.name}
        {recipient.company ? `, ${recipient.company}` : null}
      </EditableText>
      {' '}
      (the Receiving Party), collectively referred to as the Parties.
    </NDASectionBodyText>
  </BetweenPartyContainer>
));

const NDA = ({
  sender, recipient, isRecipientNDA, onRecipientChange, onSenderChange,
}) => {
  const otherPartyName = isRecipientNDA ? sender.name : recipient.name;

  return (
    <Container>
      <NDADisclaimerWrapper>
        <DisclaimerTitleText isRecipientNDA={isRecipientNDA} sender={sender} />
        <DisclaimerBody>
          By signing, both
          {' '}
          <BoldText>you</BoldText>
          {' '}
          and
          {' '}
          <BoldText>{otherPartyName}</BoldText>
          {' '}
          are agreeing to terms of an NDA to
          {' '}
          <BoldText>protect all parties and materials disclosed</BoldText>
          .
        </DisclaimerBody>
      </NDADisclaimerWrapper>
      <NDATitleContainer>
        <NDATitle>
          <span>Non-Disclosure</span>
          <br />
          <span>Agreement</span>
        </NDATitle>
      </NDATitleContainer>

      <NDASectionContainer>
        <NDASectionTitle
          style={{ display: 'inline-block', marginRight: '6px' }}
        >
          This Agreement
          {' '}
        </NDASectionTitle>
        <NDASectionBodyText style={{ display: 'inline' }}>
          is made on December 6th, 2017.
        </NDASectionBodyText>
      </NDASectionContainer>
      <NDASectionContainer>
        <NDASectionTitle>Between</NDASectionTitle>
        <BetweenParty
          isRecipientNDA={isRecipientNDA}
          sender={sender}
          recipient={recipient}
          onRecipientChange={onRecipientChange}
          onSenderChange={onSenderChange}
        />
        <DisclaimerEnding>
          collectively referred to as the
          {' '}
          <BoldText>Parties</BoldText>
          .
        </DisclaimerEnding>
      </NDASectionContainer>
      <NDASectionContainer>
        <NDASectionTitle>RECITALS</NDASectionTitle>
        <LongText>
          A. The Receiving Party understands that the Disclosing Party has
          disclosed or may disclose information relating to its business,
          operations, plans, prospects, affairs, source code, product designs,
          art, and other related concepts, which to the extent previously,
          presently, or subsequently disclosed to the Receiving Party is
          hereinafter referred to as Proprietary Information of the Disclosing
          Party.
        </LongText>
      </NDASectionContainer>
      <NDASectionContainer>
        <NDASectionTitle>OPERATIVE PROVISIONS</NDASectionTitle>
        <LongText>
          1. In consideration of the disclosure of Proprietary Information by
          the Disclosing Party, the Receiving Party hereby agrees: (i) to hold
          the Proprietary Information in strict confidence and to take all
          reasonable precautions to protect such Proprietary Information
          (including, without limitation, all precautions…
        </LongText>
      </NDASectionContainer>

      <NDAReadMoreContainer>
        <NDAReadMoreText>
          To read all terms,
          {' '}
          <AnchorButton>click here</AnchorButton>
          .
        </NDAReadMoreText>
      </NDAReadMoreContainer>
    </Container>
  );
};

export default NDA;
