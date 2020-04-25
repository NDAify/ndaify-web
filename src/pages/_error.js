import React from 'react';
import statuses from 'statuses';

import ErrorViewImpl from '../components/ErrorView/ErrorView';

// TODO(jmurzy) Error page title
// TODO(jmurzy) Generate a static 404 page:
// (https://err.sh/next.js/custom-error-no-custom-404)
const ErrorView = ({ statusCode, errorMessage }) => (
  <ErrorViewImpl statusCode={statusCode} errorMessage={errorMessage} />
);

ErrorView.getInitialProps = async (ctx) => {
  let statusCode = 404;

  if (ctx.res?.statusCode) {
    statusCode = ctx.res.statusCode;
  }

  if (ctx.err?.statusCode) {
    statusCode = ctx.err.statusCode;
  }

  return {
    statusCode,
    errorMessage: statuses(statusCode),
  };
};

export default ErrorView;
