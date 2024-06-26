import axios from 'axios';
import { JWT_ACCESSTOKEN_EXPIRATION, postAccessToken } from './login';

export const server = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

server.interceptors.request.use(async (config) => {
  let formattedAccessTokenExpiration: Date = new Date();
  const accessTokenExpiration = localStorage.getItem('accessTokenExpiration');
  if (accessTokenExpiration !== null)
    formattedAccessTokenExpiration = new Date(
      parseInt(accessTokenExpiration, 10),
    );
  const currentTime = Date.now();

  if (
    accessTokenExpiration &&
    formattedAccessTokenExpiration.getTime() - currentTime < 60000
  ) {
    const response = await postAccessToken();
    const newAccessTokenExpiration = Date.now() + JWT_ACCESSTOKEN_EXPIRATION;

    if (response) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem(
        'accessTokenExpiration',
        String(newAccessTokenExpiration),
      );
    } else {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    }
    if (config.headers && localStorage.getItem('accessToken'))
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }

  return config;
});
