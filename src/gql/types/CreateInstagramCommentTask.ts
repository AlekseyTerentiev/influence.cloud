/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountLanguage, Gender, TaskStatus, TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInstagramCommentTask
// ====================================================

export interface CreateInstagramCommentTask_createInstagramCommentTask_InstagramCommentTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface CreateInstagramCommentTask_createInstagramCommentTask_InstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface CreateInstagramCommentTask_createInstagramCommentTask_InstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  inProgressAccountTasks: number;
  waitingAccountTasks: number;
  completedAccountTasks: number;
  taskType: CreateInstagramCommentTask_createInstagramCommentTask_InstagramCommentTask_taskType;
  languages: AccountLanguage[] | null;
  genders: Gender[] | null;
  ageFrom: number | null;
  ageTo: number | null;
  countries: string[] | null;
  followers: number | null;
  post: CreateInstagramCommentTask_createInstagramCommentTask_InstagramCommentTask_post;
}

export interface CreateInstagramCommentTask_createInstagramCommentTask_InstagramStoryTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface CreateInstagramCommentTask_createInstagramCommentTask_InstagramStoryTask {
  __typename: "InstagramStoryTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  inProgressAccountTasks: number;
  waitingAccountTasks: number;
  completedAccountTasks: number;
  taskType: CreateInstagramCommentTask_createInstagramCommentTask_InstagramStoryTask_taskType;
  languages: AccountLanguage[] | null;
  genders: Gender[] | null;
  ageFrom: number | null;
  ageTo: number | null;
  countries: string[] | null;
  followers: number | null;
  costFrom: number;
  costTo: number;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type CreateInstagramCommentTask_createInstagramCommentTask = CreateInstagramCommentTask_createInstagramCommentTask_InstagramCommentTask | CreateInstagramCommentTask_createInstagramCommentTask_InstagramStoryTask;

export interface CreateInstagramCommentTask {
  createInstagramCommentTask: CreateInstagramCommentTask_createInstagramCommentTask;
}

export interface CreateInstagramCommentTaskVariables {
  taskTypeId: number;
  description: string;
  expiredAt: any;
  totalBudget: number;
  bonusRate: number;
  postUrl: string;
  languages: AccountLanguage[];
  genders: Gender[];
  ageFrom: number;
  ageTo: number;
  countries: string[];
}
