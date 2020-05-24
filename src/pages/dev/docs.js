import React from 'react';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import { API } from '../../api';
import enhanceOpenApiSpec from '../../utils/enhanceOpenApiSpec';

import ApiDocsImpl from '../../components/ApiDocs/ApiDocs';

const ApiDocs = ({ user, openApiSpec }) => (
  <>
    <PageTitle prepend="API Docs – " />
    <PageDescription />
    <ApiDocsImpl user={user} openApiSpec={openApiSpec} />
  </>
);

// Docs only support dark theme for now
ApiDocs.themeOverride = 'dark';

ApiDocs.getInitialProps = async (ctx) => {
  const api = new API({ ctx });

  let user;
  let openApiSpec;
  try {
    ({ user } = await api.tryGetSession());
    (openApiSpec = await api.tryGetOpenApiSpec());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  return {
    user,
    openApiSpec: enhanceOpenApiSpec(openApiSpec),
  };
};

export default ApiDocs;
