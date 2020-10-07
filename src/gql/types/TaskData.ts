/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL fragment: TaskData
// ====================================================

export interface TaskData_InstagramCommentTask_taskType {
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

export interface TaskData_InstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface TaskData_InstagramCommentTask {
  __typename: "InstagramCommentTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  taskType: TaskData_InstagramCommentTask_taskType;
  post: TaskData_InstagramCommentTask_post;
}

export interface TaskData_InstagramStoryTask_taskType {
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

export interface TaskData_InstagramStoryTask {
  __typename: "InstagramStoryTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  taskType: TaskData_InstagramStoryTask_taskType;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type TaskData = TaskData_InstagramCommentTask | TaskData_InstagramStoryTask;
