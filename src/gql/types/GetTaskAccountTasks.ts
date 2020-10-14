/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, AccountTaskRating, FeedBackType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTaskAccountTasks
// ====================================================

export interface GetTaskAccountTasks_taskAccountTasks_InstagramCommentTaskAccountTask {
  __typename: "InstagramCommentTaskAccountTask";
  id: number;
  taskId: number;
  accountId: number;
  status: AccountTaskStatus;
  username: string;
  profilePic: string;
  completedAt: any | null;
  rating: AccountTaskRating | null;
  feedback: FeedBackType | null;
  commentText: string;
}

export interface GetTaskAccountTasks_taskAccountTasks_InstagramStoryTaskAccountTask {
  __typename: "InstagramStoryTaskAccountTask";
  id: number;
  taskId: number;
  accountId: number;
  status: AccountTaskStatus;
  username: string;
  profilePic: string;
  completedAt: any | null;
  rating: AccountTaskRating | null;
  feedback: FeedBackType | null;
  storyUrl: string | null;
  storyScreenshotMediaLink: string | null;
}

export type GetTaskAccountTasks_taskAccountTasks = GetTaskAccountTasks_taskAccountTasks_InstagramCommentTaskAccountTask | GetTaskAccountTasks_taskAccountTasks_InstagramStoryTaskAccountTask;

export interface GetTaskAccountTasks {
  taskAccountTasks: GetTaskAccountTasks_taskAccountTasks[];
}

export interface GetTaskAccountTasksVariables {
  taskId: number;
}
