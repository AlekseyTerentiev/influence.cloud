/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMyInstagramAccounts
// ====================================================

export interface GetMyInstagramAccounts_getMyInstagramAccounts {
  __typename: "DetailedInstagramAccount";
  id: number | null;
  username: string | null;
  profilePic: string | null;
  postsAmount: number | null;
  followersAmount: number | null;
  accountType: AccountType | null;
}

export interface GetMyInstagramAccounts {
  getMyInstagramAccounts: (GetMyInstagramAccounts_getMyInstagramAccounts | null)[] | null;
}
