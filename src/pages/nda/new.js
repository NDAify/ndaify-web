import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';

import NdaifyService from '../../services/NdaifyService';

import * as sessionStorage from '../../lib/sessionStorage';
import { PageTitle, PageDescription } from '../../components/Head/Head';
import SenderFormImpl from '../../components/SenderForm/SenderForm';

import loggerClient from '../../db/loggerClient';

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
  const ndaifyService = new NdaifyService({ ctx });

  let user;
  try {
    ({ user } = await ndaifyService.tryGetSession());
  } catch (error) {
    loggerClient.warn(error);
  }

  return {
    user,
  };
};

export default SenderForm;
