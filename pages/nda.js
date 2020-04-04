import React, { useMemo } from 'react';

import SenderNDA from '../components/SenderNDA/SenderNDA';
import { API } from '../api';
import { Router } from '../routes';
import * as sessionStorage from '../lib/sessionStorage';

const SenderNDAPage = (props) => {
  const ndaMetadata = useMemo(() => sessionStorage.getItem('nda metadata'), []);
  // because ndaMetadata is in session storge, it's not available server side
  if (!ndaMetadata && process.browser) {
    Router.replace('/');
  }

  return (
    <SenderNDA
      user={props.user}
      ndaMetadata={ndaMetadata}
    />
  );
};

SenderNDAPage.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  try {
    ({ user } = await api.getSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    user,
  };
};

export default SenderNDAPage;
