/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, AccountTaskRating, FeedBackType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApproveAccountTask
// ====================================================

export interface ApproveAccountTask_approveAccountTask_InstagramCommentTaskAccountTask {
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

export interface ApproveAccountTask_approveAccountTask_InstagramStoryTaskAccountTask {
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

export type ApproveAccountTask_approveAccountTask = ApproveAccountTask_approveAccountTask_InstagramCommentTaskAccountTask | ApproveAccountTask_approveAccountTask_InstagramStoryTaskAccountTask;

export interface ApproveAccountTask {
  approveAccountTask: ApproveAccountTask_approveAccountTask;
}

export interface ApproveAccountTaskVariables {
  accountTaskId: number;
  approved: boolean;
}
