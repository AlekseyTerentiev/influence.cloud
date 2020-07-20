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
  expiredAt: any;
  reward: number;
  bonus: number;
  /**
   * milliseconds that task imeplementation will be expired
   */
  implementationPeriod: number;
}

export interface TakeInstagramCommentTask {
  takeInstagramCommentTask: TakeInstagramCommentTask_takeInstagramCommentTask | null;
}

export interface TakeInstagramCommentTaskVariables {
  taskId: number;
  accountId: number;
}
