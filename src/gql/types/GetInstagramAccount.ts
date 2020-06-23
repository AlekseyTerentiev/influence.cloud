/* tslint:disable */
/* eslint-disable */

// ====================================================
// GraphQL query operation: InstagramAccount
// ====================================================

import { AccountType } from './globalTypes';

export interface GetInstagramAccount_instagramAccount {
  __typename: 'InstagramAccount';
  id: number;
  username: string;
  instagramId: string;
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
  accountType: AccountType;
}

export interface GetInstagramAccount {
  getInstagramAccount: GetInstagramAccount_instagramAccount;
}
