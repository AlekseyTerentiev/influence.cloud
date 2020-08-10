/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType, TaskStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: DetailedUserData
// ====================================================

export interface DetailedUserData_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface DetailedUserData_accounts_instagramAccount {
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

export interface DetailedUserData_accounts {
  __typename: "SocialAccount";
  id: number;
  username: string;
  verified: boolean;
  rating: number;
  instagramAccount: DetailedUserData_accounts_instagramAccount | null;
}

export interface DetailedUserData_createdTasks_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface DetailedUserData_createdTasks_instagramCommentTask_post {
  __typename: "InstagramPost";
  displayUrl: string;
  description: string | null;
  ownerUsername: string;
}

export interface DetailedUserData_createdTasks_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: DetailedUserData_createdTasks_instagramCommentTask_post | null;
}

export interface DetailedUserData_createdTasks {
  __typename: "DetailedTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  taskType: DetailedUserData_createdTasks_taskType | null;
  instagramCommentTask: DetailedUserData_createdTasks_instagramCommentTask | null;
}

export interface DetailedUserData {
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
  balance: DetailedUserData_balance;
  completedTasks: number;
  accounts: DetailedUserData_accounts[];
  createdTasks: DetailedUserData_createdTasks[];
}
