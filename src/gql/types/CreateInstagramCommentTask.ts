/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateInstagramCommentTask
// ====================================================

export interface CreateInstagramCommentTask_createInstagramCommentTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface CreateInstagramCommentTask_createInstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  postUrl: string;
  description: string;
  verified: boolean;
  expireAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  taskType: CreateInstagramCommentTask_createInstagramCommentTask_taskType | null;
}

export interface CreateInstagramCommentTask {
  createInstagramCommentTask: CreateInstagramCommentTask_createInstagramCommentTask;
}

export interface CreateInstagramCommentTaskVariables {
  taskTypeId: number;
  postUrl: string;
  description: string;
  expireAt: any;
  totalBudget: number;
  bonusRate: number;
}
