import { useEffect, useState } from 'react';
import { ReactComponent as BtnHeartF } from '../../assets/icons/BtnHeartF.svg';
import { useTogglePostHeartMutation } from '../../../features/post/postQueries';

interface UserData {
  id: string;
  hearted: boolean;
  heartCount?: number;
}

interface HeartProps {
  userData: UserData;
}

export default function Heart({ userData }: HeartProps) {
  const [like, setLike] = useState<boolean>(userData.hearted);
  const [likeCount, setLikeCount] = useState<number>(userData.heartCount ?? 0);
  const toggleHeartMutation = useTogglePostHeartMutation(userData.id);

  const getHeartCount = (response: any) =>
    response?.post?.heartCount ?? response?.data?.post?.heartCount;

  useEffect(() => {
    setLike(userData.hearted);
    setLikeCount(userData.heartCount ?? 0);
  }, [userData.hearted, userData.heartCount]);

  const handleClickHeart = async () => {
    const nextLike = !like;
    const previousLike = like;
    const previousLikeCount = likeCount;

    setLike(nextLike);
    setLikeCount((count) => Math.max(0, count + (nextLike ? 1 : -1)));

    try {
      const response = await toggleHeartMutation.mutateAsync(nextLike);
      const serverHeartCount = getHeartCount(response);

      if (typeof serverHeartCount === 'number') {
        setLikeCount(serverHeartCount);
      }
    } catch (error) {
      setLike(previousLike);
      setLikeCount(previousLikeCount);
    }
  };

  return (
    <button type="button" className="btn" onClick={handleClickHeart}>
      <BtnHeartF
        fill={like ? '#EF4343' : '#fff'}
        stroke={like ? '#EF4343' : '#767676'}
      />
      <span>{likeCount}</span>
    </button>
  );
}
