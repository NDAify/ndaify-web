import React, { useMemo, useEffect } from 'react';
import { Router } from '../routes';

import { API } from '../api';

import * as sessionStorage from '../lib/sessionStorage';
import PaymentForm from '../components/PaymentForm/PaymentForm';

const PaymentFormPage = ({ user }) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  useEffect(() => {
    if (process.browser && !nda) {
      Router.replaceRoute('/');
    }
  }, [nda]);

  if (process.browser && !nda) {
    return null;
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
