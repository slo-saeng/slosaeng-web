import { server } from './server';

export const getHelper = async () => {
  const response = await server.get(`/helper`);
  if (response.status !== 200) {
    throw new Error('보호자 목록 조회에 실패했습니다.');
  }
  return response.data;
};

export const deleteCancelHelper = async (helperId: string) => {
  const response = await server.delete(`/helper/${helperId}`);
  if (response.status !== 200) {
    throw new Error('보호자 삭제에 실패했습니다.');
  }
  return response.data;
};
