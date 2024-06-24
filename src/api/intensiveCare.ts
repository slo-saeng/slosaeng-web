import { server } from './server';

export interface IntensiveType {
  info: string;
  grade: string;
  id: number;
}

export const postIntensiveCare = async ({
  info,
  grade,
  id: elderId,
}: IntensiveType) => {
  const response = await server.post(`/intensive-care`, {
    info,
    grade,
    elderId,
  });
  if (response.status !== 200) {
    throw new Error('주요관리 등록에 실패하였습니다.');
  }
  return response.data;
};
