import React, { useState, MouseEvent, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import SlideModal from '../Modal/SlideModal';
import { ReactComponent as IconMoreView } from '../../assets/image/IconMoreView.svg';

interface ButtonStyleProps {
  backgroundColor?: string;
  border?: boolean;
  delete?: boolean;
}

//버튼 공통 스타일
const ButtonCommonStyle = css<ButtonStyleProps>`
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor || 'var(--basic-yellow)'};
  border: ${props => (props.border ? '1px solid gray' : 'none')};
`;

interface ButtonLongProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

// 긴 버튼
export const ButtonLong: React.FC<ButtonLongProps> = ({ type = 'button', children, ...props }) => {
  return (
    <ButtonLongStyle type={type} {...props}>
      {children}
    </ButtonLongStyle>
  );
};

// 긴 버튼 스타일
const ButtonLongStyle = styled.button<ButtonStyleProps>`
  ${ButtonCommonStyle}
`;

interface ButtonMiddleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  border?: boolean;
  children: ReactNode;
}

// 중간 버튼
export const ButtonMiddle: React.FC<ButtonMiddleProps> = ({
  type = 'button',
  backgroundColor,
  onClick,
  border,
  children,
  ...props
}) => {
  return (
    <ButtonMiddleStyle
      type={type}
      onClick={onClick}
      $backgroundColor={backgroundColor}
      $border={border}
      {...props}
    >
      {children}
    </ButtonMiddleStyle>
  );
};

// 중간 버튼 스타일
const ButtonMiddleStyle = styled.button<{ $backgroundColor?: string; $border?: boolean }>`
  ${ButtonCommonStyle}
  width: 100px;
  background-color: ${props => props.$backgroundColor || 'var(--basic-yellow)'};
  border: ${props => (props.$border ? '1px solid gray' : 'none')};
`;

interface ButtonShortProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: ReactNode;
}

// 짧은 버튼
export const ButtonShort: React.FC<ButtonShortProps> = ({ disabled, children, onClick, ...props }) => {
  return (
    <ButtonShortStyle disabled={disabled} onClick={onClick} {...props}>
      {children}
    </ButtonShortStyle>
  );
};

// 짧은 버튼 스타일
const ButtonShortStyle = styled.button<ButtonStyleProps>`
  ${ButtonCommonStyle}
  width: 50px;
`;

// ====================

export function MoreIconButton() {
  const [isSideSlideOpen, setIsSideSlideOpen] = useState(false);

  const handleIconClick = () => {
    setIsSideSlideOpen(true);
  };

  const handleModalClose = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsSideSlideOpen(false);
    }
  };

  return (
    <>
      <MoreIconButtonStyle onClick={handleIconClick} $backgroundColor="none">
        <IconMoreView width="24px" height="24px" />
      </MoreIconButtonStyle>
      {isSideSlideOpen && (
        <SlideModal closeModal={handleModalClose}></SlideModal>
      )}
    </>
  );
}

export const MoreIconButtonStyle = styled.button<{ $backgroundColor?: string }>`
  ${ButtonCommonStyle}
  background-color: ${props => props.$backgroundColor || 'var(--basic-yellow)'};
`;
