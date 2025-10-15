/**
 * 공통 Validation 유틸리티
 * 이메일, 비밀번호, 사용자 이름, 계정 ID 등의 검증 로직
 */

// 정규식 패턴
export const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const PASSWORD_REGEX = /^[A-Za-z0-9]{6,20}$/;
export const ACCOUNT_ID_REGEX = /^[a-zA-Z0-9._]+$/;

// 상수
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

/**
 * 이메일 유효성 검증
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  return EMAIL_REGEX.test(email);
};

/**
 * 비밀번호 유효성 검증
 */
export const validatePassword = (password: string): boolean => {
  if (!password) return false;
  return PASSWORD_REGEX.test(password);
};

/**
 * 계정 ID 유효성 검증 (영문, 숫자, 밑줄, 마침표)
 */
export const validateAccountId = (accountId: string): boolean => {
  if (!accountId) return false;
  return ACCOUNT_ID_REGEX.test(accountId);
};

/**
 * 사용자 이름 유효성 검증 (2~10자)
 */
export const validateUsername = (username: string): boolean => {
  if (!username) return false;
  return (
    username.length >= USERNAME_MIN_LENGTH &&
    username.length <= USERNAME_MAX_LENGTH
  );
};

/**
 * 이메일 에러 메시지 반환
 */
export const getEmailErrorMessage = (email: string): string => {
  if (!email) return '';
  if (!validateEmail(email)) {
    return '올바르지 않은 이메일 형식입니다.';
  }
  return '';
};

/**
 * 비밀번호 에러 메시지 반환
 */
export const getPasswordErrorMessage = (password: string): string => {
  if (!password) return '';
  if (!validatePassword(password)) {
    return `비밀번호는 ${PASSWORD_MIN_LENGTH}~${PASSWORD_MAX_LENGTH}자 이내로 입력해주세요.`;
  }
  return '';
};

/**
 * 사용자 이름 에러 메시지 반환
 */
export const getUsernameErrorMessage = (username: string): string => {
  if (!username) return '';
  if (!validateUsername(username)) {
    return `${USERNAME_MIN_LENGTH}~${USERNAME_MAX_LENGTH}자 이내로 입력해주세요.`;
  }
  return '';
};

/**
 * 계정 ID 에러 메시지 반환
 */
export const getAccountIdErrorMessage = (accountId: string): string => {
  if (!accountId) return '';
  if (!validateAccountId(accountId)) {
    return '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
  }
  return '';
};
