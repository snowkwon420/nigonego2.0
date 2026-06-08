import { useState, useEffect } from 'react';
import { HeaderBasicNav } from '../../shared/components/Header/Header';
import Layout from '../../app/styles/Layout';
import ProductUploadContainer from '../../features/product/components/ProductUploadContainer';

export default function ProductPage() {
  const [isFormValid, setIsFormValid] = useState(false);

  // TODO: Container에서 폼 유효성 상태를 받아오도록 개선 필요
  useEffect(() => {
    // 임시로 항상 false로 설정
    setIsFormValid(false);
  }, []);

  return (
    <Layout>
      <HeaderBasicNav disabled={!isFormValid}>업로드</HeaderBasicNav>
      <ProductUploadContainer />
    </Layout>
  );
}


