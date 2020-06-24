/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserSocialAccounts
// ====================================================

export interface GetUserSocialAccounts_getUserSocialAccounts_instagramAccount {
  __typename: "InstagramAccount";
  id: number | null;
  username: string | null;
  profilePic: string | null;
  followersAmount: number | null;
}

export interface GetUserSocialAccounts_getUserSocialAccounts {
  __typename: "Social";
  id: number | null;
  platformId: number | null;
  username: string | null;
  verified: boolean | null;
  instagramAccount: GetUserSocialAccounts_getUserSocialAccounts_instagramAccount | null;
}

export interface GetUserSocialAccounts {
  getUserSocialAccounts: (GetUserSocialAccounts_getUserSocialAccounts | null)[] | null;
}

export interface GetUserSocialAccountsVariables {
  userId: string;
}
