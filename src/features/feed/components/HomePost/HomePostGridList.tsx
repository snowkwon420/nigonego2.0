import React from 'react';
import styled from 'styled-components';
import HomePostGridListItem from './HomePostGridListItem';

interface UserPostData {
  image: string;
}

interface HomePostGridListProps {
  userPostData: UserPostData[];
}

export default function HomePostGridList({
  userPostData,
}: HomePostGridListProps) {
  return (
    <GridWrapp>
      {userPostData.map((item, index) => {
        return (
          <div key={index}>
            <HomePostGridListItem img={{ image: item.image }} />;
          </div>
        );
      })}
    </GridWrapp>
  );
}

const GridWrapp = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  height: 150px;
  margin-right: 10px;
  gap: 10px;
`;