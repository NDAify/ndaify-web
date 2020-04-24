import React, { useMemo, useEffect } from 'react';
import { Router } from '../routes';

import { API } from '../api';

import * as sessionStorage from '../lib/sessionStorage';
import SenderForm from '../components/SenderForm/SenderForm';

const Form = ({ user }) => {
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
    <SenderForm user={user} nda={nda} />
  );
};

Form.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info(error);
  }

  return {
    user,
  };
};

export default Form;
