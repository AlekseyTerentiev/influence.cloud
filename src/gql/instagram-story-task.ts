import { gql, useMutation } from '@apollo/client';
import { ACCOUNT_TASK_DATA } from './account-tasks';
import {
  TakeInstagramStoryTask,
  TakeInstagramStoryTaskVariables,
} from './types/TakeInstagramStoryTask';
import { GET_ACCOUNT_TASKS } from './account-tasks';
import { GET_AVAILABLE_TASKS } from './available-tasks';
import {
  VerifyInstagramStoryAccountTask,
  VerifyInstagramStoryAccountTaskVariables,
} from './types/VerifyInstagramStoryAccountTask';
import { GetAvailableTasks } from './types/GetAvailableTasks';

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const TAKE_INSTAGRAM_STORY_TASK = gql`
  mutation TakeInstagramStoryTask($taskId: Int!, $accountId: Int!) {
    takeInstagramStoryTask(taskId: $taskId, accountId: $accountId) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
`;

export const useTakeInstagramStoryTask = (accountId: number, taskId: number) => {
  return useMutation<TakeInstagramStoryTask, TakeInstagramStoryTaskVariables>(
    TAKE_INSTAGRAM_STORY_TASK,
    {
      refetchQueries: [{ query: GET_ACCOUNT_TASKS, variables: { accountId } }],
      update(cache, { data }) {
        // Removing taken task from availableTasks
        const cached: GetAvailableTasks | null = cache.readQuery({
          query: GET_AVAILABLE_TASKS,
          variables: { accountId },
        });
        if (!cached) {
          return;
        }
        cache.writeQuery({
          query: GET_AVAILABLE_TASKS,
          variables: { accountId },
          data: {
            availableTasks: {
              ...cached.availableTasks,
              pageInfo: {
                ...cached.availableTasks.pageInfo,
                totalRecords: cached.availableTasks.pageInfo?.totalRecords
                  ? cached.availableTasks.pageInfo?.totalRecords - 1
                  : 0,
              },
              tasks: cached.availableTasks.tasks.filter((t) => t.id !== taskId),
            },
          },
        });
      },
    },
  );
};

export const VERIFY_INSTAGRAM_STORY_ACCOUNT_TASK = gql`
  mutation VerifyInstagramStoryAccountTask(
    $accountTaskId: Int!
    $storyUrl: String!
  ) {
    verifyInstagramStoryAccountTask(
      accountTaskId: $accountTaskId
      storyUrl: $storyUrl
    ) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
`;

export const useVerifyInstagramStoryAccountTask = () => {
  return useMutation<
    VerifyInstagramStoryAccountTask,
    VerifyInstagramStoryAccountTaskVariables
  >(VERIFY_INSTAGRAM_STORY_ACCOUNT_TASK);
};
