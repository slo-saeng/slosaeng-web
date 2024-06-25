import { useQuery } from 'react-query';
import { getInstitutionPaging } from '../api/institution';

export const useInstitutionPaging = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ['institution', page, size],
    queryFn: () => getInstitutionPaging(page, size),
    retry: 0,
  });
};
