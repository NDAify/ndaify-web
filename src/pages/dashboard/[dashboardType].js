import React from 'react';

import { API } from '../../api';

import DashboardImpl from '../../components/Dashboard/Dashboard';

const Dashboard = ({ user, ndas, dashboardType }) => (
  <DashboardImpl dashboardType={dashboardType} user={user} ndas={ndas} />
);

Dashboard.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  const { dashboardType } = ctx.query;

  if (dashboardType !== 'incoming' && dashboardType !== 'outgoing') {
    throw new Error('Invalid dashboard type');
  }

  const [
    { user },
    { ndas },
  ] = await Promise.all([
    api.getSession(),
    api.getNdas(),
  ]);

  return {
    user,
    ndas,
    dashboardType,
  };
};

export default Dashboard;
