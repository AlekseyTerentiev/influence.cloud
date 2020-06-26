/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertUser
// ====================================================

export interface UpsertUser_upsertUser {
  __typename: "User";
  id: string;
  email: string;
  avatarUrl: string;
  nickname: string;
  givenName: string;
  familyName: string;
  gender: string;
  birthDate: any;
  phone: string;
  language: string;
  locale: string;
}

export interface UpsertUser {
  upsertUser: UpsertUser_upsertUser;
}

export interface UpsertUserVariables {
  nickname: string;
  givenName: string;
  familyName: string;
  gender: string;
  birthDate: any;
  phone: string;
  language: string;
  locale: string;
}
