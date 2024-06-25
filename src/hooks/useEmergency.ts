import { useQuery } from 'react-query';
import { getEmergency } from '../api/emergency';

export const useEmergency = () => {
  return useQuery({
    queryKey: ['emergency'],
    queryFn: () => getEmergency(),
  });
};
