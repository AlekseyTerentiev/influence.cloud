/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskRate, FeedBackType, AccountTaskStatus } from "./globalTypes";

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
}

export interface RateAccountTask_rateAccountTask_instagramCommentTask_post {
  __typename: "InstagramPost";
  displayUrl: string;
  description: string | null;
  ownerUsername: string;
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
  rating: number;
  reward: number;
  taskExpiredAt: any;
  /**
   * Date of deadline
   */
  accountTaskExpiredAt: any;
  bonusRate: number;
  bonus: number;
  taskType: RateAccountTask_rateAccountTask_taskType;
  instagramCommentTask: RateAccountTask_rateAccountTask_instagramCommentTask;
}

export interface RateAccountTask {
  rateAccountTask: RateAccountTask_rateAccountTask | null;
}

export interface RateAccountTaskVariables {
  accountTaskId: number;
  rating: AccountTaskRate;
  feedback: FeedBackType;
}
