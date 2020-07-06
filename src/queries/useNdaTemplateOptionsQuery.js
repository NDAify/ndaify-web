import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

const useNdaTemplateOptionsQuery = (config) => {
  const query = useQuery(['ndaTemplateOptions'], async (/* queryKey */) => {
    const ndaifyService = new NdaifyService();
    const { ndaTemplateOptions } = await ndaifyService.getNdaTemplateOptions();
    return ndaTemplateOptions;
  }, {
    // `ndaTemplateOptions`'s are git versioned and do not expire
    staleTime: ONE_WEEK_IN_MILLISECONDS,
    ...config,
  });

  return [query, query.data];
};

export default useNdaTemplateOptionsQuery;
