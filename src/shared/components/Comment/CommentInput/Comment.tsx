import { useState, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import userDefaultImage from '../../../assets/images/basic-profile-img.png';
import { useCommentAPI } from '../../../../features/comment/useCommentApi';

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
  setRecentCommentData: (data: any) => void;
  getComment: () => void;
}

export default function CommentInput({
  userId,
  setRecentCommentData,
  getComment,
}: CommentInputProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postComment } = useCommentAPI();

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const isBtnDisable = comment.trim() === '' || isSubmitting;

  const onhandlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (comment.trim() === '' || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await postComment(userId, comment);
      setRecentCommentData(res.data);
      getComment();
      setComment('');
    } catch (error) {
      // 에러 처리
    } finally {
      setIsSubmitting(false);
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
