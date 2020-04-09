import React, { useMemo, useState, useEffect } from 'react';
import { Router } from '../routes';

import * as sessionStorage from '../lib/sessionStorage';
import SenderForm from '../components/SenderForm/SenderForm';

const Form = () => {
  const ndaMetadata = useMemo(() => sessionStorage.getItem('ndaMetadata'), []);
  // because ndaMetadata is in session storge, it's not available server side
  if (!ndaMetadata && process.browser) {
    Router.replaceRoute('/');
  }

  return (
    <SenderForm ndaMetadata={ndaMetadata} />
  );
};

// See https://fb.me/react-uselayouteffect-ssr
const LazyForm = (props) => {
  const [shouldRender, setRender] = useState(false);

  // Wait until after client-side hydration so that we have access to session
  // storage for recipient data
  useEffect(() => {
    setRender(true);
  }, []);

  if (!shouldRender) {
    // TODO(juliaqiuxy) put a spinner here
    return null;
  }

  return <Form {...props} />;
};


export default LazyForm;
