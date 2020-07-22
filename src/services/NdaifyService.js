/* eslint-disable max-classes-per-file */

import fetch from 'cross-fetch';
import statuses from 'statuses';
import Router from 'next/router';
import { queryCache, queryCaches } from 'react-query';

import {
  getCookie, setCookie, destroyCookie, BASE_COOKIE_OPTIONS,
} from '../lib/cookies';
import { toQueryString, BaseError, scrollToTop } from '../util';
import getTemplateIdParts from '../utils/getTemplateIdParts';

import loggerClient from '../db/loggerClient';

export class NdaifyServiceError extends BaseError {
  constructor(message = 'NDAify Endpoint Error', statusCode, data) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class InvalidSessionError extends NdaifyServiceError {
  constructor(message = 'Invalid session token', statusCode, data) {
    super(message, statusCode, data);
  }
}

class FetchError extends NdaifyServiceError {
  constructor(message = 'Fetch failed', statusCode, data) {
    super(message, statusCode, data);
  }
}

class EntityNotFoundError extends NdaifyServiceError {
  constructor(message = 'Entity does not exist', statusCode, data) {
    super(message, statusCode, data);
  }
}

class ForbiddenError extends NdaifyServiceError {
  constructor(message = 'Action not allowed', statusCode, data) {
    super(message, statusCode, data);
  }
}

class RequestError extends NdaifyServiceError {
  constructor(message = 'Bad Request', statusCode, data) {
    super(message, statusCode, data);
  }
}

const dev = process.env.NODE_ENV !== 'production';

const REDIRECT_WHITELIST = [
  process.env.CANONICAL_URL,
];

const SESSION_TOKEN_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  // TODO make session cookie httpOnly
  httpOnly: false,
  secure: !dev,
  sameSite: 'Lax',
};

const NO_SESSION = Symbol('No Session');

const DISPATCH_METHOD = {
  GET: 'GET',
  POST: 'POST',
  XHR_PUT: 'XHR_PUT',
  DELETE: 'DELETE',
};

export const isSafeToRedirect = (to) => {
  if (!to.startsWith('http')) {
    return true;
  }

  if (REDIRECT_WHITELIST.find((item) => to.startsWith(item))) {
    return true;
  }

  return false;
};

