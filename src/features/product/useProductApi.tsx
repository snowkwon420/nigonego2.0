import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '@/features/auth/store';
import * as productAPI from './productApi';

export const useProductAPI = () => {
  const token = useRecoilValue(authTokenAtom);

  return {
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
  };
};
