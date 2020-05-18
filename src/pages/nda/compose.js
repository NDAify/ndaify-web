import React, { useMemo, useEffect, useState } from 'react';
import Router from 'next/router';

import { PageTitle, PageDescription } from '../../components/Head/Head';
import NDAComposerImpl from '../../components/NDA/NDAComposer';
import { API } from '../../api';
import * as sessionStorage from '../../lib/sessionStorage';

import { toQueryString } from '../../util';
import getTemplateIdParts from '../../utils/getTemplateIdParts';

const NDAComposer = (props) => {
  const [ndaTemplate, setNdaTemplate] = useState();
  const nda = useMemo(() => sessionStorage.getItem('nda'), []);

  const senderEmail = props.user.metadata.linkedInProfile.emailAddress;
  const recipientIsSelf = nda?.recipientEmail === senderEmail;

  useEffect(() => {
    if (!nda) {
      Router.replace('/');
      return;
    }

    if (recipientIsSelf) {
      const qs = toQueryString({
        errorMessage: 'You can not send an NDA to yourself',
      });

      Router.replace(`/nda/new?${qs}`);
      // let me return for god's sake
      // eslint-disable-next-line no-useless-return
      return;
    }

    const api = new API();

    const loadNdaTemplate = async (ndaTemplateId) => {
      const {
        owner, repo, ref, path,
      } = getTemplateIdParts(ndaTemplateId);
      const {
        ndaTemplate: ndaTpl,
      } = await api.getNdaTemplate(owner, repo, ref, path);

      setNdaTemplate(ndaTpl);
    };

    if (nda?.metadata?.ndaTemplateId) {
      loadNdaTemplate(nda.metadata.ndaTemplateId);
    }
  }, [nda, recipientIsSelf]);

  // TODO show a spinner fetching of ndaTemplate is taking too long
  if (!nda || !ndaTemplate || recipientIsSelf) {
    return null;
  }

  return (

    <>
      <PageTitle prepend="Compose – " />
      <PageDescription />
      <NDAComposerImpl
        ndaTemplate={ndaTemplate}
        user={props.user}
        nda={nda}
      />
    </>
  );
};

NDAComposer.getInitialProps = async (ctx) => {
  const api = new API({ ctx });

  const { user } = await api.getSession();

  return {
    user,
  };
};

export default NDAComposer;
