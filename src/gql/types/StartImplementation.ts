/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, TranscationStatus, TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: StartImplementation
// ====================================================

export interface StartImplementation_startImplementation_InstagramCommentAccountTask_taskType {
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

export interface StartImplementation_startImplementation_InstagramCommentAccountTask_post {
  __typename: "InstagramPost";
  url: string;
  smallPreviewUrl: string | null;
  mediumPreviewUrl: string | null;
  largePreviewUrl: string | null;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string | null;
}

export interface StartImplementation_startImplementation_InstagramCommentAccountTask {
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
  taskType: StartImplementation_startImplementation_InstagramCommentAccountTask_taskType;
  post: StartImplementation_startImplementation_InstagramCommentAccountTask_post;
}

export interface StartImplementation_startImplementation_InstagramStoryAccountTask_taskType {
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

export interface StartImplementation_startImplementation_InstagramStoryAccountTask {
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
  taskType: StartImplementation_startImplementation_InstagramStoryAccountTask_taskType;
  accountUsername: string | null;
  websiteUrl: string | null;
  layoutMediaUrls: string[];
}

export type StartImplementation_startImplementation = StartImplementation_startImplementation_InstagramCommentAccountTask | StartImplementation_startImplementation_InstagramStoryAccountTask;

export interface StartImplementation {
  startImplementation: StartImplementation_startImplementation;
}

export interface StartImplementationVariables {
  accountTaskId: number;
}
