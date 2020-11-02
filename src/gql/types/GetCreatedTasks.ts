/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, TaskTypeName, PayoutType, AccountLanguage, Gender } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatedTasks
// ====================================================

export interface GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_taskType {
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
  activeAccountTasks: number;
  waitingAccountTasks: number;
  taskType: GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_taskType;
  languages: AccountLanguage[] | null;
  genders: Gender[] | null;
  ageFrom: number | null;
  ageTo: number | null;
  countries: string[] | null;
  followers: number | null;
  post: GetCreatedTasks_createdTasks_tasks_InstagramCommentTask_post;
}

export interface GetCreatedTasks_createdTasks_tasks_InstagramStoryTask_taskType {
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
  activeAccountTasks: number;
  waitingAccountTasks: number;
  taskType: GetCreatedTasks_createdTasks_tasks_InstagramStoryTask_taskType;
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
  pageInfo: GetCreatedTasks_createdTasks_pageInfo;
}

export interface GetCreatedTasks {
  createdTasks: GetCreatedTasks_createdTasks;
}

export interface GetCreatedTasksVariables {
  beforeCursor?: string | null;
  afterCursor?: string | null;
  limit?: number | null;
}
