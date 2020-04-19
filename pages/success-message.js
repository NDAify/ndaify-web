import React from 'react';

import { API } from '../api';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';

const SuccessMessagePage = (props) => (<SuccessMessage {...props} />);

SuccessMessagePage.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const api = new API(ctx);

  let user;
  let nda;
  try {
    ([
      { user },
      { nda },
    ] = await Promise.all([
      api.getSession(),
      api.getNda(ndaId),
    ]));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    user,
    nda,
  };
};

export default SuccessMessagePage;
