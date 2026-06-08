// Product.tsx

import React, { useRef } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { useProductListQuery } from '../../productQueries';

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

interface ProductProps {
  accountName: string;
}

export default function Product({ accountName }: ProductProps) {
  const productListRef = useRef<HTMLDivElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductListQuery(accountName);

  const userData = data?.pages.flat() || [];

  const handleScroll = () => {
    const container = productListRef.current;
    if (container) {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      if (
        hasNextPage &&
        !isFetchingNextPage &&
        scrollLeft + clientWidth >= scrollWidth
      ) {
        fetchNextPage();
      }
    }
  };

  return (
    <ProductWrapper>
      <h2>판매 중인 상품</h2>
      <div
        className="product-list-items"
        ref={productListRef}
        onScroll={handleScroll}
      >
        {userData.length > 0 && <ProductItem userData={userData} />}
      </div>
    </ProductWrapper>
  );
}
