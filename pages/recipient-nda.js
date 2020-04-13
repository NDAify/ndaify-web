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

  return {
    nda,
  };
};

export default RecipientNDAPage;
