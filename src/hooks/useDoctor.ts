import { useQuery } from 'react-query';
import { getDoctor } from '../api/doctor';

export const useDoctor = () => {
  return useQuery({
    queryKey: ['doctor'],
    queryFn: () => getDoctor(),
  });
};
