import { server } from './server';
import type { Login } from '../types/login';

export const JWT_ACCESSTOKEN_EXPIRATION = 2 * 3600 * 1000;

export const postLogin = async ({ id, password }: Login) => {
  const response = await server.post(`/login`, { id, password });
  if (response.status !== 200) {
    throw new Error('로그인에 실패하였습니다.');
  }
  const accessTokenExpiration = Date.now() + JWT_ACCESSTOKEN_EXPIRATION;
  localStorage.setItem('accessToken', response.data.data.accessToken);
  localStorage.setItem('accessTokenExpiration', String(accessTokenExpiration));
  localStorage.setItem('refreshToken', response.data.data.refreshToken);

  return response;
};

export const postAccessToken = async () => {
  const response = await server.post(`/access-token`, {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  if (response.status !== 200) {
    throw new Error('토큰 재발급에 실패했습니다.');
  }
  return response;
};

export const getMember = async () => {
  const response = await server.get(`/member/current`);
  if (response.status !== 200) {
    throw new Error('로그인 중인 멤버 확인에 실패했습니다.');
  }
  return response.data;
};
