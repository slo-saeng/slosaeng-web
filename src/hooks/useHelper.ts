import { useQuery } from 'react-query';
import { getHelper } from '../api/helper';

export const useHelper = () => {
  return useQuery({
    queryKey: ['helper'],
    queryFn: () => getHelper(),
  });
};
