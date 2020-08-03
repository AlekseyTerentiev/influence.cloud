/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelTask
// ====================================================

export interface CancelTask_cancelTask {
  __typename: "Task";
  id: number;
}

export interface CancelTask {
  cancelTask: CancelTask_cancelTask;
}

export interface CancelTaskVariables {
  taskId: number;
}
