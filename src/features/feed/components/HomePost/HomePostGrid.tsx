import HomePostGridList from './HomePostGridList';
import { useUserPostsQuery } from '../../../post/postQueries';

interface HomePostGridProps {
  accountname: string;
}

export default function HomePostGrid({ accountname }: HomePostGridProps) {
  const { data: yourProfileData = [], isLoading } = useUserPostsQuery(accountname);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#767676' }}>로딩 중...</div>;
  }

  return (
    <>
      {yourProfileData.length > 0 ? (
        <HomePostGridList userPostData={yourProfileData} />
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: '#767676' }}>
          게시물이 없습니다.
        </div>
      )}
    </>
  );
}
