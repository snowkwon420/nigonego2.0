import { API_BASE_URL } from '../constants/api';

export const isValidImageUrl = (url?: string | null) => {
  if (!url) return false;

  const trimmedUrl = url.trim();

  return (
    trimmedUrl.length > 0 &&
    trimmedUrl !== 'undefined' &&
    trimmedUrl !== 'null'
  );
};

export const resolveImageUrl = (url?: string | null) => {
  if (!isValidImageUrl(url)) return '';

  const trimmedUrl = url!.trim();

  if (/^https?:\/\//.test(trimmedUrl) || trimmedUrl.startsWith('data:')) {
    return trimmedUrl;
  }

  if (trimmedUrl.startsWith('/')) {
    return `${API_BASE_URL}${trimmedUrl}`;
  }

  return `${API_BASE_URL}/${trimmedUrl}`;
};
