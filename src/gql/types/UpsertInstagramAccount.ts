/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertInstagramAccount
// ====================================================

export interface UpsertInstagramAccount_upsertInstagramAccount {
  __typename: "NewInstagramAccount";
  id: number;
  username: string;
  emojis: string;
}

export interface UpsertInstagramAccount {
  upsertInstagramAccount: UpsertInstagramAccount_upsertInstagramAccount;
}

export interface UpsertInstagramAccountVariables {
  username: string;
}
