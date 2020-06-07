/* tslint:disable */
/* eslint-disable */

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  // __typename: "UserEntity";
  id: string;
  email: string;
  avatar_url: string;
  nickname: string;
  family_name: string;
  given_name: string;
  birthdate: string;
  gender: string;
  phone: string;
  language: string;
  locale: string;
}

export interface GetUser {
  getUser: GetUser_user;
}
