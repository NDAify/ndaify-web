import React from 'react';

import NdaifyService from '../../../services/NdaifyService';
import { PageTitle, PageDescription } from '../../../components/Head/Head';
import SuccessViewImpl from '../../../components/SuccessMessage/SuccessMessage';

const SuccessView = (props) => (
  <>
    <PageTitle />
    <PageDescription />
    <SuccessViewImpl
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </>
);

SuccessView.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  const ndaifyService = new NdaifyService({ ctx });

  const [
    { user },
    { nda },
  ] = await Promise.all([
    NdaifyService.withCache(
      ['session'],
      (queryKey, data) => ({ user: data }),
      () => ndaifyService.getSession(),
    ),
    NdaifyService.withCache(
      ['nda', ndaId],
      (queryKey, data) => ({ nda: data }),
      () => ndaifyService.getNdas(ndaId),
    ),
  ]);

  return {
    user,
    nda,
  };
};

export default SuccessView;
