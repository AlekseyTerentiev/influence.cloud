import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TASK_TYPE_DATA } from './task-types';
import { INSTAGRAM_POST_DATA } from './instagram-post';
import { ACCOUNT_TASK_DATA } from './account-tasks';
import { GetCreatedTasks, GetCreatedTasksVariables } from './types/GetCreatedTasks';
import {
  CreateInstagramCommentTask,
  CreateInstagramCommentTaskVariables,
} from './types/CreateInstagramCommentTask';
import { CancelTask, CancelTaskVariables } from './types/CancelTask';
import {
  GetTaskAccountTasks,
  GetTaskAccountTasksVariables,
} from './types/GetTaskAccountTasks';
import { RateAccountTask, RateAccountTaskVariables } from './types/RateAccountTask';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const TASK_ACCOUNT_TASK_DATA = gql`
  fragment TasksAccountTaskData on TaskAccountTasks {
    taskId
    accountId
    accountTaskId
    status
    username
    profilePic
    commentText
    completedAt
    rating
    feedback
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
    accountTasks {
      ...TasksAccountTaskData
    }
    taskType {
      ...TaskTypeData
    }
    ... on InstagramCommentTask {
      post {
        ...InstagramPostData
      }
    }
  }
  ${TASK_ACCOUNT_TASK_DATA}
  ${TASK_TYPE_DATA}
  ${INSTAGRAM_POST_DATA}
`;

/*------------------------------------------------------------------------------*/
/*   QUERIES                                                                    */
/*------------------------------------------------------------------------------*/

export const GET_CREATED_TASKS = gql`
  query GetCreatedTasks($beforeCursor: String, $afterCursor: String, $limit: Int) {
    createdTasks(
      pageInfo: {
        beforeCursor: $beforeCursor
        afterCursor: $afterCursor
        limit: $limit
      }
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
    allTaskAccountTasks(taskId: $taskId) {
      ...TasksAccountTaskData
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
  return { taskAccountTasks: q.data?.allTaskAccountTasks, ...q };
};

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const CREATE_INSTAGRAM_COMMENT_TASK = gql`
  mutation CreateInstagramCommentTask(
    $taskTypeId: Int!
    $postUrl: String!
    $description: String!
    $expiredAt: Date!
    $totalBudget: Float!
    $bonusRate: Int!
  ) {
    createInstagramCommentTask(
      data: {
        taskTypeId: $taskTypeId
        postUrl: $postUrl
        description: $description
        expiredAt: $expiredAt
        totalBudget: $totalBudget
        bonusRate: $bonusRate
      }
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
    // refetchQueries: [{ query: GET_ME }],
  });
};

export const CANCEL_TASK = gql`
  mutation CancelTask($taskId: Int!) {
    cancelTask(data: { taskId: $taskId }) {
      ...TaskData
    }
  }
  ${TASK_DATA}
`;

export const useCancelTask = () => {
  return useMutation<CancelTask, CancelTaskVariables>(CANCEL_TASK, {
    // refetchQueries: [{ query: GET_ME }],
  });
};

export const RATE_ACCOUNT_TASK = gql`
  mutation RateAccountTask(
    $accountTaskId: Int!
    $rating: AccountTaskRating!
    $feedback: FeedBackType
  ) {
    rateAccountTask(
      data: { accountTaskId: $accountTaskId, rating: $rating, feedback: $feedback }
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
