/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, AccountType, AccountLanguage } from "./globalTypes";

// ====================================================
// GraphQL fragment: UserData
// ====================================================

export interface UserData_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface UserData_accounts {
  __typename: "InstagramAccount";
  id: number;
  username: string;
  verified: boolean;
  rating: number;
  statsMediaLinksUrls: string[];
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
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
}

export interface UserData {
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
  balance: UserData_balance;
  completedTasks: number;
  createdTasks: number;
  accounts: UserData_accounts[];
}
