/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetInstagramAccounts
// ====================================================

export interface GetInstagramAccounts_getInstagramAccounts {
  __typename: "InstagramAccount";
  id: number | null;
  instagramId: string | null;
  username: string | null;
  profilePic: string | null;
  postsAmount: number | null;
  followersAmount: number | null;
  accountType: AccountType | null;
}

export interface GetInstagramAccounts {
  getInstagramAccounts: (GetInstagramAccounts_getInstagramAccounts | null)[] | null;
}
