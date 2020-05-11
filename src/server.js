import os from 'os';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaHelmet from 'koa-helmet';
import statuses from 'statuses';

import createNextApp from 'next';

import robots from './lib/robots';
import sitemap from './lib/sitemap';

const PORT = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = createNextApp({ dev });
const nextHandle = nextApp.getRequestHandler();

const koaRouter = new KoaRouter();

koaRouter.get('/robots.txt', robots());
koaRouter.get('/sitemap.xml', sitemap());

koaRouter.get('/health', async (ctx) => {
  ctx.status = statuses('OK');
  ctx.body = {
    API_URL: process.env.API_URL,
    CANONICAL_URL: process.env.CANONICAL_URL,
    NODE_ENV: process.env.NODE_ENV,
    now: Date.now(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
});

koaRouter.get('*', async (ctx) => {
  await nextHandle(ctx.req, ctx.res);

  // Bypass Koa's built-in response handling. This isn't supported by Koa. So using with caution
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

  const server = koaApp.listen(PORT, () => {
    const { address, port } = server.address();

    // eslint-disable-next-line no-console
    console.log(`> Ready on http://${address}:${port} with ${os.cpus().length} CPUs.`);
  });

  const handleGracefulTermination = (signal) => () => {
    /* eslint-disable no-console */
    console.log(`Terminating on ${signal}`);
    /* eslint-enable */
    server.close();
    process.exit();
  };

  process.on('SIGINT', handleGracefulTermination('SIGINT'));
  process.on('SIGTERM', handleGracefulTermination('SIGTERM'));
};

run();
