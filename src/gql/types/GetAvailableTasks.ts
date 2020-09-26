/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAvailableTasks
// ====================================================

export interface GetAvailableTasks_availableTasks_tasks_AvailableInstagramCommentTask_taskType {
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

export interface GetAvailableTasks_availableTasks_tasks_AvailableInstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface GetAvailableTasks_availableTasks_tasks_AvailableInstagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  id: number;
  verified: boolean;
  expiredAt: any;
  bonusRate: number;
  reward: number;
  description: string;
  taskType: GetAvailableTasks_availableTasks_tasks_AvailableInstagramCommentTask_taskType;
  post: GetAvailableTasks_availableTasks_tasks_AvailableInstagramCommentTask_post;
}

export interface GetAvailableTasks_availableTasks_tasks_AvailableInstagramStoryTask_taskType {
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

export interface GetAvailableTasks_availableTasks_tasks_AvailableInstagramStoryTask {
  __typename: "AvailableInstagramStoryTask";
  id: number;
  verified: boolean;
  expiredAt: any;
  bonusRate: number;
  reward: number;
  description: string;
  taskType: GetAvailableTasks_availableTasks_tasks_AvailableInstagramStoryTask_taskType;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type GetAvailableTasks_availableTasks_tasks = GetAvailableTasks_availableTasks_tasks_AvailableInstagramCommentTask | GetAvailableTasks_availableTasks_tasks_AvailableInstagramStoryTask;

export interface GetAvailableTasks_availableTasks_pageInfo {
  __typename: "Pagination";
  beforeCursor: string | null;
  afterCursor: string | null;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface GetAvailableTasks_availableTasks {
  __typename: "AvailableTasks";
  tasks: GetAvailableTasks_availableTasks_tasks[];
  pageInfo: GetAvailableTasks_availableTasks_pageInfo | null;
}

export interface GetAvailableTasks {
  availableTasks: GetAvailableTasks_availableTasks;
}

export interface GetAvailableTasksVariables {
  accountId: number;
  beforeCursor?: string | null;
  afterCursor?: string | null;
  limit?: number | null;
}
