import Product from './Product';

interface YourProductProps {
  accountName: string;
}

export default function YourProduct({ accountName }: YourProductProps) {
  return <Product accountName={accountName} />;
}
