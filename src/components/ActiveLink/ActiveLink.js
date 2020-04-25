import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';

const ActiveLink = withRouter(({ router, children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link {...props}>{children((props.as) === router.asPath)}</Link>
));

export default ActiveLink;
