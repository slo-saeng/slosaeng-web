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

export const getIntensiveCare = async () => {
  const response = await server.get(`/intensive-care`);
  if (response.status !== 200) {
    throw new Error('주요관리 목록 조회에 실패했습니다.');
  }
  return response.data;
};

export const deleteCancelIntensiveCare = async (elderId: number) => {
  const response = await server.delete(`/intensive-care/${elderId}`);
  if (response.status !== 200) {
    throw new Error('주요대상 삭제에 실패했습니다.');
  }
  return response.data;
};

export const getSearchIntensiveCare = async (elderId: number) => {
  const response = await server.get(`/intensive-care/${elderId}`);
  if (response.status !== 200) {
    throw new Error('주요관리 대상자를 찾지 못했습니다.');
  }
  return response.data;
};
