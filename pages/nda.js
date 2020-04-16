import React from 'react';

import { API } from '../api';
import NDA from '../components/NDA/NDA';

const NDAPage = props => (
  <NDA {...props} />
);

NDAPage.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const api = new API(ctx);

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info(error);
  }

  let nda;
  try {
    if (user) {
      ({ nda } = await api.getNda(ndaId));
    } else {
      ({ nda } = await api.getNdaPreview(ndaId));
    }
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
