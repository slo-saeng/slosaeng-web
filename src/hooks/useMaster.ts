import { useQuery } from 'react-query';
import { getMaster } from '../api/hospital';

export const useMaster = () => {
  return useQuery({
    queryKey: ['master'],
    queryFn: () => getMaster(),
  });
};
