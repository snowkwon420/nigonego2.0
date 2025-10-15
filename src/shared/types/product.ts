/**
 * 상품 관련 타입 정의
 */

export interface Product {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
  author: {
    _id: string;
    username: string;
    accountname: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface ProductListResponse {
  products: Product[];
}

export interface ProductUploadRequest {
  product: {
    itemName: string;
    price: number;
    link: string;
    itemImage: string;
  };
}
