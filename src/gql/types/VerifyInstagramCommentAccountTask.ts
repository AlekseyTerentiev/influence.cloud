/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, TranscationStatus, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyInstagramCommentAccountTask
// ====================================================

export interface VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_taskType {
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

export interface VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_instagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_instagramCommentTask_post | null;
}

export interface VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask {
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
  taskType: VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_taskType;
  instagramCommentTask: VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_instagramCommentTask;
}

export interface VerifyInstagramCommentAccountTask {
  verifyInstagramCommentAccountTask: VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask;
}

export interface VerifyInstagramCommentAccountTaskVariables {
  accountTaskId: number;
}
