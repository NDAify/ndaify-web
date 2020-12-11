import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const useAuthenticatorsQuery = (config) => {
  const query = useQuery(['authenticators'], async (/* queryKey */) => {
    const ndaifyService = new NdaifyService();
    const { authenticators } = await ndaifyService.getAuthenticators();
    return authenticators;
  }, config);

  return [query, query.data];
};

export default useAuthenticatorsQuery;
