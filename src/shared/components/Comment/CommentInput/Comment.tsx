import { useState, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import userDefaultImage from '../../../assets/images/basic-profile-img.png';
import { useCreateCommentMutation } from '../../../../features/comment/commentQueries';

export const CommentWrapper = styled.div<{ $disableBtn?: string }>`
  width: 100%;
  position: fixed;
  bottom: 0;
  form,
  input,
  button {
    padding: 8px;
  }

  form {
    width: 100%;
    align-items: center;

    display: flex;
  }

  img {
    width: 36px;
    margin-right: 12px;
  }

  input {
    width: 100%;
    border: 0;
  }

  button {
    flex-basis: 60px;
    color: ${props => (props.$disableBtn === '' ? '#c4c4c4' : '#FFA200')};
    border: 0;
  }

  .buttonOnOff {
    color: ${props => (props.$disableBtn === '' ? '#c4c4c4' : '#FFA200')};
  }
`;

interface CommentInputProps {
  userId: string;
}

export default function CommentInput({ userId }: CommentInputProps) {
  const [comment, setComment] = useState('');
  const createCommentMutation = useCreateCommentMutation(userId);

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const isBtnDisable = comment.trim() === '' || createCommentMutation.isPending;

  const onhandlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (comment.trim() === '' || createCommentMutation.isPending) return;

    try {
      await createCommentMutation.mutateAsync(comment);
      setComment('');
    } catch (error) {
      // 에러 처리
    }
  };

  return (
    <CommentWrapper $disableBtn={comment}>
      <form onSubmit={onhandlesubmit}>
        <img src={userDefaultImage} alt="유저기본이미지" />
        <input
          type="text"
          name="comment"
          value={comment}
          placeholder="댓글 입력하기..."
          onChange={handleCommentChange}
        />
        <button type="submit" value={comment} disabled={isBtnDisable}>
          게시
        </button>
      </form>
    </CommentWrapper>
  );
}
