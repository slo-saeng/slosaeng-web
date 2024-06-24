import { useQuery } from 'react-query';
import { getInstitutionKeyword } from '../api/institution';

export const useInstitutionByKeyword = (keyword: string) => {
  return useQuery({
    queryKey: ['institution', keyword],
    queryFn: () => getInstitutionKeyword(keyword),
  });
};
