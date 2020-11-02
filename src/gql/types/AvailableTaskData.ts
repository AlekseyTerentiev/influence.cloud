/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL fragment: AvailableTaskData
// ====================================================

export interface AvailableTaskData_AvailableInstagramCommentTask_taskType {
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

export interface AvailableTaskData_AvailableInstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface AvailableTaskData_AvailableInstagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  id: number;
  verified: boolean;
  expiredAt: any;
  bonusRate: number;
  reward: number;
  description: string;
  taskType: AvailableTaskData_AvailableInstagramCommentTask_taskType;
  post: AvailableTaskData_AvailableInstagramCommentTask_post;
}

export interface AvailableTaskData_AvailableInstagramStoryTask_taskType {
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

export interface AvailableTaskData_AvailableInstagramStoryTask {
  __typename: "AvailableInstagramStoryTask";
  id: number;
  verified: boolean;
  expiredAt: any;
  bonusRate: number;
  reward: number;
  description: string;
  taskType: AvailableTaskData_AvailableInstagramStoryTask_taskType;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
  costFrom: number;
  costTo: number;
}

export type AvailableTaskData = AvailableTaskData_AvailableInstagramCommentTask | AvailableTaskData_AvailableInstagramStoryTask;
