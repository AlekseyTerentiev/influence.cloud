/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyInstagramAccount
// ====================================================

export interface VerifyInstagramAccount_verifyInstagramAccount {
  __typename: "InstagramAccount";
  id: number;
  username: string;
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
  accountType: AccountType | null;
  country: string | null;
  region: string | null;
  city: string | null;
  language: string | null;
}

export interface VerifyInstagramAccount {
  verifyInstagramAccount: VerifyInstagramAccount_verifyInstagramAccount;
}

export interface VerifyInstagramAccountVariables {
  username: string;
  emojis: string;
}
