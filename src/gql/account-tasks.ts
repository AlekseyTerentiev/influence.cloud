import { gql, useQuery } from '@apollo/client';
import { TASK_TYPE_DATA } from './task-types';
import { INSTAGRAM_POST_DATA } from './instagram-post';
import { GetAccountTasks, GetAccountTasksVariables } from './types/GetAccountTasks';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const ACCOUNT_TASK_DATA = gql`
  fragment AccountTaskData on AccountTask {
    id
    status
    reward
    taskExpiredAt
    accountTaskExpiredAt
    bonusRate
    bonus
    bonusStatus
    description
    taskType {
      ...TaskTypeData
    }
    ... on InstagramCommentAccountTask {
      post {
        ...InstagramPostData
      }
    }
    ... on InstagramStoryAccountTask {
      accountUsername
      websiteUrl
      layoutMediaUrls
      # costFrom
      # costTo
    }
  }
  ${TASK_TYPE_DATA}
  ${INSTAGRAM_POST_DATA}
`;

/*------------------------------------------------------------------------------*/
/*   QUERIES                                                                    */
/*------------------------------------------------------------------------------*/

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
