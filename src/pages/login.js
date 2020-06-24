import React from 'react';

import NdaifyService from '../services/NdaifyService';

import { PageTitle, PageDescription } from '../components/Head/Head';
import LogInImpl from '../components/LogIn/LogIn';

import loggerClient from '../db/loggerClient';

const LogIn = (props) => (
  <>
    <PageTitle prepend="Log In – " />
    <PageDescription />
    <LogInImpl user={props.user} />
  </>
);

LogIn.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  let user;
  try {
    // Do not use the query cache for session in `login`
    ({ user } = await ndaifyService.tryGetSession());
  } catch (error) {
    loggerClient.warn(error);
  }

  return {
    user,
  };
};

export default LogIn;
