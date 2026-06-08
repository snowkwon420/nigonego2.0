import styled from 'styled-components';
import HomePost from '../../feed/components/HomePost/HomePost';
import CommentInput from '../../../shared/components/Comment/CommentInput/Comment';
import CommentPost from '../../../shared/components/Comment/CommentPost/CommentPost';
import { usePostDetailQuery } from '../postQueries';
import { useCommentListQuery } from '../../comment/commentQueries';
import { Comment } from '../../../shared/types';

interface PostDetailContainerProps {
  postId: string;
}

/**
 * 게시물 상세 정보와 댓글을 표시하는 컨테이너
 */
function PostDetailContainer({ postId }: PostDetailContainerProps) {
  const { data: postData, isLoading } = usePostDetailQuery(postId);
  const { data: commentData = [] } = useCommentListQuery(postId);

  return (
    <Wrapper>
      <ContentSection>
        {postData ? (
          <>
            <HomePost data={postData} />
            <CommentWrapper>
              {commentData.length > 0 &&
                commentData.map((comment: Comment, index: number) => (
                  <CommentPost key={index} comment={comment} />
                ))}
            </CommentWrapper>
          </>
        ) : isLoading ? (
          <LoadingWrapper>
            <p>게시물을 불러오는 중...</p>
          </LoadingWrapper>
        ) : (
          <LoadingWrapper>
            <p>게시물을 불러올 수 없습니다.</p>
          </LoadingWrapper>
        )}
      </ContentSection>
      {postId && (
        <CommentInput userId={postId} />
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
