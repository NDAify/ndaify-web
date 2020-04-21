import { createSitemap } from 'sitemap';
import { promisify } from 'util';
import statuses from 'statuses';

const sm = createSitemap({
  hostname: 'https://ndaify.com',
});

const toXML = promisify(sm.toXML).bind(sm);

// See https://github.com/ekalinin/sitemap.js
sm.add({
  url: '/',
  changefreq: 'weekly',
  priority: 1,
});

const sitemap = () => async (ctx) => {
  try {
    const SITEMAP_XML = await toXML();
    ctx.set('Content-Type', 'text/xml');
    ctx.res.write(SITEMAP_XML);
  } catch {
    ctx.status = statuses('Internal Server Error');
  } finally {
    ctx.res.end();
  }
};

export default sitemap;