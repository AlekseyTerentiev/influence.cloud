/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAvailableTasks
// ====================================================

export interface GetAvailableTasks_availableTasks_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface GetAvailableTasks_availableTasks_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  cost: number;
}

export interface GetAvailableTasks_availableTasks {
  __typename: "AvailableAccountTask";
  id: number;
  description: string;
  verified: boolean;
  expireAt: any;
  bonusRate: number;
  taskType: GetAvailableTasks_availableTasks_taskType | null;
  instagramCommentTask: GetAvailableTasks_availableTasks_instagramCommentTask | null;
}

export interface GetAvailableTasks {
  availableTasks: GetAvailableTasks_availableTasks[];
}

export interface GetAvailableTasksVariables {
  accountId: number;
}
