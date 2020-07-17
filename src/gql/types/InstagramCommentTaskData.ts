/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: InstagramCommentTaskData
// ====================================================

export interface InstagramCommentTaskData_post {
  __typename: "InstagramPost";
  id: number;
  displayUrl: string;
  description: string | null;
}

export interface InstagramCommentTaskData {
  __typename: "InstagramCommentTask";
  id: number;
  postUrl: string;
  post: InstagramCommentTaskData_post | null;
}
