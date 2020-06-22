import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

const useSessionQuery = (config) => {
  const query = useQuery(['session'], async () => {
    const ndaifyService = new NdaifyService();
    const { user } = await ndaifyService.getSession();
    return user;
  }, {
    // `user` of `session` updated only on login
    staleTime: ONE_HOUR_IN_MILLISECONDS,
    ...config,
  });

  return [query, query.data];
};

export default useSessionQuery;
