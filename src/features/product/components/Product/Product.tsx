// Product.tsx

import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { useProductAPI } from '../../useProductApi';

const ProductWrapper = styled.div`
  text-align: center;
  .product-list-items {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    width: 350px;
    margin: auto;

    button {
      flex: 0 0 auto;
      width: 140px;
      border: none;
    }
    h2 {
    }
  }
`;

interface ProductData {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
  author: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  };
}

interface ProductProps {
  accountName: string;
}

export default function Product({ accountName }: ProductProps) {
  const { getProductListLimit } = useProductAPI();
  const [userData, setUserData] = useState<ProductData[]>([]);
  const productListRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback((skip: number) => {
    getProductListLimit(skip, accountName)
      .then(response => {
        if (response?.data?.product) {
          setUserData(prevData => [...prevData, ...response.data.product]);
        }
      })
      .catch(error => console.error(error));
  }, [accountName, getProductListLimit]);

  useEffect(() => {
    fetchData(0); // 초기 데이터 로드
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const container = productListRef.current;
      if (container) {
        const { scrollLeft, clientWidth, scrollWidth } = container;
        if (scrollLeft + clientWidth >= scrollWidth) {
          const skip = userData.length;
          fetchData(skip);
        }
      }
    };

    const productList = productListRef.current;
    if (productList) {
      productList.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (productList) {
        productList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchData, userData]);
  return (
    <ProductWrapper>
      <h2>판매 중인 상품</h2>
      <div className="product-list-items" ref={productListRef}>
        {userData.length > 0 && <ProductItem userData={userData} />}
      </div>
    </ProductWrapper>
  );
}
