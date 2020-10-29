import { gql, useQuery, useMutation } from '@apollo/client';
import { TASK_TYPE_DATA } from './task-types';
import { INSTAGRAM_POST_DATA } from './instagram-post';
import { ACCOUNT_TASK_DATA } from './account-tasks';
import { GetCreatedTasks, GetCreatedTasksVariables } from './types/GetCreatedTasks';
import {
  CreateInstagramCommentTask,
  CreateInstagramCommentTaskVariables,
} from './types/CreateInstagramCommentTask';
import {
  CreateInstagramStoryTask,
  CreateInstagramStoryTaskVariables,
} from './types/CreateInstagramStoryTask';
import { CancelTask, CancelTaskVariables } from './types/CancelTask';
import {
  GetTaskAccountTasks,
  GetTaskAccountTasksVariables,
} from './types/GetTaskAccountTasks';
import {
  ApproveAccountTask,
  ApproveAccountTaskVariables,
} from './types/ApproveAccountTask';
import { RateAccountTask, RateAccountTaskVariables } from './types/RateAccountTask';
import { GET_ME } from './user';
import { TaskData } from './types/TaskData';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const TASK_ACCOUNT_TASK_DATA = gql`
  fragment TaskAccountTaskData on TaskAccountTask {
    id
    taskId
    accountId
    status
    username
    profilePic
    completedAt
    rating
    feedback
    statisticData {
      ownerBirthDate
      ownerGender
      country
      followersAmount
      language
      impressions
      impressionsStory
      profileVisits
    }
    ... on InstagramCommentTaskAccountTask {
      commentText
    }
    ... on InstagramStoryTaskAccountTask {
      storyUrl
      storyScreenshotMediaLink
    }
  }
`;

export const TASK_DATA = gql`
  fragment TaskData on Task {
    id
    description
    verified
    expiredAt
    totalBudget
    currentBudget
    bonusRate
    status
    inProgressAccountTasks
    waitingAccountTasks
    completedAccountTasks
    taskType {
      ...TaskTypeData
    }
    languages
    genders
    ageFrom
    ageTo
    countries
    followers
    ... on InstagramCommentTask {
      post {
        ...InstagramPostData
      }
    }
    ... on InstagramStoryTask {
      costFrom
      costTo
      needApprove
      accountUsername
      websiteUrl
      layoutMediaUrls
    }
  }
  ${TASK_TYPE_DATA}
  ${INSTAGRAM_POST_DATA}
`;

/*------------------------------------------------------------------------------*/
/*   QUERIES                                                                    */
/*------------------------------------------------------------------------------*/

export const GET_CREATED_TASKS = gql`
  query GetCreatedTasks($beforeCursor: String, $afterCursor: String, $limit: Int) {
    createdTasks(
      beforeCursor: $beforeCursor
      afterCursor: $afterCursor
      limit: $limit
    ) {
      tasks {
        ...TaskData
      }
      pageInfo {
        beforeCursor
        afterCursor
        limit
        totalPages
        totalRecords
      }
    }
  }
  ${TASK_DATA}
`;

export const useCreatedTasks = () => {
  const q = useQuery<GetCreatedTasks, GetCreatedTasksVariables>(GET_CREATED_TASKS, {
    notifyOnNetworkStatusChange: true,
  });
  return {
    createdTasks: q.data?.createdTasks.tasks,
    pageInfo: q.data?.createdTasks.pageInfo,
    ...q,
  };
};

export const GET_TASK_ACCOUNT_TASKS = gql`
  query GetTaskAccountTasks($taskId: Int!) {
    taskAccountTasks(taskId: $taskId) {
      ...TaskAccountTaskData
    }
  }
  ${TASK_ACCOUNT_TASK_DATA}
`;

export const useTaskAccountTasks = (variables: GetTaskAccountTasksVariables) => {
  const q = useQuery<GetTaskAccountTasks, GetTaskAccountTasksVariables>(
    GET_TASK_ACCOUNT_TASKS,
    {
      variables,
      // pollInterval: 60000,
    },
  );
  return { taskAccountTasks: q.data?.taskAccountTasks, ...q };
};

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const CREATE_INSTAGRAM_COMMENT_TASK = gql`
  mutation CreateInstagramCommentTask(
    $taskTypeId: Int!
    $description: String!
    $expiredAt: Date!
    $totalBudget: Float!
    $bonusRate: Int!
    $postUrl: String!
    $languages: [AccountLanguage!]!
    $genders: [Gender!]!
    $ageFrom: Int!
    $ageTo: Int!
    $countries: [String!]!
  ) {
    createInstagramCommentTask(
      taskTypeId: $taskTypeId
      description: $description
      expiredAt: $expiredAt
      totalBudget: $totalBudget
      bonusRate: $bonusRate
      postUrl: $postUrl
      languages: $languages
      genders: $genders
      ageFrom: $ageFrom
      ageTo: $ageTo
      countries: $countries
    ) {
      ...TaskData
    }
  }
  ${TASK_DATA}
`;

