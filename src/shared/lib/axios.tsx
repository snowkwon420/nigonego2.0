import axios from 'axios';

const BASE_URL = 'https://api.mandarin.weniv.co.kr';

const createAxiosInstance = (token?: string) => {
  const headers = token
    ? { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }
    : { 'Content-type': 'application/json' };

  // 일반 요청용
  const instance = axios.create({
    baseURL: BASE_URL,
    headers,
  });

  // 이미지 업로드용
  const imageInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-type': 'multipart/form-data',
    },
  });

  return {
    instance, // 기본 요청용
    imageInstance, // 이미지 업로드 전용
  };
};

export default createAxiosInstance;
