import axios from 'axios';

const createAxiosInstance = (token: String) => {
  const baseUrl = 'https://eager-emogene-nigonego-9b3dee94.koyeb.app';

  const instance = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  const imageInstance = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return {
    instance,
    imageInstance,
  };
};

export default createAxiosInstance;
