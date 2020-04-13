import React, { useMemo, useState, useEffect } from 'react';

import SenderNDA from '../components/NDA/SenderNDA';
import { API } from '../api';
import { Router } from '../routes';
import * as sessionStorage from '../lib/sessionStorage';

const SenderNDAPage = (props) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);
  // `nda` is in session storge, it's not available server side
  if (process.browser && !nda) {
    Router.replaceRoute('/');
  }

  return (
    <SenderNDA
      user={props.user}
      nda={nda}
    />
  );
};

// See https://fb.me/react-uselayouteffect-ssr
const LazySenderNDAPage = (props) => {
  const [renderNda, setRenderNda] = useState(false);

  // Wait until after client-side hydration so that we have access to session
  // storage for recipient data
  useEffect(() => {
    setRenderNda(true);
  }, []);

  if (!renderNda) {
    // TODO(juliaqiuxy) put a spinner here
    return null;
  }

  return <SenderNDAPage {...props} />;
};

LazySenderNDAPage.getInitialProps = async (ctx) => {
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

export default LazySenderNDAPage;
