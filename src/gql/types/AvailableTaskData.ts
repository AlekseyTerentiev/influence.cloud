/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskTypeName } from "./globalTypes";

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
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
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
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
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
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type AvailableTaskData = AvailableTaskData_AvailableInstagramCommentTask | AvailableTaskData_AvailableInstagramStoryTask;
