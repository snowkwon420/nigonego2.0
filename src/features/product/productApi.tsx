import createAxiosInstance from '@/shared/lib/axios';

// 상품 리스트 조회 (5개씩 + skip)
export const getProductListLimit = async (
  skip: number,
  accountname: string,
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(
    `/product/${accountname}/?limit=5&skip=${skip}`,
  );
  return response.data;
};

// 상품 등록
export const postProductUpload = async (
  {
    itemName,
    price,
    link,
    itemImage,
  }: {
    itemName: string;
    price: number | string;
    link: string;
    itemImage: string;
  },
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.post('/product', {
    product: {
      itemName,
      price: Number(price),
      link,
      itemImage,
    },
  });
  return response.data;
};
