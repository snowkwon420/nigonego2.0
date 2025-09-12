import styled from 'styled-components';
import Product from './Product';

const ProductWrapper = styled.div`
  .product-list-items {
    display: flex;
    /* flex-wrap: nowrap; */
    gap: 10px;
    overflow-x: auto;

    button {
      flex: 0 0 auto;
      width: 140px;
      border: none;
    }
  }
`;

interface YourProductProps {
  accountName: string;
}

export default function YourProduct({ accountName }: YourProductProps) {
  return <Product accountName={accountName} />;
}
