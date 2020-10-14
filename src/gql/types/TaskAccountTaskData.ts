/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, AccountTaskRating, FeedBackType } from "./globalTypes";

// ====================================================
// GraphQL fragment: TaskAccountTaskData
// ====================================================

export interface TaskAccountTaskData_InstagramCommentTaskAccountTask {
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

export interface TaskAccountTaskData_InstagramStoryTaskAccountTask {
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

export type TaskAccountTaskData = TaskAccountTaskData_InstagramCommentTaskAccountTask | TaskAccountTaskData_InstagramStoryTaskAccountTask;
