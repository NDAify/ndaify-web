import { useMemo } from 'react';
import { useRouter } from 'next/router';
import * as pathToRegexp from 'path-to-regexp';

const openingBrackets = /\[/g;
const closingBrackets = /\]/g;

const parameterizeDynamicPath = path => path.replace(openingBrackets, ':').replace(closingBrackets, '');

const Match = (props) => {
  const router = useRouter();

  const regexp = useMemo(
    () => pathToRegexp.pathToRegexp(parameterizeDynamicPath(props.href)), 
    [props.href],
  );

  if (!regexp.exec(router.asPath)) {
    return null;
  }

  return props.render();
};

export default Match;
