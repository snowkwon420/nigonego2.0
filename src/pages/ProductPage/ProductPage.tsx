import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Input from '../../shared/components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../../app/store/authToken';

import FileUploadInput from '../../shared/components/Input/FileUploadInput';
import { HeaderBasicNav } from '../../shared/components/Header/Header';
import Layout from '../../app/styles/Layout';

import useFetchToken from '../../shared/hooks/UseFetchToken';

export default function ProductPage() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [itemImage, setItemImage] = useState('');

  const { postJoinImage, postProductUpload } = useFetchToken();

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (itemName && price && link && itemImage) {
      setIsFormValid(true);
    }
  }, [itemName, price, link, itemImage]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    postJoinImage(formData).then(response => {
      if (response?.data?.filename) {
        setItemImage(
          `${process.env.REACT_APP_API_BASE_URL || 'http://eager-emogene-nigonego-9b3dee94.koyeb.app'}/${response.data.filename}`,
        );
      }
    });
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    postProductUpload(itemName, parseInt(price), link, itemImage).then(response => {
      navigate('/myprofile');
    });
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <HeaderBasicNav disabled={!isFormValid}>업로드</HeaderBasicNav>

        <ul>
          <li>
            <p className="title">이미지 등록</p>
            <ImgUploadWrapp>
              <FileUploadInput
                id="input"
                type="file"
                onChange={handleImageUpload}
              />
              <Input id="input" type="file" onChange={handleImageUpload} />
              {itemImage.length > 0 && (
                <img src={itemImage} alt="" style={{ borderRadius: '10px' }} />
              )}
            </ImgUploadWrapp>
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
        </ul>
      </form>
    </Layout>
  );
}

const GlobalWrapper = styled.div`
  form {
    .title {
      font-size: 12px;
      margin-bottom: 12px;
      color: var(--basic-grey);
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;

      li {
        width: 322px;
        margin: auto;
      }
    }
  }
`;
const ImgUploadWrapp = styled.div`
  width: 100%;
  height: 204px;
  border-radius: 10px;
  margin: auto;

  background: var(--light-grey);
  position: relative;
  label {
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
  input {
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
