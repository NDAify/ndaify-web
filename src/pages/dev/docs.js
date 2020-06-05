import React from 'react';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import NdaifyService from '../../services/NdaifyService';
import enhanceOpenApiSpec from '../../utils/enhanceOpenApiSpec';

import ApiDocsImpl from '../../components/ApiDocs/ApiDocs';

import loggerClient from '../../db/loggerClient';

const ApiDocs = ({ user, openApiSpec }) => (
  <>
    <PageTitle prepend="API Docs – " />
    <PageDescription />
    <ApiDocsImpl user={user} openApiSpec={openApiSpec} />
  </>
);

// Docs only support dark theme for now
ApiDocs.themeOverride = 'dark';
// Docs only support en-US locale for now
ApiDocs.localeOverride = 'en-US';

ApiDocs.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  let user;
  try {
    ({ user } = await ndaifyService.tryGetSession());
  } catch (error) {
    loggerClient.warn(error);
  }

  const openApiSpec = await ndaifyService.getOpenApiSpec();

  return {
    user,
    openApiSpec: enhanceOpenApiSpec(openApiSpec),
  };
};

export default ApiDocs;
