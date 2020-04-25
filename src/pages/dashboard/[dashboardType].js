import React from 'react';

import { API } from '../../api';

import Dashboard from '../../components/Dashboard/Dashboard';

const DashBoardPage = ({ user, ndas, dashboardType }) => (
  <Dashboard dashboardType={dashboardType} user={user} ndas={ndas} />
);

DashBoardPage.getInitialProps = async (ctx) => {
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

export default DashBoardPage;
