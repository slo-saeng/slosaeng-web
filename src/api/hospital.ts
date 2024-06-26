import { server } from './server';

export const getMaster = async () => {
  const response = await server.get(`/master`);
  if (response.status !== 200) {
    throw new Error('병원 목록 조회에 실패했습니다.');
  }
  return response.data;
};

export const deleteCancelMaster = async (masterId: string) => {
  const response = await server.delete(`/master/${masterId}`);
  if (response.status !== 200) {
    throw new Error('병원 삭제에 실패했습니다.');
  }
  return response.data;
};
