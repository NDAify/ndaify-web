import React from 'react';

import { API } from '../api';

import HomeImpl from '../components/Home/Home';

const Home = ({ user }) => (
  <HomeImpl user={user} />
);

Home.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info(error);
  }

  return {
    user,
  };
};

export default Home;
