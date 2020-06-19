import React from 'react';
import { useRouter } from 'next/router';
import { queryCache } from 'react-query';

import NdaifyService from '../services/NdaifyService';

import { PageTitle, PageDescription } from '../components/Head/Head';
import IndexImpl from '../components/Home/Home';

import loggerClient from '../db/loggerClient';

const Index = ({ user, ndaStatistics }) => {
  const router = useRouter();
  const refSource = router.query.ref;

  return (
    <>
      <PageTitle append=" — Send and Receive Nondisclosure Agreements" />
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
  const ndaifyService = new NdaifyService({ ctx, queryCache });

  let user;
  try {
    ({ user } = await ndaifyService.tryGetSession());
  } catch (error) {
    loggerClient.warn(error);
  }

  const [utcToday] = new Date().toISOString().split('T');
  let ndaStatistics = NDA_STATS_CACHE[utcToday];
  if (!ndaStatistics) {
    ({ ndaStatistics } = await ndaifyService.getNdaStatistics());
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
