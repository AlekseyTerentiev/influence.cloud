/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, TranscationStatus, TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyInstagramStoryAccountTask
// ====================================================

export interface VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramCommentAccountTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramCommentAccountTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramCommentAccountTask {
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
  taskType: VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramCommentAccountTask_taskType;
  post: VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramCommentAccountTask_post;
}

export interface VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramStoryAccountTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramStoryAccountTask {
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
  taskType: VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramStoryAccountTask_taskType;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask = VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramCommentAccountTask | VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask_InstagramStoryAccountTask;

export interface VerifyInstagramStoryAccountTask {
  verifyInstagramStoryAccountTask: VerifyInstagramStoryAccountTask_verifyInstagramStoryAccountTask;
}

export interface VerifyInstagramStoryAccountTaskVariables {
  accountTaskId: number;
  storyUrl: string;
  storyScreenshotMediaLink: string;
}
