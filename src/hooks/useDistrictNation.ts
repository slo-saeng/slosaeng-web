import { useQuery } from 'react-query';
import { getDistrictNation } from '../api/region';

export const useDistrictNation = (nationId = 1) => {
  return useQuery({
    queryKey: ['districtNation', nationId],
    queryFn: () => getDistrictNation(nationId),
  });
};
