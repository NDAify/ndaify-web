import React from 'react';
import { withRouter } from 'next/router';

import { Link } from '../../routes';

const ActiveLink = withRouter(({ router, children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link {...props}>{children((props.route) === router.asPath)}</Link>
));

export default ActiveLink;
