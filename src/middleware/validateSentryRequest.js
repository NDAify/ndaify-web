import statuses from 'statuses';

import loggerClient from '../db/loggerClient';

const {
  SENTRY_SECRET_TOKEN,
} = process.env;

export default async (ctx, next) => {
  const {
    'x-sentry-token': sentryToken,
  } = ctx.request.headers;

  let verified;
  try {
    if (!sentryToken) {
      throw new Error('Missing Sentry token');
    }

    if (sentryToken !== SENTRY_SECRET_TOKEN) {
      throw new Error('Invalid Sentry token');
    }

    verified = true;
  } catch (error) {
    // eslint-disable-next-line
    loggerClient.info(error);
  }

  if (!verified) {
    ctx.status = statuses('Unauthorized');
    ctx.body = {
      errorMessage: 'Request originates from a non-Sentry source',
    };

    return;
  }

  await next();
};
