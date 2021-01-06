/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, InstagramAccountStatus, AccountType, AccountLanguage } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpsertUser
// ====================================================

export interface UpsertUser_upsertUser_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface UpsertUser_upsertUser_accounts {
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

export interface UpsertUser_upsertUser {
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
  balance: UpsertUser_upsertUser_balance;
  completedTasks: number;
  createdTasks: number;
  accounts: UpsertUser_upsertUser_accounts[];
}

export interface UpsertUser {
  upsertUser: UpsertUser_upsertUser;
}

export interface UpsertUserVariables {
  nickname: string;
  givenName?: string | null;
  familyName?: string | null;
  gender?: Gender | null;
  birthDate?: any | null;
  phone: string;
  language?: string | null;
  locale?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  timezone?: string | null;
}
