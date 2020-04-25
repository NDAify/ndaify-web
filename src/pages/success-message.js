import React from 'react';

import { API } from '../api';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';

const SuccessMessagePage = (props) => (
  <SuccessMessage
  // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

SuccessMessagePage.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const api = new API(ctx);

  let [
    { user },
    { nda },
  ] = await Promise.all([
    api.getSession(),
    api.getNda(ndaId),
  ]);

  return {
    user,
    nda,
  };
};

export default SuccessMessagePage;
