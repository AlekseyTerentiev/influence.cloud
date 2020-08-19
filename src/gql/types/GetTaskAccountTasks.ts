/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, AccountTaskRating, FeedBackType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTaskAccountTasks
// ====================================================

export interface GetTaskAccountTasks_allTaskAccountTasks {
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

export interface GetTaskAccountTasks {
  allTaskAccountTasks: GetTaskAccountTasks_allTaskAccountTasks[];
}

export interface GetTaskAccountTasksVariables {
  taskId: number;
}
