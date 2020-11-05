import { gql, useQuery, useMutation } from '@apollo/client';
import { TASK_TYPE_DATA } from './task-types';
import { INSTAGRAM_POST_DATA } from './instagram-post';
import { GetCreatedTasks, GetCreatedTasksVariables } from './types/GetCreatedTasks';
import { GetCreatedTask, GetCreatedTaskVariables } from './types/GetCreatedTask';
import {
  CreateInstagramCommentTask,
  CreateInstagramCommentTaskVariables,
} from './types/CreateInstagramCommentTask';
import {
  CreateInstagramStoryTask,
  CreateInstagramStoryTaskVariables,
} from './types/CreateInstagramStoryTask';
import { CancelTask, CancelTaskVariables } from './types/CancelTask';
import { GET_ME } from './user';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

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
    activeAccountTasks
    waitingAccountTasks
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

export const GET_CREATED_TASK = gql`
  query GetCreatedTask($taskId: Int!) {
    createdTask(taskId: $taskId) {
      ...TaskData
    }
  }
  ${TASK_DATA}
`;

export const useCreatedTask = (variables: GetCreatedTaskVariables) => {
  const q = useQuery<GetCreatedTask, GetCreatedTaskVariables>(GET_CREATED_TASK, {
    variables,
  });
  return {
    createdTask: q.data?.createdTask,
    ...q,
  };
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
