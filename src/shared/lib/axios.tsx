import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const createAxiosInstance = (token?: string) => {
  // 기본 헤더 설정
  const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const authHeaders = token
    ? { ...baseHeaders, Authorization: `Bearer ${token}` }
    : baseHeaders;

  // 일반 요청용 인스턴스
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: authHeaders,
    timeout: 30000,
    withCredentials: false,
  });

  // 이미지 업로드용 인스턴스
  const imageInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 60000,
    withCredentials: false,
  });

  // 에러 처리 인터셉터
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return {
    instance,
    imageInstance,
  };
};

export default createAxiosInstance;
