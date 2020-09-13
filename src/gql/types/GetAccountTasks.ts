/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, TranscationStatus, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAccountTasks
// ====================================================

export interface GetAccountTasks_accountTasks_InstagramStoryAccountTask_taskType {
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

export interface GetAccountTasks_accountTasks_InstagramStoryAccountTask {
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
  taskType: GetAccountTasks_accountTasks_InstagramStoryAccountTask_taskType;
}

export interface GetAccountTasks_accountTasks_InstagramCommentAccountTask_taskType {
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

export interface GetAccountTasks_accountTasks_InstagramCommentAccountTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface GetAccountTasks_accountTasks_InstagramCommentAccountTask {
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
  taskType: GetAccountTasks_accountTasks_InstagramCommentAccountTask_taskType;
  post: GetAccountTasks_accountTasks_InstagramCommentAccountTask_post | null;
}

export type GetAccountTasks_accountTasks = GetAccountTasks_accountTasks_InstagramStoryAccountTask | GetAccountTasks_accountTasks_InstagramCommentAccountTask;

export interface GetAccountTasks {
  accountTasks: GetAccountTasks_accountTasks[];
}

export interface GetAccountTasksVariables {
  accountId: number;
}
