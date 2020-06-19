export class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export const getClientOrigin = () => {
  if (!process.browser) {
    throw Error('Unsupported platform encountered running `getClientOrigin`');
  }

  const loc = window.location;

  if (loc.origin) {
    return window.location.origin;
  }

  const port = `${loc.port ? `:${loc.port}` : ''}`;
  return `${loc.protocol}//${loc.hostname}${port}`;
};

export const getServerOrigin = (req) => {
  if (!req) {
    throw Error('`req` is requred');
  }

  const secure = !!req.socket.encrypted;
  let protocol = 'http';

  if (secure || req.headers['x-forwarded-proto']) {
    protocol = 'https';
  }

  const origin = req ? `${protocol}://${req.headers.host}` : '';

  return origin;
};

export const getOrigin = (req) => {
  if (process.browser) {
    return getClientOrigin();
  }

  return getServerOrigin(req);
};

export const toQueryString = (params) => Object.keys(params)
  // filter out keys for undefined values
  .filter((k) => params[k] !== undefined && params[k] !== null)
  .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');

export const toFormData = (values) => {
  const formData = new FormData();

  // eslint-disable-next-line
  for (let key in values) {
    const value = values[key];
    if (value) {
      formData.append(key, values[key]);
    }
  }

  return formData;
};

export const serializeOAuthState = (params) => encodeURIComponent(JSON.stringify(params));

export const timeout = (t) => new Promise((resolve) => setTimeout(() => resolve(), t));

export const scrollToTop = () => {
  window.scrollTo(0, 0);
  document.body.focus();
};
