/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, TaskTypeName, PayoutType, AccountLanguage, Gender } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatedTask
// ====================================================

export interface GetCreatedTask_createdTask_InstagramCommentTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface GetCreatedTask_createdTask_InstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface GetCreatedTask_createdTask_InstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  activeAccountTasks: number;
  waitingAccountTasks: number;
  taskType: GetCreatedTask_createdTask_InstagramCommentTask_taskType;
  languages: AccountLanguage[] | null;
  genders: Gender[] | null;
  ageFrom: number | null;
  ageTo: number | null;
  countries: string[] | null;
  followers: number | null;
  post: GetCreatedTask_createdTask_InstagramCommentTask_post;
}

export interface GetCreatedTask_createdTask_InstagramStoryTask_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface GetCreatedTask_createdTask_InstagramStoryTask {
  __typename: "InstagramStoryTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  activeAccountTasks: number;
  waitingAccountTasks: number;
  taskType: GetCreatedTask_createdTask_InstagramStoryTask_taskType;
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

export type GetCreatedTask_createdTask = GetCreatedTask_createdTask_InstagramCommentTask | GetCreatedTask_createdTask_InstagramStoryTask;

export interface GetCreatedTask {
  createdTask: GetCreatedTask_createdTask;
}

export interface GetCreatedTaskVariables {
  taskId: number;
}
