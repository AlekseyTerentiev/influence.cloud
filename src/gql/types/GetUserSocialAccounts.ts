/* tslint:disable */
/* eslint-disable */

// ====================================================
// GraphQL query operation: GetUserSocialAccounts
// ====================================================

import { GetInstagramAccount_instagramAccount } from './GetInstagramAccount';

export interface GetUserSocialAccounts_userSocialAccounts {
  __typename: 'UserSocialAccount';
  id: number;
  platformId: number;
  username: string;
  verified: boolean;
  instagramAccount: GetInstagramAccount_instagramAccount;
}

export interface GetUserSocialAccounts {
  getUserSocialAccounts: GetUserSocialAccounts_userSocialAccounts[];
}
