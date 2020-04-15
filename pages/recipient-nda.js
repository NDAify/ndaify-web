import React from 'react';

import { API } from '../api';
import RecipientNDA from '../components/NDA/RecipientNDA';

const RecipientNDAPage = props => (
  <RecipientNDA {...props} />
);

RecipientNDAPage.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const api = new API(ctx);

  let nda;
  try {
    ({ nda } = await api.getNdaPreview(ndaId));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info(error);
  }

  return {
    nda,
    user,
  };
};

export default RecipientNDAPage;
