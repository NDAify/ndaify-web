import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ActiveLink = ({ children, ...props }) => {
  const router = useRouter();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...props}>{children((props.as || props.href) === router.asPath)}</Link>
  );
};

export default ActiveLink;
