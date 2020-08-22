/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAvailableTasks
// ====================================================

export interface GetAvailableTasks_availableTasks_tasks_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  type: TaskTypeName;
}

export interface GetAvailableTasks_availableTasks_tasks_instagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface GetAvailableTasks_availableTasks_tasks_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: GetAvailableTasks_availableTasks_tasks_instagramCommentTask_post | null;
}

export interface GetAvailableTasks_availableTasks_tasks {
  __typename: "AvailableAccountTask";
  taskId: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  bonusRate: number;
  reward: number;
  taskType: GetAvailableTasks_availableTasks_tasks_taskType | null;
  instagramCommentTask: GetAvailableTasks_availableTasks_tasks_instagramCommentTask | null;
}

export interface GetAvailableTasks_availableTasks_pageInfo {
  __typename: "Pagination";
  beforeCursor: string | null;
  afterCursor: string | null;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface GetAvailableTasks_availableTasks {
  __typename: "AvailableAccountTasks";
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
