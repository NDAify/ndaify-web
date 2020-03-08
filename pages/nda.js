import React, { Component } from 'react';

import SenderNDA from '../components/SenderNDA/SenderNDA';
import { API } from '../api';

class SenderNDAPage extends Component {
  static async getInitialProps(ctx) {
    const api = new API(ctx);

    let user;
    try {
      ({ user } = await api.getSession());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return {
      user,
    };
  }

  render() {
    return <SenderNDA {...this.props} />;
  }
}

export default SenderNDAPage;
