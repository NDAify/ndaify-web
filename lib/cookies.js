import { parseCookies } from 'nookies';

export { setCookie, destroyCookie } from 'nookies';

export const getCookie = (ctx, name) => {
  const cookies = parseCookies(ctx);
  return cookies[name];
};
