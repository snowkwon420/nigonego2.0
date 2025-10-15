/**
 * 게시물 관련 타입 정의
 */

import { User } from './user';

export interface Post {
  id: string;
  author: User;
  content: string;
  image: string;
  heartCount: number;
  hearted: boolean;
  commentCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface PostListResponse {
  posts: Post[];
}

export interface PostDetailResponse {
  post: Post;
}

export interface PostUploadRequest {
  post: {
    content: string;
    image: string;
  };
}
