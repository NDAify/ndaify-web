import React, { useMemo, useEffect } from 'react';

import NDAComposer from '../components/NDA/NDAComposer';
import { API } from '../api';
import { Router } from '../routes';
import * as sessionStorage from '../lib/sessionStorage';

import { toQueryString } from '../util';

const NDAComposerPage = (props) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  const senderEmail = props.user.metadata.linkedInProfile.emailAddress;
  const recipientIsSelf = nda?.recipientEmail === senderEmail;

  useEffect(() => {
    if (!nda) {
      Router.replaceRoute('/');
      return;
    }

    if (recipientIsSelf) {
      const qs = toQueryString({
        errorMessage: 'You can not send an NDA to yourself',
      });

      Router.replaceRoute(`/nda/new?${qs}`);
      // let me return for god's sake
      // eslint-disable-next-line no-useless-return
      return;
    }
  }, [nda, recipientIsSelf]);

  if (!nda || recipientIsSelf) {
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
