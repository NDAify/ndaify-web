import React from 'react';
import { withRouter } from 'next/router';

import { Link } from '../../routes';

const ActiveLink = withRouter(({ router, children, ...props }) => (
  <Link {...props}>{children((props.route) === router.asPath)}</Link>
));

export default ActiveLink;
