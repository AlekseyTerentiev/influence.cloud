/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, TranscationStatus, TaskTypeName } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApproveAccountTask
// ====================================================

export interface ApproveAccountTask_approveAccountTask_InstagramCommentAccountTask_taskType {
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

export interface ApproveAccountTask_approveAccountTask_InstagramCommentAccountTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface ApproveAccountTask_approveAccountTask_InstagramCommentAccountTask {
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
  taskType: ApproveAccountTask_approveAccountTask_InstagramCommentAccountTask_taskType;
  post: ApproveAccountTask_approveAccountTask_InstagramCommentAccountTask_post;
}

export interface ApproveAccountTask_approveAccountTask_InstagramStoryAccountTask_taskType {
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

export interface ApproveAccountTask_approveAccountTask_InstagramStoryAccountTask {
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
  taskType: ApproveAccountTask_approveAccountTask_InstagramStoryAccountTask_taskType;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type ApproveAccountTask_approveAccountTask = ApproveAccountTask_approveAccountTask_InstagramCommentAccountTask | ApproveAccountTask_approveAccountTask_InstagramStoryAccountTask;

export interface ApproveAccountTask {
  approveAccountTask: ApproveAccountTask_approveAccountTask;
}

export interface ApproveAccountTaskVariables {
  accountTaskId: number;
  approved: boolean;
}
