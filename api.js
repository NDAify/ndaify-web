import fetch from 'cross-fetch';
import getConfig from 'next/config';
import statuses from 'statuses';

import { getCookie, setCookie, destroyCookie } from './lib/cookies';
import { toQueryString } from './util';
import { Router } from './routes';

const { publicRuntimeConfig: { API_URL, COOKIE_DOMAIN } } = getConfig();

const COOKIE_OPTIONS = {
  path: '/',
  domain: COOKIE_DOMAIN,
};

const NO_SESSION = Symbol('No Session');

const DISPATCH_METHOD = {
  GET: 'GET',
  POST: 'POST',
  XHR_PUT: 'XHR_PUT',
};

export const redirect = (ctx, to, params = {}) => {
  let qs = toQueryString(params);
  if (qs) {
    qs = `?${qs}`;
  }

  if (process.browser) {
    Router.replace(`${to}${qs}`);
  } else {
    ctx.res.writeHead(statuses('Found'), { Location: `${to}${qs}` });
    ctx.res.end();
  }
};

const getRedirectUrl = (ctx) => {
  let redirectUrl;
  if (ctx) {
    // must have happened in getInitialProps either on server or client side during a page
    // transition, so we use the path of the navigated page
    redirectUrl = ctx.asPath;
  } else {
    // must have happened on client in reponse to user event, so we use the path of the current page
    redirectUrl = Router.router.asPath;
  }

  return redirectUrl;
};

const normalizeUrl = (endpoint) => {
  if (endpoint.startsWith('http')) {
    return endpoint;
  }

  return `${API_URL}/${endpoint}`;
};

const get = (endpoint, headers, payload = {}, config = {}) => {
  let qs = toQueryString(payload);
  if (qs) {
    qs = `?${qs}`;
  }

  return fetch(`${normalizeUrl(endpoint)}${qs}`, {
    method: 'GET',
    headers,
    signal: config.signal,
  });
};

const post = (endpoint, headers, payload, config = {}) => fetch(normalizeUrl(endpoint), {
  method: 'POST',
  headers,
  body: JSON.stringify(payload),
  signal: config.signal,
});

export const dispatch = (method, endpoint, config) => (ctx, sessionToken) => async (payload) => {
  if (!sessionToken) {
    redirect(ctx, '/login', {
      errorMessage: 'You must log in to continue',
      redirectUrl: getRedirectUrl(ctx),
    });

    throw new Error('Missing sessionToken');
  }

  let response;
  if (method === DISPATCH_METHOD.GET) {
    response = await get(
      endpoint,
      {
        Authorization: sessionToken !== NO_SESSION ? `Bearer ${sessionToken}` : '',
        'Content-Type': 'application/json',
      },
      payload,
    );
  }

  if (method === DISPATCH_METHOD.POST) {
    response = await post(
      endpoint,
      {
        Authorization: sessionToken !== NO_SESSION ? `Bearer ${sessionToken}` : '',
        'Content-Type': 'application/json',
      },
      payload,
    );
  }

  let data;
  try {
    data = await response.json();
    // eslint-disable-next-line
  } catch (error) {}

  if (response.status !== statuses('OK')) {
    if (response.status === statuses('Unauthorized')) {
      redirect(ctx, '/login', {
        errorMessage: 'Your session has expired. Log in to continue.',
        redirectUrl: getRedirectUrl(ctx),
      });

      throw new Error('Invalid session token');
    }

    throw new Error('Oops! Something went wrong. Try again later.');
  }

  return data;
};

export class API {
  constructor(ctx) {
    if (!process.browser && !ctx) {
      throw new Error('`ctx` is required on server');
    }

    this.ctx = ctx;
  }

  async startSessionByOAuth(authorizationCode, oauthState, oauthRedirectUri) {
    const response = await dispatch(DISPATCH_METHOD.POST, 'sessions')(this.ctx, NO_SESSION)({
      code: authorizationCode,
      state: oauthState,
      redirectUri: oauthRedirectUri,
    });

    setCookie(this.ctx, 'sessionToken', response.sessionToken, COOKIE_OPTIONS);

    return response;
  }

  async endSession() {
    destroyCookie(this.ctx, 'sessionToken');
    // Log out all windows
    if (process.browser) {
      // TODO(jmurzy) How can we make so if session expires, the first window to receive the session
      // error can propage it to other windows. We could probably broadcast "logout" on session
      // error in get() and post() as well to make sure that works.
      window.localStorage.setItem('logout', Date.now());
    }
  }

  getSession() {
    const sessionToken = getCookie(this.ctx, 'sessionToken');
    return dispatch(DISPATCH_METHOD.GET, 'sessions')(this.ctx, sessionToken)();
  }
}
