/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserSocialAccounts
// ====================================================

export interface GetUserSocialAccounts_getUserSocialAccounts_instagramAccount {
  __typename: "InstagramAccount";
  id: number;
  username: string;
  profilePic: string;
  followersAmount: number;
}

export interface GetUserSocialAccounts_getUserSocialAccounts {
  __typename: "Social";
  id: number;
  platformId: number | null;
  username: string;
  verified: boolean;
  instagramAccount: GetUserSocialAccounts_getUserSocialAccounts_instagramAccount | null;
}

export interface GetUserSocialAccounts {
  getUserSocialAccounts: GetUserSocialAccounts_getUserSocialAccounts[];
}

export interface GetUserSocialAccountsVariables {
  userId: string;
}
