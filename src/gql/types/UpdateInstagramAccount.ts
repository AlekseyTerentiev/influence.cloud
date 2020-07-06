/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateInstagramAccount
// ====================================================

export interface UpdateInstagramAccount_updateInstagramAccount {
  __typename: "DetailedInstagramAccount";
  id: number;
  username: string;
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
  accountType: AccountType | null;
  country: string;
  region: string | null;
  city: string;
  language: string;
}

export interface UpdateInstagramAccount {
  updateInstagramAccount: UpdateInstagramAccount_updateInstagramAccount;
}

export interface UpdateInstagramAccountVariables {
  id: number;
  username?: string | null;
  accountType?: AccountType | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  language?: string | null;
}
