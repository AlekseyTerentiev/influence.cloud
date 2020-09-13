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

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const TAKE_INSTAGRAM_COMMENT_TASK = gql`
  mutation TakeInstagramCommentTask($taskId: Int!, $accountId: Int!) {
    takeInstagramCommentTask(data: { taskId: $taskId, accountId: $accountId }) {
      ...AccountTaskData
    }
  }
  ${ACCOUNT_TASK_DATA}
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
                (t: any) => t.taskId !== data?.takeInstagramCommentTask?.id,
              ),
            },
          },
        });
      },
    },
  );
};

export const VERIFY_INSTAGRAM_COMMENT_ACCOUNT_TASK = gql`
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
  >(VERIFY_INSTAGRAM_COMMENT_ACCOUNT_TASK, {
    // refetchQueries: [{ query: GET_ME }],
  });
};
