import React from 'react';

import NdaifyService from '../../services/NdaifyService';

import loggerClient from '../../db/loggerClient';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import SampleNdaImpl from '../../components/SampleNda/SampleNda';

import useNdaTemplateQuery from '../../queries/useNdaTemplateQuery';
import useSessionQuery from '../../queries/useSessionQuery';

const Sample = (props) => {
  const isAuthenticated = !!props.user;

  const [, user] = useSessionQuery({
    initialData: props.user,
    // disable session query if user is not authenticated
    enabled: isAuthenticated,
  });

  const [, ndaTemplate] = useNdaTemplateQuery(
    props.ndaTemplate.ndaTemplateId,
    {
      initialData: props.ndaTemplate,
    },
  );

  return (
    <>
      <PageTitle prepend={`Sample ${ndaTemplate.data.title} Template – `} />
      <PageDescription
        description={ndaTemplate.data.description}
      />

      <SampleNdaImpl ndaTemplate={ndaTemplate} user={user} />
    </>
  );
};

Sample.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  const ndaTemplateId = ctx.query.slug.join('/');

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

  const { ndaTemplate } = await NdaifyService.withCache(
    ['ndaTemplate', ndaTemplateId],
    (queryKey, data) => ({ ndaTemplate: data }),
    () => ndaifyService.getNdaTemplate(ndaTemplateId),
  );

  return {
    user,
    ndaTemplate,
  };
};

export default Sample;
