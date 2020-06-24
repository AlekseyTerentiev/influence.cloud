/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertInstagramAccount
// ====================================================

export interface UpsertInstagramAccount_upsertInstagramAccount {
  __typename: "NewInstagramAccount";
  username: string | null;
  emojis: string | null;
}

export interface UpsertInstagramAccount {
  upsertInstagramAccount: UpsertInstagramAccount_upsertInstagramAccount | null;
}

export interface UpsertInstagramAccountVariables {
  username: string;
}
