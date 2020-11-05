import { gql, useQuery, useMutation } from '@apollo/client';
import { ACCOUNT_TASK_DATA } from './account-tasks';
import {
  GetTaskAccountTasks,
  GetTaskAccountTasksVariables,
} from './types/GetTaskAccountTasks';
import {
  ApproveAccountTask,
  ApproveAccountTaskVariables,
} from './types/ApproveAccountTask';
import { RateAccountTask, RateAccountTaskVariables } from './types/RateAccountTask';
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
    reward
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

/*------------------------------------------------------------------------------*/
/*   QUERIES                                                                    */
/*------------------------------------------------------------------------------*/

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
