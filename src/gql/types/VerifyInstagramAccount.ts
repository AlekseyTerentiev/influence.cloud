/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyInstagramAccount
// ====================================================

export interface VerifyInstagramAccount_verifyInstagramAccount {
  __typename: "DetailedInstagramAccount";
  id: number | null;
  username: string | null;
  profilePic: string | null;
  postsAmount: number | null;
  followersAmount: number | null;
  accountType: AccountType | null;
}

export interface VerifyInstagramAccount {
  verifyInstagramAccount: VerifyInstagramAccount_verifyInstagramAccount | null;
}

export interface VerifyInstagramAccountVariables {
  username: string;
  emojis: string;
}
