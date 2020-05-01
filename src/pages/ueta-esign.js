import React from 'react';

import { PageTitle, PageDescription } from '../components/Head/Head';
import UETAESignImpl from '../components/LegalPolicy/LegalPolicy';

const UETAESign = () => (
  <>
    <PageTitle prepend="UETA and ESIGN Act – " />
    <PageDescription />
    <UETAESignImpl title="UETA and ESIGN Act" />
  </>
);

export default UETAESign;
