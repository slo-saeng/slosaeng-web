import { useQuery } from 'react-query';
import { getElder } from '../api/elder';

export const useElder = () => {
  return useQuery({
    queryKey: ['elder'],
    queryFn: () => getElder(),
  });
};
