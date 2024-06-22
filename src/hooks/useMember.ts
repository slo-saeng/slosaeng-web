import { useQuery } from 'react-query';
import { getMember } from '../api/login';

export const useMember = () => {
  return useQuery({
    queryKey: ['member'],
    queryFn: () => getMember(),
  });
};
