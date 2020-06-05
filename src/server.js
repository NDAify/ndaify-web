import os from 'os';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaHelmet from 'koa-helmet';
import statuses from 'statuses';

import createNextApp from 'next';

import robots from './lib/robots';
import sitemap from './lib/sitemap';

import sentryNodeClient from './db/sentryNodeClient';
import loggerClient from './db/loggerClient';

import validateSentryRequest from './middleware/validateSentryRequest';

const PORT = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = createNextApp({ dev });

// eslint-disable-next-line no-underscore-dangle
const logErrorImpl = nextApp.logError.bind(nextApp);
// This is only called in prod since next.js doesn't relay errors in dev
// `logError` is a private method internal to next.js but there isn's a saner
// way to intercept these errors. Also see:
// https://github.com/vercel/next.js/issues/1852
nextApp.logError = (error) => {
  logErrorImpl(error);

  // Basically all uncaught ssr-ed getInitialProps() and render() errors are
  // captured here
  sentryNodeClient.withScope((scope) => {
    scope.setTag('next.js', 'yes');

    // Unfortunately next.js's ctx.req isn't available here to for the capture
    // scope.addEventProcessor((event) =>
    //   sentryNodeClient.Handlers.parseRequest(event, ctx.request),
    // );

    sentryNodeClient.captureException(error);
  });
};

const nextHandle = nextApp.getRequestHandler();

const koaRouter = new KoaRouter();

koaRouter.get('/robots.txt', robots());
koaRouter.get('/sitemap.xml', sitemap());

koaRouter.get('/health', async (ctx) => {
  ctx.status = statuses('OK');
  ctx.body = {
    CANONICAL_URL: process.env.CANONICAL_URL,
    NDAIFY_ENDPOINT_URL: process.env.NDAIFY_ENDPOINT_URL,
    NDAIFY_LOG_LEVEL: process.env.NDAIFY_LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV,
    now: Date.now(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
});

// Only Sentry is allowed to access source map files
koaRouter.get('*.map', validateSentryRequest);

koaRouter.get('*', async (ctx) => {
  await nextHandle(ctx.req, ctx.res);

  // Bypass Koa's built-in response handling. This isn't supported by Koa. So
  // using with caution. See https://koajs.com/#ctx-respond
  ctx.respond = false;
});

const run = async () => {
  await nextApp.prepare();

  const koaApp = new Koa();

  // Koa doesn't seems to set the default statusCode. So, do that first
  koaApp.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  if (!dev) {
    koaApp.use(koaHelmet.hsts({
      // 180 days
      maxAge: 15552000,
      // www should "301" to root instead
      includeSubDomains: false,
      preload: false,
    }));
  }

  koaApp.use(koaRouter.routes());

  koaApp.on('error', (error, ctx) => {
    // When we attach a custom error listener, koa removes its own, so call it here
    // to get the default behavior in addition to Sentry reporting. See:
    // https://github.com/koajs/koa/blob/9ee65843d9be96329a3279c63657c2970e260acf/lib/application.js#L144
    koaApp.onerror(error);

    sentryNodeClient.withScope((scope) => {
      scope.setTag('koa', 'yes');

      scope.addEventProcessor(
        (event) => sentryNodeClient.Handlers.parseRequest(event, ctx.request),
      );

      sentryNodeClient.captureException(error);
    });
  });

  const server = koaApp.listen(PORT, () => {
    const { address, port } = server.address();

    loggerClient.info(`> Ready on http://${address}:${port} with ${os.cpus().length} CPUs.`);
  });

  const handleGracefulTermination = (signal) => () => {
    loggerClient.fatal(`Terminating on ${signal}`);
    server.close();
    process.exit();
  };

  process.on('SIGINT', handleGracefulTermination('SIGINT'));
  process.on('SIGTERM', handleGracefulTermination('SIGTERM'));
};

run();
