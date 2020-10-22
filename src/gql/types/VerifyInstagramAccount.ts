/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType, AccountLanguage, Gender } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyInstagramAccount
// ====================================================

export interface VerifyInstagramAccount_verifyInstagramAccount {
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
  language: AccountLanguage | null;
  statisticDataVerified: boolean;
  impressions: number | null;
  impressionsStory: number | null;
  profileVisits: number | null;
  statsMediaLinksUrls: string[];
  expectedStoryCost: number | null;
  ownerGender: Gender | null;
  ownerBirthDate: any | null;
}

export interface VerifyInstagramAccount {
  verifyInstagramAccount: VerifyInstagramAccount_verifyInstagramAccount;
}

export interface VerifyInstagramAccountVariables {
  username: string;
  emojis: string;
}