export const useCreateInstagramCommentTask = () => {
  return useMutation<
    CreateInstagramCommentTask,
    CreateInstagramCommentTaskVariables
  >(CREATE_INSTAGRAM_COMMENT_TASK, {
    refetchQueries: [
      {
        query: GET_ME,
      },
    ],
    update(cache, { data }) {
      cache.modify({
        fields: {
          createdTasks(existingCreatedTasks, { readField }) {
            const newCreatedTask = cache.writeFragment({
              data: data?.createInstagramCommentTask,
              fragmentName: 'TaskData',
              fragment: TASK_DATA,
            });
            return {
              ...existingCreatedTasks,
              tasks: [newCreatedTask, ...existingCreatedTasks.tasks],
              pageInfo: {
                ...existingCreatedTasks.pageInfo,
                totalRecords: existingCreatedTasks.pageInfo.totalRecords + 1,
              },
            };
          },
        },
      });
    },
  });
};

export const CREATE_INSTAGRAM_STORY_TASK = gql`
  mutation CreateInstagramStoryTask(
    $taskTypeId: Int!
    $description: String!
    $expiredAt: Date!
    $totalBudget: Float!
    $bonusRate: Int!
    $costFrom: Int!
    $costTo: Int!
    $needApprove: Boolean!
    $accountUsername: String
    $websiteUrl: String
    $layoutMediaUrls: [String!]!
    $languages: [AccountLanguage!]!
    $genders: [Gender!]!
    $ageFrom: Int!
    $ageTo: Int!
    $countries: [String!]!
    $followersAmount: Int!
  ) {
    createInstagramStoryTask(
      taskTypeId: $taskTypeId
      description: $description
      expiredAt: $expiredAt
      totalBudget: $totalBudget
      bonusRate: $bonusRate
      costFrom: $costFrom
      costTo: $costTo
      needApprove: $needApprove
      accountUsername: $accountUsername
      websiteUrl: $websiteUrl
      layoutMediaUrls: $layoutMediaUrls
      languages: $languages
      genders: $genders
      ageFrom: $ageFrom
      ageTo: $ageTo
      countries: $countries
      followersAmount: $followersAmount
    ) {
      ...TaskData
    }
  }
  ${TASK_DATA}
`;

export const useCreateInstagramStoryTask = () => {
  return useMutation<CreateInstagramStoryTask, CreateInstagramStoryTaskVariables>(
    CREATE_INSTAGRAM_STORY_TASK,
    {
      refetchQueries: [
        {
          query: GET_ME,
        },
      ],
      update(cache, { data }) {
        cache.modify({
          fields: {
            createdTasks(existingCreatedTasks, { readField }) {
              const newCreatedTask = cache.writeFragment({
                data: data?.createInstagramStoryTask,
                fragmentName: 'TaskData',
                fragment: TASK_DATA,
              });
              return {
                ...existingCreatedTasks,
                tasks: [newCreatedTask, ...existingCreatedTasks.tasks],
                pageInfo: {
                  ...existingCreatedTasks.pageInfo,
                  totalRecords: existingCreatedTasks.pageInfo.totalRecords + 1,
                },
              };
            },
          },
        });
      },
    },
  );
};

export const CANCEL_TASK = gql`
  mutation CancelTask($taskId: Int!) {
    cancelTask(taskId: $taskId) {
      ...TaskData
    }
  }
  ${TASK_DATA}
`;

export const useCancelTask = () => {
  return useMutation<CancelTask, CancelTaskVariables>(CANCEL_TASK);
};

export const APPROVE_ACCOUNT_TASK = gql`
  mutation ApproveAccountTask($accountTaskId: Int!, $approved: Boolean!) {
    approveAccountTask(accountTaskId: $accountTaskId, approved: $approved) {
      ...TaskAccountTaskData
    }
  }
  ${TASK_ACCOUNT_TASK_DATA}
`;

export const useApproveAccountTask = (task: TaskData) => {
  return useMutation<ApproveAccountTask, ApproveAccountTaskVariables>(
    APPROVE_ACCOUNT_TASK,
    {
      refetchQueries: [
        {
          query: GET_TASK_ACCOUNT_TASKS,
          variables: {
            taskId: task.id,
          },
        },
      ],
      update(cache, { data }) {
        const updatingTaskId = `${task.__typename}:${data?.approveAccountTask.taskId}`;
        const createdTask: any = cache.readFragment({
          id: updatingTaskId,
          fragment: gql`
            fragment TaskFragment on Task {
              waitingAccountTasks
            }
          `,
        });
        cache.writeFragment({
          id: updatingTaskId,
          fragment: gql`
            fragment TaskFragment on Task {
              waitingAccountTasks
            }
          `,
          data: {
            waitingAccountTasks: createdTask?.waitingAccountTasks - 1,
          },
        });
      },
    },
  );
};

export const RATE_ACCOUNT_TASK = gql`
  mutation RateAccountTask(
    $accountTaskId: Int!
    $rating: AccountTaskRating!
    $feedback: FeedBackType
  ) {
    rateAccountTask(
      accountTaskId: $accountTaskId
      rating: $rating
      feedback: $feedback
    ) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
`;

export const useRateAccountTask = (taskId: number) => {
  return useMutation<RateAccountTask, RateAccountTaskVariables>(RATE_ACCOUNT_TASK, {
    refetchQueries: [
      {
        query: GET_TASK_ACCOUNT_TASKS,
        variables: {
          taskId,
        },
      },
    ],
  });
};
