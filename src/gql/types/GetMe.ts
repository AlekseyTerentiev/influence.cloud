/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface GetMe_me_accounts_instagramAccount {
  __typename: "DetailedInstagramAccount";
  id: number;
  username: string;
  profilePic: string;
  postsAmount: number;
  followersAmount: number;
  accountType: AccountType | null;
  country: string;
  region: string | null;
  city: string;
  language: string;
}

export interface GetMe_me_accounts {
  __typename: "DetailedSocialAccount";
  id: number;
  username: string;
  verified: boolean;
  instagramAccount: GetMe_me_accounts_instagramAccount | null;
}

export interface GetMe_me_createdTasks_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface GetMe_me_createdTasks_instagramCommentTask {
  __typename: "InstagramCommentTask";
  postUrl: string;
}

export interface GetMe_me_createdTasks {
  __typename: "Task";
  id: number;
  description: string;
  verified: boolean;
  expireAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  taskType: GetMe_me_createdTasks_taskType | null;
  instagramCommentTask: GetMe_me_createdTasks_instagramCommentTask | null;
}

export interface GetMe_me {
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
  balance: GetMe_me_balance | null;
  completedTasks: number;
  accounts: GetMe_me_accounts[];
  createdTasks: GetMe_me_createdTasks[];
}

export interface GetMe {
  me: GetMe_me | null;
}
