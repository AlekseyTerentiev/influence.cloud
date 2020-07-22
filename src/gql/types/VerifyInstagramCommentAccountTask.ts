/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

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
}

export interface VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_instagramCommentTask_post {
  __typename: "InstagramPost";
  displayUrl: string;
  description: string | null;
  ownerUsername: string;
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
  status: string;
  rating: number;
  reward: number;
  taskExpiredAt: any;
  /**
   * Date of deadline
   */
  accountTaskExpiredAt: any;
  bonusRate: number;
  bonus: number;
  taskType: VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_taskType;
  instagramCommentTask: VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask_instagramCommentTask;
}

export interface VerifyInstagramCommentAccountTask {
  verifyInstagramCommentAccountTask: VerifyInstagramCommentAccountTask_verifyInstagramCommentAccountTask;
}

export interface VerifyInstagramCommentAccountTaskVariables {
  accountTaskId: number;
}
