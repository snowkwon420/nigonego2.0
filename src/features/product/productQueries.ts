import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import { PRODUCTS_PER_PAGE } from '../../shared/constants/pagination';
import { Product } from '../../shared/types';
import { pickArray } from '../../shared/utils/apiResponse';
import * as productAPI from './productApi';

export const productQueryKeys = {
  all: ['products'] as const,
  list: (accountName: string) => [...productQueryKeys.all, 'list', accountName] as const,
};

export const useProductListQuery = (accountName: string) => {
  const token = useRecoilValue(authTokenAtom);

  return useInfiniteQuery({
    queryKey: productQueryKeys.list(accountName),
    queryFn: async ({ pageParam }) => {
      const response = await productAPI.getProductListLimit(
        Number(pageParam),
        accountName,
        token,
      );
      return pickArray<Product>(response, ['product', 'products']);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PRODUCTS_PER_PAGE) {
        return undefined;
      }

      return allPages.length * PRODUCTS_PER_PAGE;
    },
    enabled: Boolean(token && accountName),
  });
};

export const useCreateProductMutation = () => {
  const token = useRecoilValue(authTokenAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: {
      itemName: string;
      price: number | string;
      link: string;
      itemImage: string;
    }) => productAPI.postProductUpload(product, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};
