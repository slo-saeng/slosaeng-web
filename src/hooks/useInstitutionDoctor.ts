import { useQuery } from 'react-query';
import { getInstitutionDoctor } from '../api/doctor';

export const useInstitutionDoctor = (institutionNumber: number) => {
  return useQuery({
    queryKey: ['institutionDoctor', institutionNumber],
    queryFn: () => getInstitutionDoctor(institutionNumber),
  });
};
