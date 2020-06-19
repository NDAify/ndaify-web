import React from 'react';
import { queryCache } from 'react-query';

import NdaifyService from '../../services/NdaifyService';
import { PageTitle, PageDescription } from '../../components/Head/Head';
import NDAImpl from '../../components/NDA/NDA';

import loggerClient from '../../db/loggerClient';

import useSessionQuery from '../../queries/useSessionQuery';
import useNdaQuery from '../../queries/useNdaQuery';
import useNdaTemplateQuery from '../../queries/useNdaTemplateQuery';

const NDA = (props) => {
  const isPreview = !props.user;
  const [, nda] = useNdaQuery(props.nda.ndaId, isPreview, {
    initialData: props.nda,
  });
  const [, ndaTemplate] = useNdaTemplateQuery(
    props.nda.metadata.ndaTemplateId,
    {
      initialData: props.ndaTemplate,
    },
  );

  const [, user] = useSessionQuery({
    initialData: props.user,
    // disable session query if user is not authenticated
    manual: isPreview,
  });

  return (
    <>
      <PageTitle />
      <PageDescription />
      <NDAImpl
        ndaTemplate={ndaTemplate}
        nda={nda}
        user={user}
      />
    </>
  );
};

NDA.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  if (!ndaId) {
    throw new Error('Missing NDA ID');
  }

  const ndaifyService = new NdaifyService({ ctx, queryCache });

  let user;
  try {
    ({ user } = await ndaifyService.tryGetSession());
  } catch (error) {
    loggerClient.warn(error);
  }

  let nda;
  if (user) {
    ({ nda } = await ndaifyService.getNda(ndaId));
  } else {
    ({ nda } = await ndaifyService.getNdaPreview(ndaId));
  }

  const { ndaTemplate } = await ndaifyService.getNdaTemplate(nda.metadata.ndaTemplateId);

  return {
    ndaTemplate,
    nda,
    user,
  };
};

export default NDA;
