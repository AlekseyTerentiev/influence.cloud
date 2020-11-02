/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, TranscationStatus, TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: TakeInstagramStoryTask
// ====================================================

export interface TakeInstagramStoryTask_takeInstagramStoryTask_InstagramCommentAccountTask_taskType {
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

export interface TakeInstagramStoryTask_takeInstagramStoryTask_InstagramCommentAccountTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface TakeInstagramStoryTask_takeInstagramStoryTask_InstagramCommentAccountTask {
  __typename: "InstagramCommentAccountTask";
  id: number;
  status: AccountTaskStatus;
  reward: number;
  taskExpiredAt: any;
  /**
   * Date of deadline
   */
  accountTaskExpiredAt: any;
  bonusRate: number;
  bonus: number;
  bonusStatus: TranscationStatus;
  description: string;
  taskType: TakeInstagramStoryTask_takeInstagramStoryTask_InstagramCommentAccountTask_taskType;
  post: TakeInstagramStoryTask_takeInstagramStoryTask_InstagramCommentAccountTask_post;
}

export interface TakeInstagramStoryTask_takeInstagramStoryTask_InstagramStoryAccountTask_taskType {
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

export interface TakeInstagramStoryTask_takeInstagramStoryTask_InstagramStoryAccountTask {
  __typename: "InstagramStoryAccountTask";
  id: number;
  status: AccountTaskStatus;
  reward: number;
  taskExpiredAt: any;
  /**
   * Date of deadline
   */
  accountTaskExpiredAt: any;
  bonusRate: number;
  bonus: number;
  bonusStatus: TranscationStatus;
  description: string;
  taskType: TakeInstagramStoryTask_takeInstagramStoryTask_InstagramStoryAccountTask_taskType;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type TakeInstagramStoryTask_takeInstagramStoryTask = TakeInstagramStoryTask_takeInstagramStoryTask_InstagramCommentAccountTask | TakeInstagramStoryTask_takeInstagramStoryTask_InstagramStoryAccountTask;

export interface TakeInstagramStoryTask {
  takeInstagramStoryTask: TakeInstagramStoryTask_takeInstagramStoryTask;
}

export interface TakeInstagramStoryTaskVariables {
  taskId: number;
  accountId: number;
}
