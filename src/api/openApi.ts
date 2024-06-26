import { server } from './server';

export const getOpenApi = async (ykiho: string) => {
  const response = await server.get(`/openapi`, { params: { ykiho } });
  if (response.status !== 200) {
    throw new Error('병의원 시설 정보 Open API 조회에 실패하였습니다.');
  }
  return response.data;
};
