import React, { useMemo } from 'react';
import grayMatter from 'gray-matter';
import { useIntl, defineMessage } from 'react-intl';

import { PageTitle, PageDescription } from '../components/Head/Head';
import LegalPolicyImpl from '../components/LegalPolicy/LegalPolicy';

const LEGAL_TEXT = `---
title: UETA and ESIGN Act
lastUpdatedAt: June 15, 2019
---

# HOW TO CONTACT US
If you have any questions, please contact us at [support@ndaify.com](mailto:support@ndaify.com).`;

const uetaesignText = defineMessage({
  id: 'uetaesign-legal-md',
  defaultMessage: LEGAL_TEXT,
});

const UETAESign = () => {
  const intl = useIntl();

  const legalTemplate = useMemo(
    () => grayMatter(intl.formatMessage(uetaesignText), { language: 'yaml' }),
    [intl],
  );

  return (
    <>
      <PageTitle prepend="UETA and ESIGN Act – " />
      <PageDescription />

      <LegalPolicyImpl legalTemplate={legalTemplate} />
    </>
  );
};

export default UETAESign;
