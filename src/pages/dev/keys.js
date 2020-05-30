import React from 'react';
import ApiKeysImpl from '../../components/ApiKeys/ApiKeys';

import NdaifyService from '../../services/NdaifyService';

import { PageTitle, PageDescription } from '../../components/Head/Head';

const ApiKeys = ({ user, apiKeys }) => (
  <>
    <PageTitle prepend="API Keys – " />
    <PageDescription />
    <ApiKeysImpl user={user} apiKeys={apiKeys} />
  </>
);

ApiKeys.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  const [
    { user },
    { apiKeys },
  ] = await Promise.all([
    ndaifyService.getSession(),
    ndaifyService.getApiKeys(),
  ]);

  return {
    user,
    apiKeys,
  };
};

export default ApiKeys;
