import { gql, useMutation } from '@apollo/client';
import { ACCOUNT_TASK_DATA } from './account-tasks';
import {
  TakeInstagramCommentTask,
  TakeInstagramCommentTaskVariables,
} from './types/TakeInstagramCommentTask';
import { GET_ACCOUNT_TASKS } from './account-tasks';
import { GET_AVAILABLE_TASKS } from './available-tasks';
import {
  VerifyInstagramCommentAccountTask,
  VerifyInstagramCommentAccountTaskVariables,
} from './types/VerifyInstagramCommentAccountTask';
import { GetAvailableTasks } from './types/GetAvailableTasks';

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const TAKE_INSTAGRAM_COMMENT_TASK = gql`
  mutation TakeInstagramCommentTask($taskId: Int!, $accountId: Int!) {
    takeInstagramCommentTask(taskId: $taskId, accountId: $accountId) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
`;

export const useTakeInstagramCommentTask = (accountId: number, taskId: number) => {
  return useMutation<TakeInstagramCommentTask, TakeInstagramCommentTaskVariables>(
    TAKE_INSTAGRAM_COMMENT_TASK,
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

export const VERIFY_INSTAGRAM_COMMENT_ACCOUNT_TASK = gql`
  mutation VerifyInstagramCommentAccountTask($accountTaskId: Int!) {
    verifyInstagramCommentAccountTask(accountTaskId: $accountTaskId) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
`;

export const useVerifyInstagramCommentAccountTask = () => {
  return useMutation<
    VerifyInstagramCommentAccountTask,
    VerifyInstagramCommentAccountTaskVariables
  >(VERIFY_INSTAGRAM_COMMENT_ACCOUNT_TASK, {
    // refetchQueries: [{ query: GET_ME }],
  });
};
