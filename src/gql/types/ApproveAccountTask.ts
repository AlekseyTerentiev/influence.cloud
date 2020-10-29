/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountTaskStatus, AccountTaskRating, FeedBackType, Gender, AccountLanguage } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApproveAccountTask
// ====================================================

export interface ApproveAccountTask_approveAccountTask_InstagramCommentTaskAccountTask_statisticData {
  __typename: "InstagramAccountStats";
  ownerBirthDate: any;
  ownerGender: Gender;
  country: string;
  followersAmount: number;
  language: AccountLanguage | null;
  impressions: number | null;
  impressionsStory: number | null;
  profileVisits: number | null;
}

export interface ApproveAccountTask_approveAccountTask_InstagramCommentTaskAccountTask {
  __typename: "InstagramCommentTaskAccountTask";
  id: number;
  taskId: number;
  accountId: number;
  status: AccountTaskStatus;
  username: string;
  profilePic: string;
  completedAt: any | null;
  rating: AccountTaskRating | null;
  feedback: FeedBackType | null;
  statisticData: ApproveAccountTask_approveAccountTask_InstagramCommentTaskAccountTask_statisticData;
  commentText: string;
}

export interface ApproveAccountTask_approveAccountTask_InstagramStoryTaskAccountTask_statisticData {
  __typename: "InstagramAccountStats";
  ownerBirthDate: any;
  ownerGender: Gender;
  country: string;
  followersAmount: number;
  language: AccountLanguage | null;
  impressions: number | null;
  impressionsStory: number | null;
  profileVisits: number | null;
}

export interface ApproveAccountTask_approveAccountTask_InstagramStoryTaskAccountTask {
  __typename: "InstagramStoryTaskAccountTask";
  id: number;
  taskId: number;
  accountId: number;
  status: AccountTaskStatus;
  username: string;
  profilePic: string;
  completedAt: any | null;
  rating: AccountTaskRating | null;
  feedback: FeedBackType | null;
  statisticData: ApproveAccountTask_approveAccountTask_InstagramStoryTaskAccountTask_statisticData;
  storyUrl: string | null;
  storyScreenshotMediaLink: string | null;
}

export type ApproveAccountTask_approveAccountTask = ApproveAccountTask_approveAccountTask_InstagramCommentTaskAccountTask | ApproveAccountTask_approveAccountTask_InstagramStoryTaskAccountTask;

export interface ApproveAccountTask {
  approveAccountTask: ApproveAccountTask_approveAccountTask;
}

export interface ApproveAccountTaskVariables {
  accountTaskId: number;
  approved: boolean;
}
