import React, { useMemo } from 'react';
import { Router } from '../routes';

import * as sessionStorage from '../lib/sessionStorage';
import SenderForm from '../components/SenderForm/SenderForm';

const Form = () => {
  const ndaMetadata = useMemo(() => sessionStorage.getItem('ndaMetadata'), []);
  // because ndaMetadata is in session storge, it's not available server side
  if (!ndaMetadata && process.browser) {
    Router.replace('/');
  }

  return (
    <SenderForm ndaMetadata={ndaMetadata} />
  );
};

export default Form;
