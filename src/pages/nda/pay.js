import React, { useMemo, useEffect, useState } from 'react';
import Router from 'next/router';
import getConfig from 'next/config';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';

import { API } from '../../api';

import * as sessionStorage from '../../lib/sessionStorage';
import PaymentFormImpl from '../../components/PaymentForm/PaymentForm';

const { publicRuntimeConfig: { STRIPE_PUBLISHABLE_KEY } } = getConfig();

const PaymentForm = ({ user }) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const promise = loadStripe(STRIPE_PUBLISHABLE_KEY);
    setStripePromise(promise);

    return () => {
      // TODO(juliaqiuxy) Can we unload stripe here to stop it from tracking users?
    };
  }, []);

  useEffect(() => {
    if (process.browser && !nda) {
      Router.replace('/');
    }
  }, [nda]);

  if (process.browser && !nda) {
    return null;
  }

  return (
    <Elements stripe={stripePromise} options={{ locale: 'auto' }}>
      <PaymentFormImpl user={user} nda={nda} />
    </Elements>
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
