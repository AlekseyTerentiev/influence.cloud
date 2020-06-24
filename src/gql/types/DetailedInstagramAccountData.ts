/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DetailedInstagramAccountData
// ====================================================

export interface DetailedInstagramAccountData {
  __typename: "DetailedInstagramAccount";
  id: number | null;
  username: string | null;
  profilePic: string | null;
  postsAmount: number | null;
  followersAmount: number | null;
  accountType: AccountType | null;
}
