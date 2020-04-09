import React from 'react';

import { API } from '../api';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';

const SuccessMessagePage = props => (<SuccessMessage {...props} />);

SuccessMessagePage.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const api = new API(ctx);

  let nda;
  try {
    ({ nda } = await api.getNda(ndaId));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    nda,
  };
};

export default SuccessMessagePage;
