import React, { useMemo, useEffect } from 'react';
import { Router } from '../routes';

import * as sessionStorage from '../lib/sessionStorage';
import SenderForm from '../components/SenderForm/SenderForm';

const Form = () => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  useEffect(() => {
    if (!nda) {
      Router.replaceRoute('/');
    }
  }, [nda]);

  if (!nda) {
    return null;
  }

  return (
    <SenderForm nda={nda} />
  );
};

export default Form;
