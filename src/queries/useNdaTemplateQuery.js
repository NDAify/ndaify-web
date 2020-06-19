import { useQuery } from 'react-query';

import NdaifyService from '../services/NdaifyService';

const useNdaTemplateQuery = (ndaTemplateId, config) => {
  const query = useQuery(['ndaTemplate', ndaTemplateId], async (/* queryKey */) => {
    const ndaifyService = new NdaifyService();
    const { ndaTemplate } = await ndaifyService.getNdaTemplate(ndaTemplateId);
    return ndaTemplate;
  }, config);

  return [query, query.data];
};

export default useNdaTemplateQuery;
