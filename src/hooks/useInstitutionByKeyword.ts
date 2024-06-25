import { useQuery } from 'react-query';
import { getInstitutionKeyword } from '../api/institution';

export const useInstitutionByKeyword = (keyword = '수원시') => {
  return useQuery({
    queryKey: ['institution', keyword],
    queryFn: () => getInstitutionKeyword(keyword),
    retry: 0,
  });
};
