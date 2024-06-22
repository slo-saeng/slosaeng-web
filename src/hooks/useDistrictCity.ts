import { useQuery } from 'react-query';
import { getDistrictCity } from '../api/region';

export const useDistrictCity = (cityId: number | null = 1) => {
  return useQuery({
    queryKey: ['districtCity', cityId],
    queryFn: () => cityId && getDistrictCity(cityId),
    enabled: cityId !== null,
  });
};
