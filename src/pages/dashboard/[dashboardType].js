import React, { useEffect } from 'react';
import { queryCache } from 'react-query';

import NdaifyService from '../../services/NdaifyService';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import DashboardImpl from '../../components/Dashboard/Dashboard';

import useSessionQuery from '../../queries/useSessionQuery';
import useNdasQuery from '../../queries/useNdasQuery';
import useNdaTemplateOptionsQuery from '../../queries/useNdaTemplateOptionsQuery';

const Dashboard = (props) => {
  const [, user] = useSessionQuery({
    initialData: props.user,
  });
  const [, ndas] = useNdasQuery({
    initialData: props.ndas,
  });
  const [, ndaTemplateOptions] = useNdaTemplateOptionsQuery({
    initialData: props.ndaTemplateOptions,
  });

  useEffect(() => {
    // prime the cache for ['nda', ndaId] queries
    if (ndas) {
      ndas.forEach((nda) => {
        queryCache.setQueryData(['nda', nda.ndaId], nda);
      });
    }
  }, [ndas]);

  return (
    <>
      <PageTitle prepend="Dashboard – " />
      <PageDescription />
      <DashboardImpl
        dashboardType={props.dashboardType}
        user={user}
        ndas={ndas}
        ndaTemplateOptions={ndaTemplateOptions}
      />
    </>
  );
};

Dashboard.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  const { dashboardType } = ctx.query;

  if (dashboardType !== 'incoming' && dashboardType !== 'outgoing') {
    throw new Error('Invalid dashboard type');
  }

  const [
    { user },
    { ndas },
    { ndaTemplateOptions },
  ] = await Promise.all([
    NdaifyService.withCache(
      ['session'],
      (queryKey, data) => ({ user: data }),
      () => ndaifyService.getSession(),
    ),
    NdaifyService.withCache(
      ['ndas'],
      (queryKey, data) => ({ ndas: data }),
      () => ndaifyService.getNdas(),
    ),
    NdaifyService.withCache(
      ['ndasTemplateOptions'],
      (queryKey, data) => ({ ndaTemplateOptions: data }),
      () => ndaifyService.getNdaTemplateOptions(),
    ),
  ]);

  return {
    user,
    ndas,
    ndaTemplateOptions,
    dashboardType,
  };
};

export default Dashboard;
