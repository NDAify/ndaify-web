import React, { useMemo, useState, useEffect } from 'react';

import NDAComposer from '../components/NDA/NDAComposer';
import { API } from '../api';
import { Router } from '../routes';
import * as sessionStorage from '../lib/sessionStorage';

const NDAComposerPage = (props) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);
  // `nda` is in session storge, it's not available server side
  if (process.browser && !nda) {
    // TODO(juliaqiuxy) I don't think we can call Router.[methods] in the render
    // function Check a better way of doing this
    Router.replaceRoute('/');
    return null;
  }

  return (
    <NDAComposer
      user={props.user}
      nda={nda}
    />
  );
};

// See https://fb.me/react-uselayouteffect-ssr
const LazyNDAComposerPage = (props) => {
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

  return <NDAComposerPage {...props} />;
};

LazyNDAComposerPage.getInitialProps = async (ctx) => {
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

export default LazyNDAComposerPage;
