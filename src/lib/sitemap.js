import fetch from 'cross-fetch';
import statuses from 'statuses';
import { SitemapStream, streamToPromise } from 'sitemap';

const sitemap = () => async (ctx) => {
  try {
    const sm = new SitemapStream({
      hostname: process.env.CANONICAL_URL,
      lastmodDateOnly: false,
      xmlns: {
        news: true,
        xhtml: true,
        image: true,
        video: true,
      },
    });

    sm.write({
      url: '/',
      changefreq: 'weekly',
      priority: 1,
      img: [
        {
          url: 'https://ndaify.com/images/meta.png',
          caption: 'NDAify helps you keep your secrets under wraps.',
          title: 'NDAify',
        },
      ],
    });

    // const ndaifyService = new NdaifyService();
    // const ndaTemplateOptions = await ndaifyService.getNdaTemplateOptions();
    const response = await fetch(`${process.env.NDAIFY_ENDPOINT_URL}/nda-templates/options`, {
      method: 'GET',
    });

    const { ndaTemplateOptions } = await response.json();

    ndaTemplateOptions.forEach((opt) => {
      sm.write({
        url: `/sample/${opt.ndaTemplateId}`,
        changefreq: 'weekly',
        priority: 1,
      });
    });

    sm.end();

    const xml = await streamToPromise(sm);

    ctx.set('Content-Type', 'text/xml');
    ctx.res.write(xml.toString());
  } catch {
    ctx.status = statuses('Internal Server Error');
  } finally {
    ctx.res.end();
  }
};

export default sitemap;
