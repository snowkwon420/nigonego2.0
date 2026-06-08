import React, { useState } from 'react';
import { HeaderSearchNav } from '../../shared/components/Header/Header';
import Navbar from '../../shared/components/Navbar/Navbar';
import UserSearch from '../../shared/components/User/UserSearch';
import SearchWrapper from './SearchPageStyle';
import Layout from "../../app/styles/Layout";

interface SearchData {
  author: {
    accountname: string;
    image: string;
    username: string;
  };
}

function SearchPage() {
  const [data] = useState<SearchData | null>(null);
  
  return (
    <Layout>
      <HeaderSearchNav />
      <SearchWrapper>
        {data && <UserSearch data={data} />}
      </SearchWrapper>
      <Navbar homeV={false} chatV={true} postV={true} profileV={true} />
    </Layout>
  );
}

export default SearchPage;
