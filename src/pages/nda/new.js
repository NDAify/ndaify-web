import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';

import { API } from '../../api';

import * as sessionStorage from '../../lib/sessionStorage';
import SenderForm from '../../components/SenderForm/SenderForm';

const Form = ({ user }) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  useEffect(() => {
    if (!nda) {
      Router.replace('/');
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

  const { user } = await api.tryGetSession();
  
  return {
    user,
  };
};

export default Form;
