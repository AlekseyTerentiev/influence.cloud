/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TakeInstagramCommentTask
// ====================================================

export interface TakeInstagramCommentTask_takeInstagramCommentTask {
  __typename: "InstagramCommentTaskImplementation";
  taskId: number;
  accountId: number;
  accountTaskId: number;
  postUrl: string;
  description: string;
  taskExpiredAt: any;
  accountTaskExpiredAt: any;
  reward: number;
  bonus: number;
  /**
   * milliseconds that account has to implement
   */
  implementationPeriod: number;
}

export interface TakeInstagramCommentTask {
  takeInstagramCommentTask: TakeInstagramCommentTask_takeInstagramCommentTask;
}

export interface TakeInstagramCommentTaskVariables {
  taskId: number;
  accountId: number;
}
