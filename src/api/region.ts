import { server } from './server';

export const getNation = async () => {
  const response = await server.get(`/nation`);
  if (response.status !== 200) {
    throw new Error('지역 리스트 조회에 실패하였습니다.');
  }
  return response.data;
};

export const getCity = async (nationId: number) => {
  const response = await server.get(`/city/${nationId}`);
  if (response.status !== 200) {
    throw new Error('도시 리스트 조회에 실패하였습니다.');
  }
  return response.data;
};

export const getDistrictNation = async (nationId: number) => {
  const response = await server.get(`/district/nation/${nationId}`);
  if (response.status !== 200) {
    throw new Error('지역 기반 군/구 리스트 조회에 실패하였습니다.');
  }
  return response.data;
};

export const getDistrictCity = async (cityId: number) => {
  const response = await server.get(`/district/city/${cityId}`);
  if (response.status !== 200) {
    throw new Error('도시 기반 군/구 리스트 조회에 실패하였습니다.');
  }
  return response.data;
};
