/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMyInstagramAccounts
// ====================================================

export interface GetMyInstagramAccounts_myInstagramAccounts {
  __typename: "DetailedInstagramAccount";
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

export interface GetMyInstagramAccounts {
  myInstagramAccounts: GetMyInstagramAccounts_myInstagramAccounts[];
}
