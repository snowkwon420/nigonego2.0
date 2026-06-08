import React from 'react';
import styled from 'styled-components';
import IconImagies from '../../../../shared/assets/image/IconImagies.svg';
import { isValidImageUrl, resolveImageUrl } from '../../../../shared/utils/image';

interface HomePostGridListItemProps {
  img: {
    image: string;
  };
}

export default function HomePostGridListItem({ img }: HomePostGridListItemProps) {
  const postImage = resolveImageUrl(img.image);

  return (
    <GridItemImg>
      <IconImagiesBtn src={IconImagies} alt="imagies icon" />
      {isValidImageUrl(postImage) && (
        <img
          src={postImage}
          alt="이미지"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      )}
    </GridItemImg>
  );
}

const GridItemImg = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .noneImg {
    background-color: var(--light-grey);
  }
`;
const IconImagiesBtn = styled.img`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 30px;
  height: 30px;
`;
