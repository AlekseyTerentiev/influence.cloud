/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, AccountTaskStatus, AccountTaskRating, FeedBackType, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CancelTask
// ====================================================

export interface CancelTask_cancelTask_InstagramCommentTask_accountTasks {
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

export interface CancelTask_cancelTask_InstagramCommentTask_taskType {
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

export interface CancelTask_cancelTask_InstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface CancelTask_cancelTask_InstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  accountTasks: CancelTask_cancelTask_InstagramCommentTask_accountTasks[];
  taskType: CancelTask_cancelTask_InstagramCommentTask_taskType;
  post: CancelTask_cancelTask_InstagramCommentTask_post;
}

export interface CancelTask_cancelTask_InstagramStoryTask_accountTasks {
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

export interface CancelTask_cancelTask_InstagramStoryTask_taskType {
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

export interface CancelTask_cancelTask_InstagramStoryTask_mediaLinks {
  __typename: "MediaLink";
  pathToFile: string;
}

export interface CancelTask_cancelTask_InstagramStoryTask {
  __typename: "InstagramStoryTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  accountTasks: CancelTask_cancelTask_InstagramStoryTask_accountTasks[];
  taskType: CancelTask_cancelTask_InstagramStoryTask_taskType;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
  mediaLinks: CancelTask_cancelTask_InstagramStoryTask_mediaLinks[];
}

export type CancelTask_cancelTask = CancelTask_cancelTask_InstagramCommentTask | CancelTask_cancelTask_InstagramStoryTask;

export interface CancelTask {
  cancelTask: CancelTask_cancelTask;
}

export interface CancelTaskVariables {
  taskId: number;
}
