import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../../features/auth/store';
import createAxiosInstance from '../lib/axios';
import { API_BASE_URL } from '../constants/api';

/**
 * 이미지 업로드를 위한 공통 Hook
 */
export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const token = useRecoilValue(authTokenAtom);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const { imageInstance } = createAxiosInstance(token);
      const response = await imageInstance.post('/image/uploadfile', formData);

      if (response.data.filename) {
        return `${API_BASE_URL}/${response.data.filename}`;
      }

      return null;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      setUploadError('이미지 업로드에 실패했습니다.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    uploadError,
  };
};
