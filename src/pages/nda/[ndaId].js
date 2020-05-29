import React from 'react';

import NdaifyService from '../../services/NdaifyService';
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

  const ndaifyService = new NdaifyService({ ctx });

  let user;
  try {
    ({ user } = await ndaifyService.tryGetSession());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  let nda;
  if (user) {
    ({ nda } = await ndaifyService.getNda(ndaId));
  } else {
    ({ nda } = await ndaifyService.getNdaPreview(ndaId));
  }

  const {
    owner, repo, ref, path,
  } = getTemplateIdParts(nda.metadata.ndaTemplateId);
  const { ndaTemplate } = await ndaifyService.getNdaTemplate(owner, repo, ref, path);

  return {
    ndaTemplate,
    nda,
    user,
  };
};

export default NDA;
