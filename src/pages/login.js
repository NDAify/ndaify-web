import React from 'react';

import { PageTitle, PageDescription } from '../components/Head/Head';
import LogInImpl from '../components/LogIn/LogIn';

const LogIn = () => (
  <>
    <PageTitle prepend="Log In – " />
    <PageDescription />
    <LogInImpl />
  </>
);

export default LogIn;
