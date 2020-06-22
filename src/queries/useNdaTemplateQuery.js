import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

const useNdaTemplateQuery = (ndaTemplateId, config) => {
  const query = useQuery(['ndaTemplate', ndaTemplateId], async (/* queryKey */) => {
    const ndaifyService = new NdaifyService();
    const { ndaTemplate } = await ndaifyService.getNdaTemplate(ndaTemplateId);
    return ndaTemplate;
  }, {
    // `ndaTemplate`'s are git versioned and do not expire
    staleTime: ONE_WEEK_IN_MILLISECONDS,
    ...config,
  });

  return [query, query.data];
};

export default useNdaTemplateQuery;
