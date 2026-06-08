import { useCallback, useEffect, useState } from 'react';
import HomePostGridList from './HomePostGridList';
import { usePostApi } from '../../../post/usePostApi';
import { User } from '../../../../shared/types';

interface HomePostGridProps {
  accountname: string;
}

interface YourProfileData {
  id: string;
  content: string;
  image: string;
  commentCount: number;
  author: User;
  hearted: boolean;
}

export default function HomePostGrid({ accountname }: HomePostGridProps) {
  const [yourProfileData, setYourProfileData] = useState<YourProfileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getPostListLimit } = usePostApi();

  const loadPosts = useCallback(async () => {
    try {
      const response = await getPostListLimit(accountname);
      if (response?.post) {
        setYourProfileData(response.post);
      } else if (response?.data?.post) {
        setYourProfileData(response.data.post);
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setIsLoading(false);
    }
  }, [accountname, getPostListLimit]);

  useEffect(() => {
    if (accountname) {
      loadPosts();
    }
  }, [accountname, loadPosts]);

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
