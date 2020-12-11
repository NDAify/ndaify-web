import React from 'react';

import AuthenticatorsImpl from '../../components/Authenticators/Authenticators';

import NdaifyService from '../../services/NdaifyService';

import { PageTitle, PageDescription } from '../../components/Head/Head';

import useSessionQuery from '../../queries/useSessionQuery';
import useAuthenticatorsQuery from '../../queries/useAuthenticatorsQuery';

const Authenticators = (props) => {
  const [, user] = useSessionQuery({
    initialData: props.user,
  });
  const [, authenticators] = useAuthenticatorsQuery({
    initialData: props.authenticators,
  });

  return (
    <>
      <PageTitle prepend="Authenticators – " />
      <PageDescription />
      <AuthenticatorsImpl user={user} authenticators={authenticators} />
    </>
  );
};

Authenticators.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  const [
    { user },
    { authenticators },
  ] = await Promise.all([
    NdaifyService.withCache(
      ['session'],
      (queryKey, data) => ({ user: data }),
      () => ndaifyService.getSession(),
    ),
    NdaifyService.withCache(
      ['authenticators'],
      (queryKey, data) => ({ authenticators: data }),
      () => ndaifyService.getAuthenticators(),
    ),
  ]);

  return {
    user,
    authenticators,
  };
};

export default Authenticators;
