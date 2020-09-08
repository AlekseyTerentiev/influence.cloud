import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TASK_TYPE_DATA } from './task-types';
import { GET_ME } from './user';

import {
  GetAvailableTasks,
  GetAvailableTasksVariables,
} from './types/GetAvailableTasks';
import {
  TakeInstagramCommentTask,
  TakeInstagramCommentTaskVariables,
} from './types/TakeInstagramCommentTask';
import { GetAccountTasks, GetAccountTasksVariables } from './types/GetAccountTasks';
import {
  VerifyInstagramCommentAccountTask,
  VerifyInstagramCommentAccountTaskVariables,
} from './types/VerifyInstagramCommentAccountTask';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const INSTAGRAM_POST_DATA = gql`
  fragment InstagramPostData on InstagramPost {
    url
    smallPreviewUrl
    mediumPreviewUrl
    largePreviewUrl
    description
    ownerUsername
    ownerProfilePic
  }
`;

export const AVAILABLE_INSTAGRAM_COMMENT_TASK_DATA = gql`
  fragment AvailableInstagramCommentTaskData on AvailableInstagramCommentTask {
    postUrl
    post {
      ...InstagramPostData
    }
  }
  ${INSTAGRAM_POST_DATA}
`;

export const ACCOUNT_TASK_DATA = gql`
  fragment AccountTaskData on AccountTask {
    id
    description
    status
    reward
    taskExpiredAt
    accountTaskExpiredAt
    bonusRate
    bonus
    bonusStatus
    taskType {
      ...TaskTypeData
    }
    instagramCommentTask {
      ...AvailableInstagramCommentTaskData
    }
  }
  ${TASK_TYPE_DATA}
  ${AVAILABLE_INSTAGRAM_COMMENT_TASK_DATA}
`;

/*------------------------------------------------------------------------------*/
/*   QUERIES                                                                    */
/*------------------------------------------------------------------------------*/

export const GET_AVAILABLE_TASKS = gql`
  query GetAvailableTasks(
    $accountId: Int!
    $beforeCursor: String
    $afterCursor: String
    $limit: Int
  ) {
    availableTasks(
      accountId: $accountId
      pageInfo: {
        beforeCursor: $beforeCursor
        afterCursor: $afterCursor
        limit: $limit
      }
    ) {
      tasks {
        taskId
        description
        verified
        expiredAt
        bonusRate
        reward
        taskType {
          ...TaskTypeData
        }
        instagramCommentTask {
          ...AvailableInstagramCommentTaskData
        }
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
  ${TASK_TYPE_DATA}
  ${AVAILABLE_INSTAGRAM_COMMENT_TASK_DATA}
`;

export const useAvailableTasks = (variables: GetAvailableTasksVariables) => {
  const q = useQuery<GetAvailableTasks, GetAvailableTasksVariables>(
    GET_AVAILABLE_TASKS,
    { variables, notifyOnNetworkStatusChange: true },
  );
  return {
    availableTasks: q.data?.availableTasks.tasks,
    pageInfo: q.data?.availableTasks.pageInfo,
    ...q,
  };
};

export const GET_ACCOUNT_TASKS = gql`
  query GetAccountTasks($accountId: Int!) {
    accountTasks(accountId: $accountId) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
`;

export const useAccountTasks = (variables: GetAccountTasksVariables) => {
  const q = useQuery<GetAccountTasks, GetAccountTasksVariables>(GET_ACCOUNT_TASKS, {
    variables,
    // pollInterval: 60000,
  });
  return { accountTasks: q.data?.accountTasks, ...q };
};

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const TAKE_INSTAGRAM_COMMENT_TASK = gql`
  mutation TakeInstagramCommentTask($taskId: Int!, $accountId: Int!) {
    takeInstagramCommentTask(data: { taskId: $taskId, accountId: $accountId }) {
      taskId
      accountId
      accountTaskId
      postUrl
      description
      taskExpiredAt
      accountTaskExpiredAt
      reward
      bonus
      implementationPeriod
    }
  }
`;

export const useTakeInstagramCommentTask = (accountId: number) => {
  return useMutation<TakeInstagramCommentTask, TakeInstagramCommentTaskVariables>(
    TAKE_INSTAGRAM_COMMENT_TASK,
    {
      refetchQueries: [{ query: GET_ACCOUNT_TASKS, variables: { accountId } }],
      update(cache, { data }) {
        // Deleting taken availableTask from availableTasks in cache
        const { availableTasks }: any = cache.readQuery({
          query: GET_AVAILABLE_TASKS,
          variables: { accountId },
        });
        cache.writeQuery({
          query: GET_AVAILABLE_TASKS,
          variables: { accountId },
          data: {
            availableTasks: {
              ...availableTasks,
              pageInfo: {
                ...availableTasks.pageInfo,
                totalRecords: availableTasks.pageInfo.totalRecords - 1,
              },
              tasks: availableTasks.tasks.filter(
                (t: any) => t.taskId !== data?.takeInstagramCommentTask?.taskId,
              ),
            },
          },
        });
      },
    },
  );
};

export const VERIFY_INSTAGRAM_COMMENT_ACCOUINT_TASK = gql`
  mutation VerifyInstagramCommentAccountTask($accountTaskId: Int!) {
    verifyInstagramCommentAccountTask(data: { accountTaskId: $accountTaskId }) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
`;

export const useVerifyInstagramCommentAccountTask = () => {
  return useMutation<
    VerifyInstagramCommentAccountTask,
    VerifyInstagramCommentAccountTaskVariables
  >(VERIFY_INSTAGRAM_COMMENT_ACCOUINT_TASK, {
    refetchQueries: [{ query: GET_ME }],
  });
};
