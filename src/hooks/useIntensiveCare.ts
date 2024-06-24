import { useQuery } from 'react-query';
import { getListIntensiveCare } from '../api/intensiveCare';

export const useIntensiveCare = () => {
  return useQuery({
    queryKey: ['intensive-care'],
    queryFn: () => getListIntensiveCare(),
  });
};
