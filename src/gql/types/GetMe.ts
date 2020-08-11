/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType, TaskStatus } from "./globalTypes";

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
  country: string | null;
  region: string | null;
  city: string | null;
  language: string | null;
}

export interface GetMe_me_accounts {
  __typename: "SocialAccount";
  id: number;
  username: string;
  verified: boolean;
  rating: number;
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

export interface GetMe_me_createdTasks_instagramCommentTask_post {
  __typename: "InstagramPost";
  displayUrl: string;
  description: string | null;
  ownerUsername: string;
}

export interface GetMe_me_createdTasks_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: GetMe_me_createdTasks_instagramCommentTask_post | null;
}

export interface GetMe_me_createdTasks {
  __typename: "DetailedTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  taskType: GetMe_me_createdTasks_taskType | null;
  instagramCommentTask: GetMe_me_createdTasks_instagramCommentTask | null;
}

export interface GetMe_me {
  __typename: "DetailedUser";
  id: string;
  email: string | null;
  avatarUrl: string;
  nickname: string;
  givenName: string;
  familyName: string;
  gender: string;
  birthDate: any;
  phone: string;
  language: string;
  locale: string;
  country: string | null;
  city: string | null;
  region: string | null;
  timezone: string | null;
  balance: GetMe_me_balance;
  completedTasks: number;
  accounts: GetMe_me_accounts[];
  createdTasks: GetMe_me_createdTasks[];
}

export interface GetMe {
  me: GetMe_me | null;
}
