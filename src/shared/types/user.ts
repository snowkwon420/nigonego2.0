/**
 * 사용자 관련 타입 정의
 */

export interface User {
  _id: string;
  username: string;
  accountname: string;
  email?: string;
  intro: string;
  image: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
}

export interface UserProfile extends User {
  isfollow?: boolean;
}

export interface AuthResponse {
  user: User & {
    token: string;
  };
}

export interface UserInfoResponse {
  user: User;
}
