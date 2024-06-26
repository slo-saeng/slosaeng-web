import { useQuery } from 'react-query';
import { getOpenApi } from '../api/openApi';

export const useOpenApi = (ykiho: string) => {
  return useQuery({
    queryKey: ['openapi', ykiho],
    queryFn: () => getOpenApi(ykiho),
  });
};
