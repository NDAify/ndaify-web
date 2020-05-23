import React from 'react';
import ApiKeysImpl from '../../components/ApiKeys/ApiKeys';

import { API } from '../../api';

import { PageTitle, PageDescription } from '../../components/Head/Head';

const ApiKeys = ({ user }) => (
  <>
    <PageTitle prepend="API Keys – " />
    <PageDescription />
    <ApiKeysImpl user={user} />
  </>
);

ApiKeys.getInitialProps = async (ctx) => {
  const api = new API({ ctx });

  const [
    { user },
    // { apiKeys },
  ] = await Promise.all([
    api.getSession(),
    // api.getApiKeys(),
  ]);

  return {
    user,
    // apiKeys
  };
};

export default ApiKeys;
