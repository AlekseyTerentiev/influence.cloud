/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateInstagramAccount
// ====================================================

export interface UpdateInstagramAccount_updateInstagramAccount {
  __typename: "InstagramAccount";
  id: number | null;
  instagramId: string | null;
  username: string | null;
  profilePic: string | null;
  postsAmount: number | null;
  followersAmount: number | null;
  accountType: AccountType | null;
}

export interface UpdateInstagramAccount {
  updateInstagramAccount: UpdateInstagramAccount_updateInstagramAccount | null;
}

export interface UpdateInstagramAccountVariables {
  username: string;
  accountType?: AccountType | null;
}
