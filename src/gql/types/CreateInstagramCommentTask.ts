/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, AccountTaskStatus, AccountTaskRating, FeedBackType, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInstagramCommentTask
// ====================================================

export interface CreateInstagramCommentTask_createInstagramCommentTask_accountTasks {
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

export interface CreateInstagramCommentTask_createInstagramCommentTask_taskType {
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

export interface CreateInstagramCommentTask_createInstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface CreateInstagramCommentTask_createInstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  accountTasks: CreateInstagramCommentTask_createInstagramCommentTask_accountTasks[];
  taskType: CreateInstagramCommentTask_createInstagramCommentTask_taskType;
  post: CreateInstagramCommentTask_createInstagramCommentTask_post;
}

export interface CreateInstagramCommentTask {
  createInstagramCommentTask: CreateInstagramCommentTask_createInstagramCommentTask;
}

export interface CreateInstagramCommentTaskVariables {
  taskTypeId: number;
  postUrl: string;
  description: string;
  expiredAt: any;
  totalBudget: number;
  bonusRate: number;
}
