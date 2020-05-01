import React from 'react';

import { PageTitle, PageDescription } from '../components/Head/Head';
import PrivacyImpl from '../components/LegalPolicy/LegalPolicy';

const Privacy = () => (
  <>
    <PageTitle prepend="Privacy Policy – " />
    <PageDescription />
    <PrivacyImpl title="Privacy Policy" />
  </>
);

export default Privacy;
