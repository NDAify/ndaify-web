import React, { useMemo } from 'react';
import { Router } from '../routes';

import * as sessionStorage from '../lib/sessionStorage';
import PaymentForm from '../components/PaymentForm/PaymentForm';

const PaymentFormPage = () => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);
  // `nda` is in session storge, it's not available server side
  if (process.browser && !nda) {
    Router.replaceRoute('/');
  }

  return (
    <PaymentForm nda={nda} />
  );
};

export default PaymentFormPage;
