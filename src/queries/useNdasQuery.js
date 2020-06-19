import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const useNdasQuery = (config) => {
  const query = useQuery(['ndas'], async (/* queryKey */) => {
    const ndaifyService = new NdaifyService();
    const { ndas } = await ndaifyService.getNdas();
    return ndas;
  }, config);

  return [query, query.data];
};

export default useNdasQuery;
