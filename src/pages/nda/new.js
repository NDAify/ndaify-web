import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';

import { API } from '../../api';

import * as sessionStorage from '../../lib/sessionStorage';
import SenderFormImpl from '../../components/SenderForm/SenderForm';

const SenderForm = ({ user }) => {
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
    <SenderFormImpl user={user} nda={nda} />
  );
};

SenderForm.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  const { user } = await api.tryGetSession();

  return {
    user,
  };
};

export default SenderForm;
