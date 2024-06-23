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
