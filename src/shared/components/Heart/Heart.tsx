import React, { useEffect, useState } from 'react';
import { ReactComponent as BtnHeartF } from '../../assets/icons/BtnHeartF.svg';
import UseFetchToken from '../../hooks/UseFetchToken';

interface UserData {
  id: string;
  hearted: boolean;
}

interface HeartProps {
  userData: UserData;
}

export default function Heart({ userData }: HeartProps) {
  const [like, setLike] = useState<boolean>(userData.hearted);
  const [likeCount, setLikeCount] = useState<number>(0);
  const { postHeart, deleteHeart } = UseFetchToken();

  const HeartCount = () => {
    setLike(!like);
  };

  useEffect(() => {
    if (like) {
      postHeart(userData.id).then(res => {
        if (res?.data?.post?.heartCount !== undefined) {
          setLikeCount(res.data.post.heartCount);
        }
      });
      // postHeart(userId.id).then(res => console.log(res));
    } else {
      deleteHeart(userData.id).then(res => {
        if (res?.data?.post?.heartCount !== undefined) {
          setLikeCount(res.data.post.heartCount);
        }
      });
    }
  }, [like]);

  return (
    <button type="button" className="btn" onClick={HeartCount}>
      <BtnHeartF
        fill={like ? '#EF4343' : '#fff'}
        stroke={like ? '#EF4343' : '#767676'}
      />
      <span>{likeCount}</span>
    </button>
  );
}