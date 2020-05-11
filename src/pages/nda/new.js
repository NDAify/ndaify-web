import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';

import { API } from '../../api';

import * as sessionStorage from '../../lib/sessionStorage';
import { PageTitle, PageDescription } from '../../components/Head/Head';
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
    <>
      <PageTitle />
      <PageDescription />
      <SenderFormImpl user={user} nda={nda} />
    </>
  );
};

SenderForm.getInitialProps = async (ctx) => {
  const api = new API({ ctx });

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  return {
    user,
  };
};

export default SenderForm;
