/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DetailedUserData
// ====================================================

export interface DetailedUserData_balance {
  __typename: "UserBalance";
  id: number;
  balance: number;
}

export interface DetailedUserData_accounts_instagramAccount {
  __typename: "InstagramAccount";
  id: number;
  username: string;
  profilePic: string;
  followersAmount: number;
}

export interface DetailedUserData_accounts {
  __typename: "SocialAccount";
  id: number;
  username: string;
  verified: boolean;
  instagramAccount: DetailedUserData_accounts_instagramAccount | null;
}

export interface DetailedUserData_createdTasks_taskType {
  __typename: "TaskType";
  id: number;
  title: string;
  name: string;
  description: string;
}

export interface DetailedUserData_createdTasks_instagramCommentTask {
  __typename: "InstagramCommentTask";
  postUrl: string;
}

export interface DetailedUserData_createdTasks {
  __typename: "Task";
  id: number;
  description: string;
  verified: boolean;
  expireAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  taskType: DetailedUserData_createdTasks_taskType | null;
  instagramCommentTask: DetailedUserData_createdTasks_instagramCommentTask | null;
}

export interface DetailedUserData {
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
  balance: DetailedUserData_balance | null;
  completedTasks: number;
  accounts: DetailedUserData_accounts[];
  createdTasks: DetailedUserData_createdTasks[];
}
