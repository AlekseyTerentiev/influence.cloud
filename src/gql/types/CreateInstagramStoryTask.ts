/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountLanguage, Gender, TaskStatus, TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInstagramStoryTask
// ====================================================

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  activeAccountTasks: number;
  waitingAccountTasks: number;
  taskType: CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_taskType;
  languages: AccountLanguage[] | null;
  genders: Gender[] | null;
  ageFrom: number | null;
  ageTo: number | null;
  countries: string[] | null;
  followers: number | null;
  post: CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_post;
}

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask {
  __typename: "InstagramStoryTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  activeAccountTasks: number;
  waitingAccountTasks: number;
  taskType: CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask_taskType;
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

export type CreateInstagramStoryTask_createInstagramStoryTask = CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask | CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask;

export interface CreateInstagramStoryTask {
  createInstagramStoryTask: CreateInstagramStoryTask_createInstagramStoryTask;
}

export interface CreateInstagramStoryTaskVariables {
  taskTypeId: number;
  description: string;
  expiredAt: any;
  totalBudget: number;
  bonusRate: number;
  costFrom: number;
  costTo: number;
  needApprove: boolean;
  accountUsername?: string | null;
  websiteUrl?: string | null;
  layoutMediaUrls: string[];
  languages: AccountLanguage[];
  genders: Gender[];
  ageFrom: number;
  ageTo: number;
  countries: string[];
  followersAmount: number;
}
