import React, { useEffect } from 'react';
import { queryCache } from 'react-query';

import NdaifyService from '../../services/NdaifyService';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import DashboardImpl from '../../components/Dashboard/Dashboard';

import useSessionQuery from '../../queries/useSessionQuery';
import useNdasQuery from '../../queries/useNdasQuery';

const Dashboard = (props) => {
  const [, user] = useSessionQuery({
    initialData: props.user,
  });
  const [, ndas] = useNdasQuery({
    initialData: props.ndas,
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
      <DashboardImpl dashboardType={props.dashboardType} user={user} ndas={ndas} />
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
  ]);

  return {
    user,
    ndas,
    dashboardType,
  };
};

export default Dashboard;
