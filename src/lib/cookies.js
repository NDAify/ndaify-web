import { parse } from 'cookie';
import { parseCookies as parseRequestCookies } from 'nookies';
import getConfig from 'next/config';

export { setCookie, destroyCookie } from 'nookies';

const { publicRuntimeConfig: { COOKIE_DOMAIN } } = getConfig();

export const BASE_COOKIE_OPTIONS = {
  path: '/',
  domain: COOKIE_DOMAIN,
};

const cookieStringFromSetCookie = (cookies = []) => cookies.map((cookie) => {
  const [keyValuePart] = cookie.split(';');
  return keyValuePart;
}).join('; ');

const parseResponseCookies = (ctx, options) => {
  let responseCookies = {};
  if (ctx?.res) {
    const cookie = cookieStringFromSetCookie(ctx.res.getHeader('Set-Cookie'));
    responseCookies = parse(cookie, options);
  }

  return responseCookies;
};

export const getCookie = (ctx, name, options) => {
  // Parse cookies in response header in case we dispatch requests to endpoints
  // that require authentication (i.e. sessionToken) in the same request as the
  // one that's setting the cookie. In that case the cookie will not be available
  // in the requestCookies as it has not been returned from the client in the
  // cookie header.
  const responseCookies = parseResponseCookies(ctx, options);

  const requestCookies = parseRequestCookies(ctx);
  return responseCookies[name] || requestCookies[name];
};
