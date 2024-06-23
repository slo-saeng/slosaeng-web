import { server } from './server';

export const getInstitutionDoctor = async (institutionNumber: number) => {
  const response = await server.get(`/doctor/institution/${institutionNumber}`);
  if (response.status !== 200) {
    throw new Error('요양기관 의료진 조회에 실패했습니다.');
  }
  return response.data;
};
