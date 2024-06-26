import { useQuery } from 'react-query';
import { getIntensiveCare } from '../api/intensiveCare';

export const useIntensiveCare = () => {
  return useQuery({
    queryKey: ['intensive-care'],
    queryFn: () => getIntensiveCare(),
  });
};
