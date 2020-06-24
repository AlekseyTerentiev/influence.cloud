/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyInstagramAccount
// ====================================================

export interface VerifyInstagramAccount_verifyInstagramAccount {
  __typename: "InstagramAccount";
  id: number | null;
  username: string | null;
}

export interface VerifyInstagramAccount {
  verifyInstagramAccount: VerifyInstagramAccount_verifyInstagramAccount | null;
}

export interface VerifyInstagramAccountVariables {
  username: string;
  emojis: string;
}