export const redirect = (ctx, to, params = {}) => {
  if (!isSafeToRedirect(to)) {
    throw new Error('Failed to redirect to unsafe target');
  }

  let qs = toQueryString(params);
  if (qs) {
    qs = `?${qs}`;
  }

  if (process.browser) {
    Router.replace(`${to}${qs}`).then(scrollToTop);
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

  return `${process.env.NDAIFY_ENDPOINT_URL}/${endpoint}`;
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

const del = (endpoint, headers, payload, config = {}) => fetch(normalizeUrl(endpoint), {
  method: 'DELETE',
  headers,
  body: JSON.stringify(payload),
  signal: config.signal,
});

const dispatch = (
  method,
  endpoint,
  config = {},
) => (ctx, sessionToken) => async (payload) => {
  if (!sessionToken) {
    if (!config.noRedirect) {
      redirect(ctx, '/login', {
        errorMessage: 'You must log in to continue',
        redirectUrl: getRedirectUrl(ctx),
      });
    }

    throw new InvalidSessionError('Missing sessionToken', statuses('Unauthorized'));
  }

  let response;

  try {
    if (method === DISPATCH_METHOD.GET) {
      response = await get(
        endpoint,
        {
          ...config.headers,
          Authorization: sessionToken !== NO_SESSION ? `Bearer ${sessionToken}` : '',
          'Content-Type': 'application/json',
        },
        payload,
        {
          signal: config.abortController?.signal,
        },
      );
    }

    if (method === DISPATCH_METHOD.POST) {
      response = await post(
        endpoint,
        {
          ...config.headers,
          Authorization: sessionToken !== NO_SESSION ? `Bearer ${sessionToken}` : '',
          'Content-Type': 'application/json',
        },
        payload,
        {
          signal: config.abortController?.signal,
        },
      );
    }

    if (method === DISPATCH_METHOD.DELETE) {
      response = await del(
        endpoint,
        {
          ...config.headers,
          Authorization: sessionToken !== NO_SESSION ? `Bearer ${sessionToken}` : '',
          'Content-Type': 'application/json',
        },
        payload,
        {
          signal: config.abortController?.signal,
        },
      );
    }
  } catch (error) {
    loggerClient.error(error);

    throw new FetchError('Service Unavailable', statuses('Service Unavailable'));
  }

  let data;
  try {
    data = await response.json();
    // eslint-disable-next-line
  } catch (error) {}

  if (
    response.status !== statuses('OK')
      && response.status !== statuses('Created')
      && response.status !== statuses('Accepted')
  ) {
    if (response.status === statuses('Unauthorized')) {
      if (!config.noRedirect) {
        redirect(ctx, '/login', {
          errorMessage: 'Your session has expired. Log in to continue.',
          redirectUrl: getRedirectUrl(ctx),
        });
      }

      throw new InvalidSessionError(data?.errorMessage, response.status, data);
    }

    if (response.status === statuses('Forbidden')) {
      throw new ForbiddenError(data?.errorMessage, response.status, data);
    }

    if (response.status === statuses('Not Found')) {
      throw new EntityNotFoundError(data?.errorMessage, response.status, data);
    }

    if (response.status === statuses('Bad Request')) {
      throw new RequestError(data?.errorMessage, response.status, data);
    }

    throw new NdaifyServiceError('Oops! Something went wrong. Try again later.', response.status, data);
  }

  return data;
};

export default class NdaifyService {
  constructor({
    ctx,
    headers,
    abortController,
  } = {}) {
    if (!process.browser && !ctx) {
      throw new Error('`ctx` is required on server');
    }

    this.ctx = ctx;
    this.headers = headers;
    this.abortController = abortController;
  }

  static withCache = (queryKey, hit, miss) => {
    const data = queryCache.getQueryData(queryKey);

    if (data) {
      return hit(queryKey, data);
    }

    return miss(queryKey);
  };

  async startSessionByOAuth(authorizationCode, oauthState, oauthRedirectUri) {
    const response = await dispatch(DISPATCH_METHOD.POST, 'sessions', { abortController: this.abortController, headers: this.headers, noRedirect: true })(this.ctx, NO_SESSION)({
      code: authorizationCode,
      state: oauthState,
      redirectUri: oauthRedirectUri,
    });

    setCookie(this.ctx, 'sessionToken', response.sessionToken, SESSION_TOKEN_COOKIE_OPTIONS);

    return response;
  }

  async endSession() {
    queryCaches.forEach((cache) => cache.clear());

    destroyCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    // Log out all windows
    if (process.browser) {
      // TODO(juliaqiuxy) How can we make so if session expires, the first window to
      // receive the session error can propage it to other windows. We could
      // probably broadcast "logout" on session error in get() and post() as
      // well to make sure that works.
      window.localStorage.setItem('logout', Date.now());
    }
  }

  getSession() {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.GET, 'sessions', { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }

  tryGetSession() {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.GET, 'sessions', { abortController: this.abortController, headers: this.headers, noRedirect: true })(this.ctx, sessionToken)();
  }

  createNda(nda) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.POST, 'ndas', { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)(nda);
  }

  getNda(ndaId) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.GET, `ndas/${ndaId}`, { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }

  getNdaPreview(ndaId) {
    return dispatch(DISPATCH_METHOD.GET, `ndas/${ndaId}/preview`, { abortController: this.abortController, headers: this.headers })(this.ctx, NO_SESSION)();
  }

  getNdas() {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.GET, 'ndas', { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }

  acceptNda(ndaId) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.POST, `ndas/${ndaId}/accept`, { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }

  revokeNda(ndaId) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.POST, `ndas/${ndaId}/revoke`, { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }

  declineNda(ndaId) {
    return dispatch(DISPATCH_METHOD.POST, `ndas/${ndaId}/decline`, { abortController: this.abortController, headers: this.headers })(this.ctx, NO_SESSION)();
  }

  resendNda(ndaId) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.POST, `ndas/${ndaId}/resend`, { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }

  createPaymentIntent(amount, currency) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.POST, 'payment-intents', { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)({
      amount,
      currency,
    });
  }

  getNdaStatistics() {
    return dispatch(DISPATCH_METHOD.GET, 'nda-statistics', { abortController: this.abortController, headers: this.headers })(this.ctx, NO_SESSION)();
  }

  getNdaTemplate(ndaTemplateId) {
    const {
      owner, repo, ref, path,
    } = getTemplateIdParts(ndaTemplateId);

    return dispatch(DISPATCH_METHOD.GET, `nda-templates/${owner}/${repo}/${ref}/${path}`, { abortController: this.abortController, headers: this.headers })(this.ctx, NO_SESSION)();
  }

  getNdaTemplateOptions() {
    return dispatch(DISPATCH_METHOD.GET, 'nda-templates/options', { abortController: this.abortController, headers: this.headers })(this.ctx, NO_SESSION)();
  }

  getOpenApiSpec() {
    return dispatch(DISPATCH_METHOD.GET, 'static/openapi.json', { abortController: this.abortController, headers: this.headers })(this.ctx, NO_SESSION)();
  }

  createApiKey(name) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.POST, 'api-keys', { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)({ name });
  }

  getApiKeys() {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.GET, 'api-keys', { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }

  deleteApiKey(apiKeyId) {
    const sessionToken = getCookie(this.ctx, 'sessionToken', SESSION_TOKEN_COOKIE_OPTIONS);
    return dispatch(DISPATCH_METHOD.DELETE, `api-keys/${apiKeyId}`, { abortController: this.abortController, headers: this.headers })(this.ctx, sessionToken)();
  }
}
