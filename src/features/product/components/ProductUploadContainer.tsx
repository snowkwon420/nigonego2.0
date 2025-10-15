import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../../../shared/components/Input/Input';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import { useProductAPI } from '../useProductApi';

function ProductUploadContainer() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const { postProductUpload } = useProductAPI();

  // 폼 유효성 검사
  useEffect(() => {
    if (itemName && price && link && itemImage) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [itemName, price, link, itemImage]);

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      // TODO: 이미지 업로드 API를 공통 기능으로 분리 필요
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://eager-emogene-nigonego-9b3dee94.koyeb.app';
      const response = await fetch(`${API_BASE_URL}/image/uploadfile`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.filename) {
        setItemImage(`${API_BASE_URL}/${result.filename}`);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  // 상품 업로드 제출
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      await postProductUpload(itemName, parseInt(price), link, itemImage);
      navigate('/myprofile');
    } catch (error) {
      console.error('Product upload error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProductFormList>
        <li>
          <p className="title">이미지 등록</p>
          <ImgUploadWrapper>
            <FileUploadInput
              id="input"
              type="file"
              onChange={handleImageUpload}
            />
            {itemImage.length > 0 && (
              <img src={itemImage} alt="상품 이미지" style={{ borderRadius: '10px' }} />
            )}
          </ImgUploadWrapper>
        </li>
        <li>
          <Input
            id="product-name"
            label="상품명"
            value={itemName}
            placeholder="2~10자 이내여야 합니다."
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setItemName(e.target.value);
            }}
          />
        </li>
        <li>
          <Input
            id="product-price"
            label="가격"
            placeholder="숫자만 입력 가능합니다."
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPrice(e.target.value);
            }}
          />
        </li>
        <li>
          <Input
            id="product-link"
            label="판매링크"
            placeholder="URL을 입력해 주세요."
            value={link}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setLink(e.target.value);
            }}
          />
        </li>
      </ProductFormList>
    </form>
  );
}

const ProductFormList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;

  li {
    width: 322px;
    margin: auto;
  }

  .title {
    font-size: 12px;
    margin-bottom: 12px;
    color: var(--basic-grey);
    font-weight: bold;
  }
`;

const ImgUploadWrapper = styled.div`
  width: 100%;
  height: 204px;
  border-radius: 10px;
  margin: auto;
  background: var(--light-grey);
  position: relative;
  overflow: hidden;
  
  label {
    position: absolute;
    right: 7px;
    bottom: 7px;
    z-index: 2;
  }
  
  input {
    display: none;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 이미지가 없을 때 플레이스홀더 */
  &:before {
    content: '이미지를 업로드해주세요';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--basic-grey);
    font-size: 14px;
    pointer-events: none;
  }

  /* 이미지가 있을 때 플레이스홀더 숨김 */
  img + &:before {
    display: none;
  }
`;

export default ProductUploadContainer;