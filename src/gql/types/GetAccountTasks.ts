/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, TranscationStatus, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAccountTasks
// ====================================================

export interface GetAccountTasks_accountTasks_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  type: TaskTypeName;
}

export interface GetAccountTasks_accountTasks_instagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface GetAccountTasks_accountTasks_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: GetAccountTasks_accountTasks_instagramCommentTask_post | null;
}

export interface GetAccountTasks_accountTasks {
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
  taskType: GetAccountTasks_accountTasks_taskType;
  instagramCommentTask: GetAccountTasks_accountTasks_instagramCommentTask;
}

export interface GetAccountTasks {
  accountTasks: GetAccountTasks_accountTasks[];
}

export interface GetAccountTasksVariables {
  accountId: number;
}
