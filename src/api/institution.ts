import { server } from './server';

export const getInstitutionKeyword = async (keyword: string) => {
  const response = await server.get(`/institution/${keyword}`);
  if (response.status !== 200) {
    throw new Error('병의원 검색에 실패했습니다.');
  }
  return response.data;
};
