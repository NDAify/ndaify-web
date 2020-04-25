import React from 'react';

import { API } from '../../../api';
import SuccessViewImpl from '../../../components/SuccessMessage/SuccessMessage';

const SuccessView = (props) => (
  <SuccessViewImpl
  // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

SuccessView.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const api = new API(ctx);

  const [
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

export default SuccessView;
