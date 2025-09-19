import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HomePostGridList from './HomePostGridList';

interface HomePostGridProps {
  accountname: string;
}

interface YourProfileData {
  id: string;
  content: string;
  image: string;
  commentCount: number;
  author: any;
  hearted: boolean;
}

export default function HomePostGrid({ accountname }: HomePostGridProps) {
  const [yourProfileData, setYourProfileData] = useState<YourProfileData[]>([]);

  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFkMDkxYjJjYjIwNTY2MzM1ZjVmMCIsImV4cCI6MTY5MjAwMjk4NiwiaWF0IjoxNjg2ODE4OTg2fQ.IXRWQpeGB-5D3U3iN4FSKNf2F92wGVA_FLw4SpqLc20';
    try {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_BASE_URL || 'http://eager-emogene-nigonego-9b3dee94.koyeb.app'}/post/${accountname}/userpost/?limit=999`,

        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }).then(response => {
        setYourProfileData(response.data.post);
      });
    } catch (err) {
      console.log('에러');
    }
  }, []);

  return (
    <>
      {yourProfileData.length > 0 && (
        <HomePostGridList userPostData={yourProfileData} />
      )}
    </>
  );
}