import React from 'react';

import { API } from '../api';
import RecipientNDA from '../components/NDA/RecipientNDA';

const NDAPage = props => (
  <RecipientNDA {...props} />
);

NDAPage.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const api = new API(ctx);

  let nda;
  let user;
  try {
    ({ nda } = await api.getNda(ndaId));
    ({ user } = await api.getSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    nda,
    user,
  };
};

export default NDAPage;
