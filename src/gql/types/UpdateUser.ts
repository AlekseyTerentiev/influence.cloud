/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, AccountType, AccountLanguage } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface UpdateUser_updateUser_accounts {
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

export interface UpdateUser_updateUser {
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
  balance: UpdateUser_updateUser_balance;
  completedTasks: number;
  createdTasks: number;
  accounts: UpdateUser_updateUser_accounts[];
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  nickname?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  gender?: Gender | null;
  birthDate?: any | null;
  phone?: string | null;
  language?: string | null;
  locale?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  timezone?: string | null;
}
