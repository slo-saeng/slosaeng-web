import { server } from './server';
import type { emergencyRequest } from '../types/emergency';

export const postEmergency = async ({ info, elderId }: emergencyRequest) => {
  const response = await server.post(`/emergency`, {
    info,
    elderId,
  });
  if (response.status !== 200) {
    throw new Error('긴급요청 등록에 실패하였습니다.');
  }
  return response.data;
};

export const getEmergency = async () => {
  const response = await server.get(`/emergency`);
  if (response.status !== 200) {
    throw new Error('긴급 도움 요청 목록 조회에 실패했습니다.');
  }
  return response.data;
};

export const getEmergencyId = async (elderId: number) => {
  const response = await server.get(`/emergency/${elderId}`);
  if (response.status !== 200) {
    throw new Error('긴급 도움 요청 목록 조회에 실패했습니다.');
  }
  return response.data;
};

export const deleteEmegenct = async (elderId: number) => {
  const response = await server.delete(`/intensive-care/${elderId}`);
  if (response.status !== 200) {
    throw new Error('긴급 도움 요청을 삭제하지 못했습니다.');
  }
  return response.data;
};