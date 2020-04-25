import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';

import { API } from '../../api';

import * as sessionStorage from '../../lib/sessionStorage';
import PaymentFormImpl from '../../components/PaymentForm/PaymentForm';

const PaymentForm = ({ user }) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  useEffect(() => {
    if (process.browser && !nda) {
      Router.replace('/');
    }
  }, [nda]);

  if (process.browser && !nda) {
    return null;
  }

  return (
    <PaymentFormImpl user={user} nda={nda} />
  );
};

PaymentForm.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  const { user } = await api.getSession();

  return {
    user,
  };
};

export default PaymentForm;
