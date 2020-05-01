import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import NDAComposerImpl from '../../components/NDA/NDAComposer';
import { API } from '../../api';
import * as sessionStorage from '../../lib/sessionStorage';

import { toQueryString } from '../../util';

const NDAComposer = (props) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  const senderEmail = props.user.metadata.linkedInProfile.emailAddress;
  const recipientIsSelf = nda?.recipientEmail === senderEmail;

  useEffect(() => {
    if (!nda) {
      Router.replace('/');
      return;
    }

    if (recipientIsSelf) {
      const qs = toQueryString({
        errorMessage: 'You can not send an NDA to yourself',
      });

      Router.replace(`/nda/new?${qs}`);
      // let me return for god's sake
      // eslint-disable-next-line no-useless-return
      return;
    }
  }, [nda, recipientIsSelf]);

  if (!nda || recipientIsSelf) {
    return null;
  }

  return (

    <>
      <PageTitle prepend="Compose – " />
      <PageDescription />
      <NDAComposerImpl
        user={props.user}
        nda={nda}
      />
    </>
  );
};

NDAComposer.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  const { user } = await api.getSession();

  return {
    user,
  };
};

export default NDAComposer;
