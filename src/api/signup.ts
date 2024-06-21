import { server } from './server';
import type {
  doctorProfile,
  helperProfile,
  masterProfile,
} from '../types/member';

export const postDoctor = async ({
  id,
  password,
  name,
  phone,
  position,
  birth,
  institutionNumber,
}: doctorProfile) => {
  const response = await server.post(`/doctor`, {
    id,
    password,
    name,
    phone,
    position,
    birth,
    institutionNumber,
  });
  if (response.status !== 200) {
    throw new Error('가입에 실패하였습니다.');
  }
  return response;
};

export const postMaster = async ({
  id,
  password,
  name,
  institutionNumber,
}: masterProfile) => {
  const response = await server.post(`/master`, {
    id,
    password,
    name,
    institutionNumber,
  });
  if (response.status !== 200) {
    throw new Error('가입에 실패하였습니다.');
  }
  return response;
};

export const postHelper = async ({
  id,
  password,
  name,
  phone,
  idNumber,
}: helperProfile) => {
  const response = await server.post(`/helper`, {
    id,
    password,
    name,
    phone,
    idNumber,
  });
  if (response.status !== 200) {
    throw new Error('가입에 실패하였습니다.');
  }
  return response;
};
