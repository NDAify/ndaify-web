import React from 'react';

import NdaifyService from '../../services/NdaifyService';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import DashboardImpl from '../../components/Dashboard/Dashboard';

const Dashboard = ({ user, ndas, dashboardType }) => (
  <>
    <PageTitle prepend="Dashboard – " />
    <PageDescription />
    <DashboardImpl dashboardType={dashboardType} user={user} ndas={ndas} />
  </>
);

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
