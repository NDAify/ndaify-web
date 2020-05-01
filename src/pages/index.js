import React from 'react';

import { API } from '../api';

import { PageTitle, PageDescription } from '../components/Head/Head';
import IndexImpl from '../components/Home/Home';

const Index = ({ user }) => (
  <>
    <PageTitle />
    <PageDescription />
    <IndexImpl user={user} />
  </>
);

Index.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  return {
    user,
  };
};

export default Index;
