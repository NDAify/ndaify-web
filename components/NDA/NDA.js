import React, { Fragment } from "react";

import styled from "styled-components";

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
`;

const DisclaimerTitle = styled.h4`
  font-size: 20px;
  margin-top: 3pc;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const DisclaimerBody = styled.h4`
  font-size: 20px;
  margin-top: 2pc;
  font-weight: 200;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }
`;

const NDATitleContainer = styled.div`
  text-align: center;
`;

const NDATitle = styled.h4`
  font-size: 28px;
  margin-top: 3pc;
  margin-bottom: 3pc;
  font-weight: 200;

  @media screen and (min-width: 994px) {
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
  margin-top: 1pc;
  display: block;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const NDASectionBodyText = styled.span`
  font-size: 16px;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const BetweenPartyContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 200;
  margin-left: 1pc;
  line-height: 34px;
`;

const EditableText = styled.span`
  font-weight: 700;
  padding: 4px;
  border: 1px dashed #00ab6c;
`;

const DisclaimerEnding = styled.span`
  font-size: 16px;
  display: block;
  font-weight: 200;
  margin-top: 1pc;
  margin-bottom: 1pc;

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const LongText = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin-top: 1pc;
  line-height: 28px;

  @media screen and (min-width: 994px) {
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

  @media screen and (min-width: 994px) {
    font-size: 20px;
  }
`;

const NDAReadMoreLink = styled.a`
  text-decoration: underline;
  font-weight: 200;
`;

const DisclaimerTitleText = ({ isRecipientNDA, sender }) =>
  isRecipientNDA ? (
    <DisclaimerTitle>
      <BoldText>{sender.name}</BoldText> has requested your signature
    </DisclaimerTitle>
  ) : (
    <DisclaimerTitle>
      <BoldText>Almost done.</BoldText>
    </DisclaimerTitle>
  );

const BetweenParty = ({ isRecipientNDA, sender, recipient }) =>
  isRecipientNDA ? (
    <BetweenPartyContainer>
      <NDASectionBodyText>
        1. <BoldText>{sender.name}</BoldText> (the Disclosing Party);
        and
      </NDASectionBodyText>
      <NDASectionBodyText>
        2.{" "}
        <BoldText>
          {recipient.name}, {recipient.company}
        </BoldText>{" "}
        (the Receiving Party), collectively referred to as the Parties.
      </NDASectionBodyText>
    </BetweenPartyContainer>
  ) : (
    <BetweenPartyContainer>
      <NDASectionBodyText>
        1. <EditableText contentEditable>{sender.name}</EditableText> (the
        Disclosing Party); and
      </NDASectionBodyText>
      <NDASectionBodyText>
        2.{" "}
        <EditableText contentEditable>
          {recipient.name}, {recipient.company}
        </EditableText>{" "}
        (the Receiving Party), collectively referred to as the Parties.
      </NDASectionBodyText>
    </BetweenPartyContainer>
  );

const NDA = ({ sender, recipient, isRecipientNDA }) => {
  const otherPartyName = isRecipientNDA ? sender.name : recipient.name;

  return (
    <Container>
      <NDADisclaimerWrapper>
        <DisclaimerTitleText isRecipientNDA={isRecipientNDA} sender={sender} />
        <DisclaimerBody>
          By signing, both <BoldText>you</BoldText> and{" "}
          <BoldText>{otherPartyName}</BoldText> will agree to terms of an NDA to{" "}
          <BoldText>protect all parties and materials disclosed</BoldText>.
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
          <NDASectionTitle>This Agreement </NDASectionTitle>
          <NDASectionBodyText>
            is made on December 6th, 2017.
          </NDASectionBodyText>
        </NDASectionContainer>
        <NDASectionContainer>
          <NDASectionTitle>Between</NDASectionTitle>
          <BetweenParty
            isRecipientNDA={isRecipientNDA}
            sender={sender}
            recipient={recipient}
          />
          <DisclaimerEnding>
            collectively referred to as the <BoldText>Parties</BoldText>.
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
            To read all terms, <NDAReadMoreLink>click here</NDAReadMoreLink>.
          </NDAReadMoreText>
        </NDAReadMoreContainer>
    </Container>
  );
};

export default NDA;
