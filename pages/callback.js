import { Component } from 'react';
import humps from 'humps';

import { API, redirect } from '../api';
import { getOrigin } from '../util';

const OAUTH_ERROR_USER_CANCELLED_AUTHORIZE = 'user_cancelled_authorize';
const OAUTH_ERROR_USER_CANCELLED_LOGIN = 'user_cancelled_login';
const OAUTH_ERROR_UNAUTHORIZED_SCOPE_ERROR = 'unauthorized_scope_error';

class Callback extends Component {
  static async getInitialProps(ctx) {
    const { query } = ctx;

    const {
      code: oAuthAuthorizationCode,
      state: oAuthState,
      error: oAuthError,
      errorDescription: oAuthErrorDescription,
    } = humps.camelizeKeys(query);

    try {
      if (oAuthError) {
        if (oAuthError === OAUTH_ERROR_USER_CANCELLED_AUTHORIZE) {
          throw new Error('You must grant LinkedIn access to continue');
        }

        if (oAuthError === OAUTH_ERROR_USER_CANCELLED_LOGIN) {
          throw new Error('You must sign into LinkedIn to grant access');
        }

        if (oAuthError === OAUTH_ERROR_UNAUTHORIZED_SCOPE_ERROR) {
          throw new Error('Issue connection LinkedIn to Linkedin. Please try again later.');
        }

        // eslint-disable-next-line
        console.error(oAuthError, oAuthErrorDescription);
        throw new Error('Oops! Something went wrong. Please try again later.');
      }

      const api = new API(ctx);

      const CALLBACK_URL_LINKEDIN = `${getOrigin(ctx.req)}/sessions/linkedin/callback`;

      // `sessionToken` will be injected into app and handeled via cookies
      await api.startSessionByOAuth(
        oAuthAuthorizationCode,
        oAuthState,
        CALLBACK_URL_LINKEDIN,
      );

      let formSessionKey;
      try {
        ({ formSessionKey } = JSON.parse(oAuthState));
        // eslint-disable-next-line
      } catch (error) {}

      return redirect(ctx, '/nda', { formSessionKey });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);

      return redirect(ctx, `/form?errorMessage=${error.message}`);
    }
  }

  render() {
    return null;
  }
}

export default Callback;
