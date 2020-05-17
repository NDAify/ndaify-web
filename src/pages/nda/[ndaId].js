import React from 'react';

import { API } from '../../api';
import { PageTitle, PageDescription } from '../../components/Head/Head';
import NDAImpl from '../../components/NDA/NDA';

import getTemplateIdParts from '../../utils/getTemplateIdParts';

const NDA = (props) => (
  <>
    <PageTitle />
    <PageDescription />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <NDAImpl {...props} />
  </>
);

NDA.getInitialProps = async (ctx) => {
  const { ndaId } = ctx.query;

  if (!ndaId) {
    throw new Error('Missing NDA ID');
  }

  const api = new API({ ctx });

  let user;
  try {
    ({ user } = await api.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  let nda;
  if (user) {
    ({ nda } = await api.getNda(ndaId));
  } else {
    ({ nda } = await api.getNdaPreview(ndaId));
  }

  const { owner, repo, ref, path } = getTemplateIdParts(nda.metadata.ndaTemplateId);
  const { ndaTemplate } = await api.getNdaTemplate(owner, repo, ref, path);

  return {
    ndaTemplate,
    nda,
    user,
  };
};

export default NDA;
