import { server } from './server';
import type { elderProfile } from '../types/member';

export const postElder = async ({
  name,
  idNumber,
  phone,
  gender,
  bloodType,
  nationId,
  cityId,
  districtId,
  detailAddress,
  etc,
}: elderProfile) => {
  const response = await server.post(`/elder`, {
    name,
    idNumber,
    phone,
    gender,
    bloodType,
    nationId,
    cityId,
    districtId,
    detailAddress,
    etc,
  });
  if (response.status !== 200) {
    throw new Error('고령자 등록에 실패하였습니다.');
  }
  return response.data;
};
