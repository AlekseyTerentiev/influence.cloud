/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadMediaForTask
// ====================================================

export interface UploadMediaForTask_uploadMediaForTask {
  __typename: "File";
  id: string;
  path: string;
  filename: string;
  mimetype: string;
}

export interface UploadMediaForTask {
  uploadMediaForTask: UploadMediaForTask_uploadMediaForTask;
}

export interface UploadMediaForTaskVariables {
  taskId: number;
  media: any;
}
