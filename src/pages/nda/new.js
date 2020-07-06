import React, { useMemo, useEffect } from 'react';
import Router from 'next/router';

import NdaifyService from '../../services/NdaifyService';

import * as sessionStorage from '../../lib/sessionStorage';
import { PageTitle, PageDescription } from '../../components/Head/Head';
import SenderFormImpl from '../../components/SenderForm/SenderForm';

import loggerClient from '../../db/loggerClient';
import { scrollToTop } from '../../util';

import useNdaTemplateOptionsQuery from '../../queries/useNdaTemplateOptionsQuery';

const SenderForm = (props) => {
  const [, ndaTemplateOptions] = useNdaTemplateOptionsQuery({
    initialData: props.ndaTemplateOptions,
  });

  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  useEffect(() => {
    if (!nda) {
      Router.replace('/').then(scrollToTop);
    }
  }, [nda]);

  if (!nda) {
    return null;
  }

  return (
    <>
      <PageTitle prepend="New Nondisclosure Agreement - " />
      <PageDescription />
      <SenderFormImpl
        user={props.user}
        nda={nda}
        ndaTemplateOptions={ndaTemplateOptions}
      />
    </>
  );
};

SenderForm.getInitialProps = async (ctx) => {
  const ndaifyService = new NdaifyService({ ctx });

  let user;
  try {
    ({ user } = await NdaifyService.withCache(
      ['session'],
      (queryKey, data) => ({ user: data }),
      () => ndaifyService.tryGetSession(),
    ));
  } catch (error) {
    loggerClient.warn(error);
  }

  const { ndaTemplateOptions } = await NdaifyService.withCache(
    ['ndasTemplateOptions'],
    (queryKey, data) => ({ ndaTemplateOptions: data }),
    () => ndaifyService.getNdaTemplateOptions(),
  );

  return {
    user,
    ndaTemplateOptions,
  };
};

export default SenderForm;
