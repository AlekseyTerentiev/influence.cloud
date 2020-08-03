/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: DetailedTaskData
// ====================================================

export interface DetailedTaskData_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface DetailedTaskData_instagramCommentTask_post {
  __typename: "InstagramPost";
  displayUrl: string;
  description: string | null;
  ownerUsername: string;
}

export interface DetailedTaskData_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: DetailedTaskData_instagramCommentTask_post | null;
}

export interface DetailedTaskData {
  __typename: "DetailedTask";
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  status: TaskStatus;
  taskType: DetailedTaskData_taskType | null;
  instagramCommentTask: DetailedTaskData_instagramCommentTask | null;
}
