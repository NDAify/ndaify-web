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
    ({ user } = await NdaifyService.withCache(
      ['session'],
      (queryKey, data) => ({ user: data }),
      () => ndaifyService.tryGetSession(),
    ));
  } catch (error) {
    loggerClient.warn(error);
  }

  let apiToken = 'yourSecret';

  const [
    { apiKeys },
    openApiSpec,
  ] = await Promise.all([
    // `docs` hyperlings are usually a _blank target so use of query cache isn't
    // as important here
    user ? ndaifyService.getApiKeys() : Promise.resolve({ apiKeys: [] }),
    ndaifyService.getOpenApiSpec(),
  ]);

  if (apiKeys.length > 0) {
    const [firstApiKey] = apiKeys;
    apiToken = firstApiKey.secret;
  }

  const enhancedOpenApiSpec = enhanceOpenApiSpec(openApiSpec, {
    apiToken,
  });

  // hide `sessionToken` from docs
  delete enhancedOpenApiSpec.components.securitySchemes.sessionToken;

  return {
    user,
    openApiSpec: enhancedOpenApiSpec,
  };
};

export default ApiDocs;
