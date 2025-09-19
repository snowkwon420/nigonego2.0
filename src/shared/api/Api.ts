import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (
  token: string,
): {
  getDataBase: AxiosInstance;
  instance: AxiosInstance;
  imageInstance: AxiosInstance;
  postDataBase: AxiosInstance;
} => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://eager-emogene-nigonego-9b3dee94.koyeb.app';

  const instance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  const imageInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const getDataBase: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const postDataBase: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return {
    getDataBase,
    instance,
    imageInstance,
    postDataBase,
  };
};

export default createAxiosInstance;
