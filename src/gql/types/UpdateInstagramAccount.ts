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
  id: number;
  username: string;
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
  rating: number;
  verified: boolean;
  accountType: AccountType | null;
  country: string | null;
  region: string | null;
  city: string | null;
  language: string | null;
  statisticDataVerified: boolean;
  impressions: number | null;
  impressionsStory: number | null;
  profileVisits: number | null;
  statsMediaLinksUrls: string[];
  expectedStoryCost: number | null;
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
  impressions?: number | null;
  impressionsStory?: number | null;
  profileVisits?: number | null;
  statsMediaLinksUrls?: string[] | null;
  expectedStoryCost?: number | null;
}
