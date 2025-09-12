import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { HeaderChatNav } from '../../shared/components/Header/Header';
import {
  ChatNav,
  ChattingForm,
  ChattingSend,
  SenderWrapper,
  ChatMessageTime,
  ChatWrapper,
  UserWrapper,
  MyChatting,
  SenderMessage,
  UserMessage,
  CommonWrapper,
  UploadButtonStyle,
} from './ChatRoomStyle';
import { CommentWrapper } from '../../shared/components/Comment/CommentInput/Comment';
import { SImage } from '../../shared/components/UserImage/UserImage';
import buttonImg from '../../shared/assets/images/upload-file.svg';
import BodyGlobal from '../../app/styles/BodyGlobal';
import Layout from "../../app/styles/Layout";

export default function ChatRoom() {
  const [comment, setComment] = useState('');
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const isBtnDisable = comment === '';
  return (
    <Layout>
      <HeaderChatNav>니고네고  판매</HeaderChatNav>
      <BodyGlobal>
        <CommonWrapper>
          <ChatWrapper>
            <SenderWrapper>
              <SImage />
              <SenderMessage>dtextdtext</SenderMessage>
              <ChatMessageTime>12:39</ChatMessageTime>
            </SenderWrapper>
            <SenderWrapper>
              <SImage />
              <SenderMessage>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Numquam eius harum praesentium. Nam, aliquid labore autem
                asperiores quia sapiente sequi ipsa velit praesentium incidunt
                dicta modi nulla non tenetur sequi ipsa velit praesentium
                incidunt dicta modi nulla non tenetur sequi ipsa velit
                praesentium incidunt dicta modi nulla non tenetur sequi ipsa
                velit praesentium incidunt dicta modi nulla non tenetur sequi
                ipsa velit praesentium incidunt dicta modi nulla non tenetur
                sequi ipsa velit praesentium incidunt dicta modi nulla non
                tenetur sequi ipsa velit praesentium incidunt dicta modi nulla
                non tenetur sequi ipsa velit praesentium incidunt dicta modi
                nulla non tenetur hic! hic!
              </SenderMessage>
              <ChatMessageTime>12:39</ChatMessageTime>
            </SenderWrapper>

            <UserWrapper>
              <UserMessage>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Numquam eius harum praesentium. Nam, aliquid labore autem
                asperiores quia sapiente sequi ipsa velit praesentium incidunt
                dicta modi nulla non tenetur sequi ipsa velit praesentium
                incidunt dicta modi nulla non tenetur sequi ipsa velit
                praesentium incidunt dicta modi nulla non tenetur sequi ipsa
                velit praesentium incidunt dicta modi nulla non tenetur sequi
                ipsa velit praesentium incidunt dicta modi nulla non tenetur
                sequi ipsa velit praesentium incidunt dicta modi nulla non
                tenetur sequi ipsa velit praesentium incidunt dicta modi nulla
                non tenetur sequi ipsa velit praesentium incidunt dicta modi
                nulla non tenetur hic! hic!
              </UserMessage>
              <ChatMessageTime>12:39</ChatMessageTime>
            </UserWrapper>
          </ChatWrapper>
        </CommonWrapper>
      </BodyGlobal>
      {/* 하단 전송버튼 */}
      {/* <ChatNav> */}
      {/* <UploadButtonStyle>
          <label htmlFor="input" />
          <input id="input" type="file" onChange={handleImageUpload} />
        </UploadButtonStyle> */}

      <CommentWrapper $disableBtn={comment}>
        <form>
          <img src={buttonImg} alt="유저기본이미지" />
          <input
            type="text"
            name="comment"
            value={comment}
            placeholder="메세지 입력하기..."
            onChange={handleCommentChange}
          />
          <button
            className="buttonOnOff"
            type="submit"
            value={comment}
            disabled={isBtnDisable}
          >
            전송
          </button>
        </form>
      </CommentWrapper>
      {/* <ChattingForm>
          <MyChatting placeholder="메시지 입력하기" />
          <ChattingSend>전송</ChattingSend>
        </ChattingForm> */}
      {/* </ChatNav> */}
    </Layout>
  );
}
