import React from 'react';

import { PageTitle, PageDescription } from '../components/Head/Head';
import TermsImpl from '../components/LegalPolicy/LegalPolicy';

const Terms = () => (
  <>
    <PageTitle prepend="Terms of Use – " />
    <PageDescription />
    <TermsImpl title="Terms of Use" />
  </>
);

export default Terms;
