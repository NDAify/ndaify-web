import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const useNdaQuery = (ndaId, isPreview, config) => {
  const query = useQuery(['nda', ndaId], async (/* queryKey */) => {
    const ndaifyService = new NdaifyService();

    let nda;
    if (isPreview) {
      ({ nda } = await ndaifyService.getNdaPreview(ndaId));
    } else {
      ({ nda } = await ndaifyService.getNda(ndaId));
    }
    return nda;
  }, config);

  return [query, query.data];
};

export default useNdaQuery;
