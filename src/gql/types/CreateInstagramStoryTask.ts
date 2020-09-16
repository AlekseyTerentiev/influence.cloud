/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, AccountTaskStatus, AccountTaskRating, FeedBackType, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInstagramStoryTask
// ====================================================

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_accountTasks {
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

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_taskType {
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
  accountTasks: CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_accountTasks[];
  taskType: CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_taskType;
  post: CreateInstagramStoryTask_createInstagramStoryTask_InstagramCommentTask_post;
}

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask_accountTasks {
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

export interface CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask_taskType {
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
  accountTasks: CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask_accountTasks[];
  taskType: CreateInstagramStoryTask_createInstagramStoryTask_InstagramStoryTask_taskType;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
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
  needApprove: boolean;
  accountUsername?: string | null;
  websiteUrl?: string | null;
}
