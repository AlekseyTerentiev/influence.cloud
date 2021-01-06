/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, InstagramAccountStatus, AccountType, AccountLanguage } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface GetMe_me_accounts {
  __typename: "InstagramAccount";
  id: number;
  username: string;
  verified: boolean;
  rating: number;
  statsMediaLinksUrls: string[];
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
  status: InstagramAccountStatus | null;
  accountType: AccountType | null;
  country: string | null;
  region: string | null;
  city: string | null;
  language: AccountLanguage | null;
  statisticDataVerified: boolean;
  impressions: number | null;
  impressionsStory: number | null;
  profileVisits: number | null;
  expectedStoryCost: number | null;
  ownerGender: Gender | null;
  ownerBirthDate: any | null;
}

export interface GetMe_me {
  __typename: "User";
  id: string;
  email: string | null;
  avatarUrl: string | null;
  nickname: string | null;
  givenName: string | null;
  familyName: string | null;
  gender: Gender | null;
  birthDate: any | null;
  phone: string;
  language: string | null;
  locale: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  timezone: string | null;
  balance: GetMe_me_balance;
  completedTasks: number;
  createdTasks: number;
  accounts: GetMe_me_accounts[];
}

export interface GetMe {
  me: GetMe_me | null;
}
