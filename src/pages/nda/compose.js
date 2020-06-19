import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';
import { queryCache } from 'react-query';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import NDAComposerImpl from '../../components/NDA/NDAComposer';
import NdaifyService from '../../services/NdaifyService';
import * as sessionStorage from '../../lib/sessionStorage';

import { toQueryString, scrollToTop } from '../../util';

import useNdaTemplateQuery from '../../queries/useNdaTemplateQuery';

const NDAComposer = (props) => {
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  const [, ndaTemplate] = useNdaTemplateQuery(
    nda?.metadata?.ndaTemplateId,
  );

  const senderEmail = props.user.metadata.linkedInProfile.emailAddress;
  const recipientIsSelf = nda?.recipientEmail === senderEmail;

  useEffect(() => {
    if (!nda) {
      Router.replace('/').then(scrollToTop);
      return;
    }

    if (recipientIsSelf) {
      const qs = toQueryString({
        errorMessage: 'You can not send an NDA to yourself',
      });

      Router.replace(`/nda/new?${qs}`).then(scrollToTop);
      // let me return for god's sake
      // eslint-disable-next-line no-useless-return
      return;
    }
  }, [nda, recipientIsSelf]);

  // TODO show a spinner fetching of ndaTemplate is taking too long
  if (!nda || !ndaTemplate || recipientIsSelf) {
    return null;
  }

  return (
    <>
      <PageTitle prepend="Compose – " />
      <PageDescription />
      <NDAComposerImpl
        user={props.user}
        ndaTemplate={ndaTemplate}
        nda={nda}
      />
    </>
  );
};

NDAComposer.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx, queryCache });

  const { user } = await ndaifyService.getSession();

  return {
    user,
  };
};

export default NDAComposer;
