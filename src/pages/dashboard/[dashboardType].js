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

  return (
    <>
      <PageTitle prepend="Dashboard – " />
      <PageDescription />
      <DashboardImpl dashboardType={props.dashboardType} user={user} ndas={ndas} />
    </>
  );
};

Dashboard.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx, queryCache });

  const { dashboardType } = ctx.query;

  if (dashboardType !== 'incoming' && dashboardType !== 'outgoing') {
    throw new Error('Invalid dashboard type');
  }

  const [
    { user },
    { ndas },
  ] = await Promise.all([
    ndaifyService.getSession(),
    ndaifyService.getNdas(),
  ]);

  return {
    user,
    ndas,
    dashboardType,
  };
};

export default Dashboard;
