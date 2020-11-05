/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAvailableTask
// ====================================================

export interface GetAvailableTask_availableTask_AvailableInstagramCommentTask_taskType {
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

export interface GetAvailableTask_availableTask_AvailableInstagramCommentTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface GetAvailableTask_availableTask_AvailableInstagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  id: number;
  verified: boolean;
  expiredAt: any;
  bonusRate: number;
  reward: number;
  description: string;
  taskType: GetAvailableTask_availableTask_AvailableInstagramCommentTask_taskType;
  post: GetAvailableTask_availableTask_AvailableInstagramCommentTask_post;
}

export interface GetAvailableTask_availableTask_AvailableInstagramStoryTask_taskType {
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

export interface GetAvailableTask_availableTask_AvailableInstagramStoryTask {
  __typename: "AvailableInstagramStoryTask";
  id: number;
  verified: boolean;
  expiredAt: any;
  bonusRate: number;
  reward: number;
  description: string;
  taskType: GetAvailableTask_availableTask_AvailableInstagramStoryTask_taskType;
  needApprove: boolean;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
  costFrom: number;
  costTo: number;
}

export type GetAvailableTask_availableTask = GetAvailableTask_availableTask_AvailableInstagramCommentTask | GetAvailableTask_availableTask_AvailableInstagramStoryTask;

export interface GetAvailableTask {
  availableTask: GetAvailableTask_availableTask;
}

export interface GetAvailableTaskVariables {
  taskId: number;
}
