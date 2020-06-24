import React from 'react';

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
    enabled: !isPreview,
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

  const ndaifyService = new NdaifyService({ ctx });

  let user;
  try {
    ({ user } = await NdaifyService.withCache(
      ['session'],
      (queryKey, data) => ({ user: data }),
      () => ndaifyService.tryGetSession(),
    ));
  } catch (error) {
    loggerClient.warn(error);
  }

  let nda;
  if (user) {
    ({ nda } = await NdaifyService.withCache(
      ['nda', ndaId],
      (queryKey, data) => ({ nda: data }),
      () => ndaifyService.getNda(ndaId),
    ));
  } else {
    ({ nda } = await NdaifyService.withCache(
      ['nda', ndaId],
      (queryKey, data) => ({ nda: data }),
      () => ndaifyService.getNdaPreview(ndaId),
    ));
  }

  const { ndaTemplate } = await NdaifyService.withCache(
    ['ndaTemplate', nda.metadata.ndaTemplateId],
    (queryKey, data) => ({ ndaTemplate: data }),
    () => ndaifyService.getNdaTemplate(nda.metadata.ndaTemplateId),
  );

  return {
    ndaTemplate,
    nda,
    user,
  };
};

export default NDA;
