/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType, TaskStatus, AccountTaskStatus, AccountTaskRating, FeedBackType, TaskTypeName } from "./globalTypes";

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
  rating: number;
  instagramAccount: UpsertUser_upsertUser_accounts_instagramAccount | null;
}

export interface UpsertUser_upsertUser_createdTasks_accountTasks {
  __typename: "TaskAccountTasks";
  taskId: number;
  accountId: number;
  accountTaskId: number;
  status: AccountTaskStatus;
  username: string;
  profilePic: string;
  commentText: string;
  completedAt: any | null;
  rating: AccountTaskRating | null;
  feedback: FeedBackType | null;
}

export interface UpsertUser_upsertUser_createdTasks_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
}

export interface UpsertUser_upsertUser_createdTasks_instagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
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
  status: TaskStatus;
  accountTasks: UpsertUser_upsertUser_createdTasks_accountTasks[];
  taskType: UpsertUser_upsertUser_createdTasks_taskType;
  instagramCommentTask: UpsertUser_upsertUser_createdTasks_instagramCommentTask;
}

export interface UpsertUser_upsertUser {
  __typename: "DetailedUser";
  id: string;
  email: string | null;
  avatarUrl: string | null;
  nickname: string | null;
  givenName: string | null;
  familyName: string | null;
  gender: string | null;
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
  accounts: UpsertUser_upsertUser_accounts[];
  createdTasks: UpsertUser_upsertUser_createdTasks[];
}

export interface UpsertUser {
  upsertUser: UpsertUser_upsertUser;
}

export interface UpsertUserVariables {
  nickname: string;
  givenName?: string | null;
  familyName?: string | null;
  gender?: string | null;
  birthDate?: any | null;
  phone: string;
  language?: string | null;
  locale?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  timezone?: string | null;
}
