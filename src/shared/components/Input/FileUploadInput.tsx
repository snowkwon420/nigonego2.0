import React from 'react';
import buttonImg from '../../assets/image/BtnImgUpload.svg';
import styled from 'styled-components';

interface FileUploadInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  right?: string;
  bottom?: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  id,
  right,
  bottom,
  ...props
}) => {
  return (
    <>
      <FileUploadLabelStyle htmlFor={id} $right={right} $bottom={bottom}></FileUploadLabelStyle>
      <FileUploadInputStyle
        id={id}
        type="file"
        {...props}
      />
    </>
  );
};

const FileUploadLabelStyle = styled.label<{ $right?: string; $bottom?: string }>`
  position: absolute;
  right: ${props => props.$right || '0'};
  bottom: ${props => props.$bottom || '0'};

  width: 36px;
  height: 36px;

  display: inline-block;

  background-color: var(--basic-yellow);
  border-radius: 50%;
  background-image: url(${buttonImg});
  background-size: cover;
`;

const FileUploadInputStyle = styled.input`
  display: none;
`;

export default FileUploadInput;
