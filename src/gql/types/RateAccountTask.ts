/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskRating, FeedBackType, AccountTaskStatus, TranscationStatus, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RateAccountTask
// ====================================================

export interface RateAccountTask_rateAccountTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  type: TaskTypeName;
}

export interface RateAccountTask_rateAccountTask_instagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface RateAccountTask_rateAccountTask_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: RateAccountTask_rateAccountTask_instagramCommentTask_post | null;
}

export interface RateAccountTask_rateAccountTask {
  __typename: "AccountTask";
  id: number;
  description: string;
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
  taskType: RateAccountTask_rateAccountTask_taskType;
  instagramCommentTask: RateAccountTask_rateAccountTask_instagramCommentTask;
}

export interface RateAccountTask {
  rateAccountTask: RateAccountTask_rateAccountTask | null;
}

export interface RateAccountTaskVariables {
  accountTaskId: number;
  rating: AccountTaskRating;
  feedback: FeedBackType;
}
