const os = require('os');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaHelmet = require('koa-helmet');
const statuses = require('statuses');

const createNextApp = require('next');

const nextRoutes = require('./routes');

const PORT = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = createNextApp({ dev });
const nextHandle = nextRoutes.getRequestHandler(nextApp);

const koaRouter = new KoaRouter();

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

  koaApp.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT} with ${os.cpus().length} CPUs.`);
  });
};

run();
