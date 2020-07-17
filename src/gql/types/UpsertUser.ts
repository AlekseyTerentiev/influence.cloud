/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpsertUser
// ====================================================

export interface UpsertUser_upsertUser_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface UpsertUser_upsertUser_accounts_instagramAccount {
  __typename: "DetailedInstagramAccount";
  id: number;
  username: string;
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
  accountType: AccountType | null;
  country: string | null;
  region: string | null;
  city: string | null;
  language: string | null;
}

export interface UpsertUser_upsertUser_accounts {
  __typename: "SocialAccount";
  id: number;
  username: string;
  verified: boolean;
  instagramAccount: UpsertUser_upsertUser_accounts_instagramAccount | null;
}

export interface UpsertUser_upsertUser_createdTasks_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface UpsertUser_upsertUser_createdTasks_instagramCommentTask_post {
  __typename: "InstagramPost";
  displayUrl: string;
  description: string | null;
}

export interface UpsertUser_upsertUser_createdTasks_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: UpsertUser_upsertUser_createdTasks_instagramCommentTask_post | null;
}

export interface UpsertUser_upsertUser_createdTasks {
  __typename: "DetailedTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  taskType: UpsertUser_upsertUser_createdTasks_taskType | null;
  instagramCommentTask: UpsertUser_upsertUser_createdTasks_instagramCommentTask | null;
}

export interface UpsertUser_upsertUser {
  __typename: "DetailedUser";
  id: string;
  email: string;
  avatarUrl: string;
  nickname: string;
  givenName: string;
  familyName: string;
  gender: string;
  birthDate: any;
  phone: string;
  language: string;
  locale: string;
  balance: UpsertUser_upsertUser_balance;
  completedTasks: number;
  accounts: UpsertUser_upsertUser_accounts[];
  createdTasks: UpsertUser_upsertUser_createdTasks[];
}

export interface UpsertUser {
  upsertUser: UpsertUser_upsertUser;
}

export interface UpsertUserVariables {
  nickname: string;
  givenName: string;
  familyName: string;
  gender: string;
  birthDate: any;
  phone: string;
  language: string;
  locale: string;
}
