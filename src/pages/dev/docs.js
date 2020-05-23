import React from 'react';
import ApiDocsImpl from '../../components/ApiDocs/ApiDocs';

import { API } from '../../api';

import { PageTitle, PageDescription } from '../../components/Head/Head';

const ApiDocs = ({ user }) => (
  <>
    <PageTitle prepend="API Docs – " />
    <PageDescription />
    <ApiDocsImpl user={user} />
  </>
);

// Docs only support dark theme for now
ApiDocs.themeOverride = 'dark';

ApiDocs.getInitialProps = async (ctx) => {
  const api = new API({ ctx });

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  return {
    user,
  };
};

export default ApiDocs;
