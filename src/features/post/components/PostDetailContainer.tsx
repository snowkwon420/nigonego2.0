import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import HomePost from '../../feed/components/HomePost/HomePost';
import CommentInput from '../../../shared/components/Comment/CommentInput/Comment';
import CommentPost from '../../../shared/components/Comment/CommentPost/CommentPost';
import { usePostApi } from '../usePostApi';
import { useCommentAPI } from '../../comment/useCommentApi';
import { Post, Comment } from '../../../shared/types';

interface PostDetailContainerProps {
  postId: string;
}

/**
 * 게시물 상세 정보와 댓글을 표시하는 컨테이너
 */
function PostDetailContainer({ postId }: PostDetailContainerProps) {
  const [postData, setPostData] = useState<Post | null>(null);
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [recentCommentData, setRecentCommentData] = useState<Comment | null>(null);

  const { getUserData } = usePostApi();
  const { getCommentList } = useCommentAPI();

  // 게시물 데이터 가져오기
  const getData = useCallback(async () => {
    try {
      const response = await getUserData(postId);

      if (response?.data?.post) {
        setPostData(response.data.post);
      } else if (response?.post) {
        setPostData(response.post);
      }
    } catch (error) {
      // 에러 처리
    }
  }, [getUserData, postId]);

  // 댓글 데이터 가져오기
  const getComment = useCallback(async () => {
    try {
      const response = await getCommentList(postId);

      if (response?.data?.comments) {
        const comments = response.data.comments;

        // 최신 댓글이 있으면 맨 앞에 추가
        if (recentCommentData) {
          setCommentData([recentCommentData, ...comments.reverse()]);
        } else {
          setCommentData(comments);
        }
      } else if (response?.comments) {
        setCommentData(response.comments);
      }
    } catch (error) {
      // 에러 처리
    }
  }, [getCommentList, postId, recentCommentData]);

  useEffect(() => {
    if (postId) {
      getData();
      getComment();
    }
  }, [postId, getData, getComment]);

  return (
    <Wrapper>
      <ContentSection>
        {postData ? (
          <>
            <HomePost data={postData} />
            <CommentWrapper>
              {commentData.length > 0 &&
                commentData.map((comment, index) => (
                  <CommentPost key={index} comment={comment} />
                ))}
            </CommentWrapper>
          </>
        ) : (
          <LoadingWrapper>
            <p>게시물을 불러오는 중...</p>
          </LoadingWrapper>
        )}
      </ContentSection>
      {postId && (
        <CommentInput
          userId={postId}
          setRecentCommentData={setRecentCommentData}
          getComment={getComment}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80vh;
`;

const CommentWrapper = styled.section`
  margin: 20px 16px 16px;
`;

const ContentSection = styled.section`
  height: 84vh;
  overflow: scroll;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: var(--basic-grey);
`;

export default PostDetailContainer;
