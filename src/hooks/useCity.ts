import { useQuery } from 'react-query';
import { getCity } from '../api/region';

export const useCity = (nationId = 1) => {
  return useQuery({
    queryKey: ['city', nationId],
    queryFn: () => getCity(nationId),
  });
};
