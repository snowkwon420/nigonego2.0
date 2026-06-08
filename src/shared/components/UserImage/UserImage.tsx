import React, { useState } from 'react';
import styled from 'styled-components';
import basicImg from '../../assets/images/basic-profile-img.png';
import { resolveImageUrl } from '../../utils/image';

/**
이미지컴포넌트에서 나중에 프로필에서 이미지 설정할때 사용될거같아서
이미지에 prop로 이미지 링크 전달해주게 짜려고 했지만 실패 했어요..
하지만 베이직 이미지는 정상적으로나와서 이렇게 짠상태로 두겠습니다.!
 */

interface ImageProps {
  backgroundUrl?: string;
}

interface ProfileImageProps extends ImageProps {
  className?: string;
}

function ProfileImage({ backgroundUrl, className }: ProfileImageProps) {
  const [imageSrc, setImageSrc] = useState(resolveImageUrl(backgroundUrl) || basicImg);

  return (
    <ImageStyle className={className}>
      <img
        src={imageSrc}
        alt=""
        onError={() => {
          setImageSrc(basicImg);
        }}
      />
    </ImageStyle>
  );
}

const ImageStyle = styled.div`
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LProfile = styled(ProfileImage)`
  width: 110px;
  height: 110px;
`;

export function LImage({ backgroundUrl }: ImageProps) {
  return <LProfile backgroundUrl={backgroundUrl} />;
}

const MProfile = styled(ProfileImage)`
  width: 50px;
  height: 50px;
`;

export function MImage({ backgroundUrl }: ImageProps) {
  return <MProfile backgroundUrl={backgroundUrl} />;
}

const SProfile = styled(ProfileImage)`
  width: 42px;
  height: 42px;
`;

export function SImage({ backgroundUrl }: ImageProps) {
  return <SProfile backgroundUrl={backgroundUrl} />;
}

const XSProfile = styled(ProfileImage)`
  width: 36px;
  height: 36px;
`;

export function XSImage({ backgroundUrl }: ImageProps) {
  return <XSProfile backgroundUrl={backgroundUrl} />;
}
