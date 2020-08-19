/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AvailableInstagramCommentTaskData
// ====================================================

export interface AvailableInstagramCommentTaskData_post {
  __typename: "InstagramPost";
  url: string;
  displayUrl: string;
  description: string | null;
  ownerUsername: string;
  ownerProfilePic: string;
}

export interface AvailableInstagramCommentTaskData {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: AvailableInstagramCommentTaskData_post | null;
}
