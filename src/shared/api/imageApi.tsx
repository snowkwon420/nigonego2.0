import createAxiosInstance from '../lib/axios';

/**
 * 이미지 업로드 API
 * @param file - 업로드할 이미지 파일
 * @param token - 인증 토큰 (선택)
 * @returns 업로드된 이미지 URL
 */
export const uploadImage = async (
  file: File,
  token?: string,
): Promise<string> => {
  // FormData 생성
  const formData = new FormData();
  formData.append('image', file);

  // axios 인스턴스 생성 (토큰 있으면 포함)
  const { imageInstance } = createAxiosInstance(token);

  try {
    // 이미지 업로드 요청
    const response = await imageInstance.post('/image/uploadfile', formData);

    // 응답에서 filename 추출
    if (response.data?.filename) {
      const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app';
      return `${baseURL}/${response.data.filename}`;
    }

    throw new Error('이미지 업로드 실패: filename이 없습니다.');
  } catch (error: any) {
    console.error('이미지 업로드 에러:', error);
    throw new Error(error.response?.data?.message || '이미지 업로드에 실패했습니다.');
  }
};

/**
 * 여러 이미지 업로드 (선택)
 */
export const uploadMultipleImages = async (
  files: File[],
  token?: string,
): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file, token));
  return Promise.all(uploadPromises);
};
