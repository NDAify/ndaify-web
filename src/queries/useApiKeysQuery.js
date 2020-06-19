import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const useApiKeysQuery = (config) => {
  const query = useQuery(['apiKeys'], async (/* queryKey */) => {
    const ndaifyService = new NdaifyService();
    const { apiKeys } = await ndaifyService.getApiKeys();
    return apiKeys;
  }, config);

  return [query, query.data];
};

export default useApiKeysQuery;
