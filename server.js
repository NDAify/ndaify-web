const os = require('os');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaHelmet = require('koa-helmet');
const statuses = require('statuses');

const createNextApp = require('next');

const nextRoutes = require('./routes');

const PORT = process.env.PORT || 3000;
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
    koaApp.use(koaHelmet.hsts());
    koaApp.use(async (ctx, next) => {
      const proto = ctx.req.headers['x-forwarded-proto'];

      // Enforce SSL & HSTS in production
      if (proto !== 'https') {
        const to = `https://${ctx.req.headers.host}${ctx.req.url}`;

        ctx.res.writeHead(statuses('Found'), { Location: to });
        ctx.res.end();
        return;
      }

      await next();
    });
  }

  koaApp.use(koaRouter.routes());

  koaApp.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT} with ${os.cpus().length} CPUs.`);
  });
};

run();
