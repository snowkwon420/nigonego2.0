/**
 * 댓글 관련 타입 정의
 */

export interface CommentAuthor {
  _id: string;
  accountname: string;
  image: string;
  username: string;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
}

export interface CommentListResponse {
  comments: Comment[];
}

export interface CommentCreateResponse {
  comment: Comment;
}
