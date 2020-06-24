/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertUser
// ====================================================

export interface UpsertUser_upsertUser {
  __typename: "User";
  id: string | null;
  email: string | null;
  avatarUrl: string | null;
  nickname: string | null;
  givenName: string | null;
  familyName: string | null;
  gender: string | null;
  birthDate: any | null;
  phone: string | null;
  language: string | null;
  locale: string | null;
}

export interface UpsertUser {
  upsertUser: UpsertUser_upsertUser | null;
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
