import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  width?: string;
  textAlign?: string;
  isCorrect?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  width,
  textAlign,
  isCorrect,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <LabelStyle htmlFor={id} $textAlign={textAlign}>
        {label}
      </LabelStyle>
      <InputStyle
        id={id}
        $width={width}
        {...props}
      />
      {isCorrect === false && (
        <ErrorMessage $textAlign={textAlign}>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};

const InputStyle = styled.input<{ $width?: string }>`
  width: ${props => props.$width || '100%'};
  border: none;
  height: 30px;
  &:focus {
    outline: none;
    border-bottom-color: var(--basic-yellow);
  }
  border-bottom: 1px solid #999;
`;

const LabelStyle = styled.label<{ $textAlign?: string }>`
  text-align: ${props => props.$textAlign || 'left'};
  color: black;
  width: 100%;
`;

// validation 밑줄을 button 컴포넌트에서 처리할 수 있도록 변경?
const ErrorMessage = styled.div<{ $textAlign?: string }>`
  text-align: ${props => props.$textAlign || 'left'};
  color: var(--basic-red);
`;

export default Input;
