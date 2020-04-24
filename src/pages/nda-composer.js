import React, { useMemo, useEffect } from 'react';

import NDAComposer from '../components/NDA/NDAComposer';
import { API } from '../api';
import { Router } from '../routes';
import * as sessionStorage from '../lib/sessionStorage';

const NDAComposerPage = (props) => {
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
    <NDAComposer
      user={props.user}
      nda={nda}
    />
  );
};

NDAComposerPage.getInitialProps = async (ctx) => {
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

export default NDAComposerPage;
