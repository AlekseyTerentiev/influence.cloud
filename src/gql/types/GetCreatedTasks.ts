/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, AccountTaskStatus, AccountTaskRating, FeedBackType, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatedTasks
// ====================================================

export interface GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_accountTasks {
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

export interface GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_taskType {
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

export interface GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface GetCreatedTasks_createdTasks_tasks_InstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  accountTasks: GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_accountTasks[];
  taskType: GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_taskType;
  post: GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_post;
}

export interface GetCreatedTasks_createdTasks_tasks_InstagramStoryTask_accountTasks {
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

export interface GetCreatedTasks_createdTasks_tasks_InstagramStoryTask_taskType {
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

export interface GetCreatedTasks_createdTasks_tasks_InstagramStoryTask {
  __typename: "InstagramStoryTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  accountTasks: GetCreatedTasks_createdTasks_tasks_InstagramStoryTask_accountTasks[];
  taskType: GetCreatedTasks_createdTasks_tasks_InstagramStoryTask_taskType;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type GetCreatedTasks_createdTasks_tasks = GetCreatedTasks_createdTasks_tasks_InstagramCommentTask | GetCreatedTasks_createdTasks_tasks_InstagramStoryTask;

export interface GetCreatedTasks_createdTasks_pageInfo {
  __typename: "Pagination";
  beforeCursor: string | null;
  afterCursor: string | null;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface GetCreatedTasks_createdTasks {
  __typename: "CreatedTasks";
  tasks: GetCreatedTasks_createdTasks_tasks[];
  pageInfo: GetCreatedTasks_createdTasks_pageInfo | null;
}

export interface GetCreatedTasks {
  createdTasks: GetCreatedTasks_createdTasks;
}

export interface GetCreatedTasksVariables {
  beforeCursor?: string | null;
  afterCursor?: string | null;
  limit?: number | null;
}
