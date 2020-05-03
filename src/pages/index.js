import React from 'react';
import { useRouter } from 'next/router';

import { API } from '../api';

import { PageTitle, PageDescription } from '../components/Head/Head';
import IndexImpl from '../components/Home/Home';

const Index = ({ user, ndaStatistics }) => {
  const router = useRouter();
  const refSource = router.query.ref;

  return (
    <>
      <PageTitle />
      <PageDescription />
      <IndexImpl
        user={user}
        ndaStatistics={ndaStatistics}
        refSource={refSource}
      />
    </>
  );
};

// This is shared across all users, never store user specific stats in this
// cache
let NDA_STATS_CACHE = {};

Index.getInitialProps = async (ctx) => {
  const api = new API(ctx);

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  const [utcToday] = new Date().toISOString().split('T');
  let ndaStatistics = NDA_STATS_CACHE[utcToday];
  if (!ndaStatistics) {
    ({ ndaStatistics } = await api.getNdaStatistics());
    NDA_STATS_CACHE = {
      [utcToday]: ndaStatistics,
    };
  }

  return {
    user,
    ndaStatistics,
  };
};

export default Index;
