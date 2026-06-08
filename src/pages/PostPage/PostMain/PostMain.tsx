import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import PostDetailContainer from '../../../features/post/components/PostDetailContainer';
import { useLocation } from 'react-router-dom';

/**
 * 게시물 상세 페이지
 * - 레이아웃과 헤더만 담당
 * - 비즈니스 로직은 PostDetailContainer에 위임
 */
function PostMain() {
  const location = useLocation();
  const postId = location.state?.id;

  if (!postId) {
    return (
      <>
        <HeaderBasicNav />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>게시물을 찾을 수 없습니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderBasicNav />
      <PostDetailContainer postId={postId} />
    </>
  );
}

export default PostMain;
