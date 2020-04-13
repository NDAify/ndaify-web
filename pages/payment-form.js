import React, { useMemo } from 'react';
import { Router } from '../routes';

import { API } from '../api';

import * as sessionStorage from '../lib/sessionStorage';
import PaymentForm from '../components/PaymentForm/PaymentForm';

const PaymentFormPage = ({ user }) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);
  // `nda` is in session storge, it's not available server side
  if (process.browser && !nda) {
    Router.replaceRoute('/');
  }

  return (
    <PaymentForm user={user} nda={nda} />
  );
};

PaymentFormPage.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  try {
    ({ user } = await api.getSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    user,
  };
};

export default PaymentFormPage;
