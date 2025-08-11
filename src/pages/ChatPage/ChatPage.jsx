import React from 'react';
import { HeaderBasicNav } from '../../shared/components/Header/Header';
import Navbar from '../../shared/components/Navbar/Navbar';
import ChatUserList from '../../features/chat/components/ChatUserList';
import styled from 'styled-components';
import BodyGlobal from '../../app/styles/BodyGlobal';
import Layout from '../../app/styles/Layout';

const CommonWrapper = styled.section``;

function ChatPage() {
  return (
    <>
      <HeaderBasicNav />
      <BodyGlobal>
        <CommonWrapper>
          <ChatUserList userId="dummyId" />
          <ChatUserList userId="dummyId1" />
          <ChatUserList userId="dummyId523" />
          <ChatUserList userId="dummyId2" />
          <ChatUserList userId="dummyId3" />
          <ChatUserList userId="dummyId325" />
          <ChatUserList userId="dummyId21" />
          <ChatUserList userId="dummyId43" />
          <ChatUserList userId="dummyId2" />
        </CommonWrapper>
      </BodyGlobal>

      <Navbar homeV={true} chatV={false} postV={true} profileV={true} />
    </>
  );
}

export default ChatPage;
