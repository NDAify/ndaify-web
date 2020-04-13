import React from 'react';

import { API } from '../api';

import Dashboard from '../components/Dashboard/Dashboard';

const DashBoardPage = ({ user, ndas }) => (
  <Dashboard user={user} ndas={ndas} />
);

DashBoardPage.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  let ndas;
  try {
    ([
      { user },
      { ndas },
    ] = await Promise.all([
      api.getSession(),
      api.getNdas(),
    ]));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info(error);
  }

  return {
    user,
    ndas,
  };
};

export default DashBoardPage;
