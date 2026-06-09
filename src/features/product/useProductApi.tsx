import { useMemo } from 'react';
import * as productAPI from './productApi';
import { useAuthStore } from '../../app/store/useAuthStore';

export const useProductAPI = () => {
  const token = useAuthStore((state) => state.token);

  return useMemo(() => ({
    // 상품 리스트 조회
    getProductListLimit: (skip: number, accountname: string) =>
      productAPI.getProductListLimit(skip, accountname, token),

    // 상품 등록
    postProductUpload: (
      itemName: string,
      price: number | string,
      link: string,
      itemImage: string,
    ) =>
      productAPI.postProductUpload({ itemName, price, link, itemImage }, token),
  }), [token]);
};
