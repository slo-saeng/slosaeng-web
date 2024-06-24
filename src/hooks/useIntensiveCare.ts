import { useQuery } from 'react-query';
import { getIntensiveCare, getSearchIntensiveCare } from '../api/intensiveCare';

export const useIntensiveCare = () => {
  return useQuery({
    queryKey: ['intensive-care'],
    queryFn: () => getIntensiveCare(),
  });
};
