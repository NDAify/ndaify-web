import React from 'react';

import { API } from '../api';

import HomeImpl from '../components/Home/Home';

const Home = props => (
  <HomeImpl user={props.user} />
);

Home.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  try {
    // ({ user } = await api.getSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    user,
  };
};

export default Home;
