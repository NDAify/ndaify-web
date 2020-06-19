import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const useSessionQuery = (config) => {
  const query = useQuery(['session'], async () => {
    const ndaifyService = new NdaifyService();
    const { user } = await ndaifyService.getSession();
    return user;
  }, config);

  return [query, query.data];
};

export default useSessionQuery;
