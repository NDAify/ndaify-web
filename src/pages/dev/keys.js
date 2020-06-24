import React from 'react';

import ApiKeysImpl from '../../components/ApiKeys/ApiKeys';

import NdaifyService from '../../services/NdaifyService';

import { PageTitle, PageDescription } from '../../components/Head/Head';

import useSessionQuery from '../../queries/useSessionQuery';
import useApiKeysQuery from '../../queries/useApiKeysQuery';

const ApiKeys = (props) => {
  const [, user] = useSessionQuery({
    initialData: props.user,
  });
  const [, apiKeys] = useApiKeysQuery({
    initialData: props.apiKeys,
  });

  return (
    <>
      <PageTitle prepend="API Keys – " />
      <PageDescription />
      <ApiKeysImpl user={user} apiKeys={apiKeys} />
    </>
  );
};

ApiKeys.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  const [
    { user },
    { apiKeys },
  ] = await Promise.all([
    NdaifyService.withCache(
      ['session'],
      (queryKey, data) => ({ user: data }),
      () => ndaifyService.getSession(),
    ),
    NdaifyService.withCache(
      ['apiKeys'],
      (queryKey, data) => ({ apiKeys: data }),
      () => ndaifyService.getApiKeys(),
    ),
  ]);

  return {
    user,
    apiKeys,
  };
};

export default ApiKeys;
