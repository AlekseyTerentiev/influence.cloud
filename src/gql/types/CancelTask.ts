/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, TaskTypeName, PayoutType, AccountLanguage, Gender } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CancelTask
// ====================================================

export interface CancelTask_cancelTask_InstagramCommentTask_taskType {
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

export interface CancelTask_cancelTask_InstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface CancelTask_cancelTask_InstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  inProgressAccountTasks: number;
  waitingAccountTasks: number;
  completedAccountTasks: number;
  taskType: CancelTask_cancelTask_InstagramCommentTask_taskType;
  languages: AccountLanguage[] | null;
  genders: Gender[] | null;
  ageFrom: number | null;
  ageTo: number | null;
  countries: string[] | null;
  followers: number | null;
  post: CancelTask_cancelTask_InstagramCommentTask_post;
}

export interface CancelTask_cancelTask_InstagramStoryTask_taskType {
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

export interface CancelTask_cancelTask_InstagramStoryTask {
  __typename: "InstagramStoryTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  inProgressAccountTasks: number;
  waitingAccountTasks: number;
  completedAccountTasks: number;
  taskType: CancelTask_cancelTask_InstagramStoryTask_taskType;
  languages: AccountLanguage[] | null;
  genders: Gender[] | null;
  ageFrom: number | null;
  ageTo: number | null;
  countries: string[] | null;
  followers: number | null;
  costFrom: number;
  costTo: number;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type CancelTask_cancelTask = CancelTask_cancelTask_InstagramCommentTask | CancelTask_cancelTask_InstagramStoryTask;

export interface CancelTask {
  cancelTask: CancelTask_cancelTask;
}

export interface CancelTaskVariables {
  taskId: number;
}
