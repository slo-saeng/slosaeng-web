import { useQuery } from 'react-query';
import { getNation } from '../api/region';

export const useNation = () => {
  return useQuery({
    queryKey: ['nation'],
    queryFn: () => getNation(),
  });
};
