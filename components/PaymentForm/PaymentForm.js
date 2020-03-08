import React from 'react';
import styled from 'styled-components';
import { Link } from '../../routes';

import Button from '../Clickable/Button';
import Input from '../Input/Input';
import Footer from '../Footer/Footer';
import CreatorInfo from '../CreatorInfo/CreatorInfo';
import Dialog from '../Dialog/Dialog';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UserActionBanner from '../UserActionBanner/UserActionBanner';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding: 1pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  margin-top: 3pc;
  padding-top: 2pc;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
`;

const DialogContainer = styled.div`
  margin-bottom: 5pc;
`;

const DialogTitle = styled.h3`
  font-size: 28px;
  margin: 0;
  margin-bottom: 2pc;
  font-weight: 400;
  text-align: center;
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const DialogLongText = styled.p`
  font-size: 16px;
  margin: 0;
  margin-bottom: 2pc;
  color: #ffffff;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }

  :last-of-type {
    margin-bottom: 0;
  }
`;

const UnderlineText = styled.span`
  text-decoration: underline;
`;

const PaymentFormContainer = styled.div`
  max-width: 576px;
  width: 100%;
  margin: 2pc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

const PaymentFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  height: 140px;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    height: auto;
    margin: 0;
    margin-bottom: 2pc;

    :nth-of-type(3) {
      margin-bottom: 0;
    }
  }
`;

const TwoColInputContainer = styled.div`
  flex: 1;

  :nth-child(2) {
    margin-left: 0;
  }

  @media screen and (min-width: 992px) {
    :nth-child(2) {
      margin-left: 1pc;
    }
  }
`;

const DividerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 1pc;
`;

const DividerLine = styled.div`
  height: 3px;
  width: 200px;
  background-color: #aaaaaa;
  margin-left: 1pc;
  margin-right: 1pc;
`;

const DividerText = styled.span`
  color: #aaaaaa;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const Total = styled.h4`
  font-size: 20px;
  margin-top: 2pc;
  font-weight: 200;
  color: #aaaaaa;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const Divider = () => (
  <DividerContainer>
    <DividerLine />
    <DividerText>Or</DividerText>
    <DividerLine />
  </DividerContainer>
);

const PaymentForm = ({ error = true }) => (
  <Container>
    <UserActionBanner ActionButton={() => <Button outline>Dashboard</Button>} />
    <ContentContainer>
      <DialogContainer>
        <DialogTitle>One last thing before delivery…</DialogTitle>

        <Dialog>
          <DialogLongText>Hi Joe,</DialogLongText>
          <DialogLongText>
            It costs money to keep NDAify running. If you use the service and
            find it valuable, plese help me stay online by making a small
            donation.
          </DialogLongText>
          <DialogLongText>
            Or, share a good reason below for why you can’t pay and you can
            still use NDAify for
            {' '}
            <UnderlineText>free</UnderlineText>
            .
          </DialogLongText>

          <DialogLongText>
            Any questions or comments? Just send me a tweet, I’m always
            listening.
          </DialogLongText>
          <DialogLongText>Thank you for using NDAify!</DialogLongText>
        </Dialog>
        <CreatorInfo />
      </DialogContainer>

      <PaymentFormContainer>
        {error && <ErrorMessage style={{ marginBottom: '3pc' }} message="Failed to process payment" />}
        <PaymentFormRow>
          <TwoColInputContainer>
            <Input placeholder="Name on card" />
          </TwoColInputContainer>
          <TwoColInputContainer>
            <Input placeholder="Card number" />
          </TwoColInputContainer>
        </PaymentFormRow>
        <PaymentFormRow>
          <TwoColInputContainer>
            <Input placeholder="MM / YY" />
          </TwoColInputContainer>
          <TwoColInputContainer>
            <Input placeholder="CVC" />
          </TwoColInputContainer>
        </PaymentFormRow>

        <Divider />

        <div style={{ marginTop: '1pc' }}>
          <Input placeholder="I can’t pay because…" />
        </div>

        <Total>Total $ 1.00</Total>

        <Link route="/success-message">
          <Button style={{ backgroundColor: '#39d494' }}>Send</Button>
        </Link>
      </PaymentFormContainer>

      <Footer withLogo />
    </ContentContainer>
  </Container>
);

export default PaymentForm;
