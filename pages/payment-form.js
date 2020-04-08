import React, { useMemo } from 'react';
import { Router } from '../routes';

import * as sessionStorage from '../lib/sessionStorage';
import PaymentForm from '../components/PaymentForm/PaymentForm';

const PaymentFormPage = () => {
  const ndaMetadata = useMemo(() => sessionStorage.getItem('ndaMetadata'), []);
  // `ndaMetadata` is in session storge, it's not available server side
  if (process.browser && !ndaMetadata) {
    Router.replace('/');
  }

  return (
    <PaymentForm />
  );
};

export default PaymentFormPage;
