import { server } from './server';

export const getInstitutionDoctor = async (institutionNumber: number) => {
  const response = await server.get(`/doctor/institution/${institutionNumber}`);
  if (response.status !== 200) {
    throw new Error('요양기관 의료진 조회에 실패했습니다.');
  }
  return response.data;
};

export const postApproveDoctor = async (doctorId: string) => {
  const response = await server.post(`/doctor/approve/${doctorId}`);
  if (response.status !== 200) {
    throw new Error('의료진 승인에 실패했습니다.');
  }
  return response.data;
};

export const deleteCancelDoctor = async (doctorId: string) => {
  const response = await server.delete(`/doctor/${doctorId}`);
  if (response.status !== 200) {
    throw new Error('의료진 거절에 실패했습니다.');
  }
  return response.data;
};
