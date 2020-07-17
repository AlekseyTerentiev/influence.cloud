import { useQuery, useMutation } from '@apollo/react-hooks';

/*=== USER ===*/
// import { GET_ME, UPSERT_USER } from './queries/user';
// import { GetMe } from './types/GetMe';
// import { UpsertUser, UpsertUserVariables } from './types/UpsertUser';

/*=== INSTAGRAM_ACCOUNTS ===*/
// import {
//   UPSERT_INSTAGRAM_ACCOUNT,
//   VERIFY_INSTAGRAM_ACCOUNT,
//   UPDATE_INSTAGRAM_ACCOUNT,
//   DELETE_INSTAGRAM_ACCOUNT,
// } from './queries/instagram-accounts';
// import {
//   UpsertInstagramAccount,
//   UpsertInstagramAccountVariables,
// } from './types/UpsertInstagramAccount';
// import {
//   VerifyInstagramAccount,
//   VerifyInstagramAccountVariables,
// } from './types/VerifyInstagramAccount';
// import {
//   UpdateInstagramAccountVariables,
//   UpdateInstagramAccount,
// } from './types/UpdateInstagramAccount';
// import {
//   DeleteInstagramAccount,
//   DeleteInstagramAccountVariables,
// } from './types/DeleteInstagramAccount';

// /*=== TASK TYPES ===*/
// import { GET_TASK_TYPES } from './queries/task-types';
// import { GetTaskTypes } from './types/GetTaskTypes';

/*=== TASKS ===*/
// import {
//   GET_AVAILABLE_TASKS,
//   GET_ACCOUNT_TASKS,
//   CREATE_INSTAGRAM_COMMENT_TASK,
//   TAKE_INSTAGRAM_COMMENT_TASK,
// } from './queries/tasks';
// import {
//   GetAvailableTasks,
//   GetAvailableTasksVariables,
// } from './types/GetAvailableTasks';
// import { GetAccountTasks, GetAccountTasksVariables } from './types/GetAccountTasks';

// import {
//   CreateInstagramCommentTask,
//   CreateInstagramCommentTaskVariables,
// } from './types/CreateInstagramCommentTask';
// import {
//   TakeInstagramCommentTask,
//   TakeInstagramCommentTaskVariables,
// } from './types/TakeInstagramCommentTask';

/*=== USER ===*/

// export const useMe = () => {
//   const q = useQuery<GetMe>(GET_ME);
//   return { me: q.data?.me, ...q };
// };

// export const useUpsertUser = () => {
//   return useMutation<UpsertUser, UpsertUserVariables>(UPSERT_USER, {
//     refetchQueries: [{ query: GET_ME }],
//   });
// };

/*=== INSTAGRAM_ACCOUNTS ===*/

// export const useUpsertInstagramAccount = () => {
//   return useMutation<UpsertInstagramAccount, UpsertInstagramAccountVariables>(
//     UPSERT_INSTAGRAM_ACCOUNT,
//     { refetchQueries: [{ query: GET_ME }] },
//   );
// };

// export const useVerifyInstagramAccount = () => {
//   return useMutation<VerifyInstagramAccount, VerifyInstagramAccountVariables>(
//     VERIFY_INSTAGRAM_ACCOUNT,
//   );
// };

// export const useUpdateInstagramAccount = () => {
//   return useMutation<UpdateInstagramAccount, UpdateInstagramAccountVariables>(
//     UPDATE_INSTAGRAM_ACCOUNT,
//     { refetchQueries: [{ query: GET_ME }] },
//   );
// };

// export const useDeleteInstagramAccount = () => {
//   return useMutation<DeleteInstagramAccount, DeleteInstagramAccountVariables>(
//     DELETE_INSTAGRAM_ACCOUNT,
//     { refetchQueries: [{ query: GET_ME }] },
//   );
// };

/*=== TASK TYPES ===*/
// export const useTaskTypes = () => {
//   const q = useQuery<GetTaskTypes>(GET_TASK_TYPES);
//   return { taskTypes: q.data?.taskTypes, ...q };
// };

/*=== TASKS ===*/

// export const useAvailableTasks = (variables: GetAvailableTasksVariables) => {
//   const q = useQuery<GetAvailableTasks, GetAvailableTasksVariables>(
//     GET_AVAILABLE_TASKS,
//     { variables },
//   );
//   return {
//     availableTasks: q.data?.availableTasks.tasks,
//     pageInfo: q.data?.availableTasks.pageInfo,
//     ...q,
//   };
// };

// export const useAccountTasks = (variables: GetAccountTasksVariables) => {
//   const q = useQuery<GetAccountTasks, GetAccountTasksVariables>(GET_ACCOUNT_TASKS, {
//     variables,
//   });
//   return { accountTasks: q.data?.accountTasks, ...q };
// };

// export const useCreateInstagramCommentTask = () => {
//   return useMutation<
//     CreateInstagramCommentTask,
//     CreateInstagramCommentTaskVariables
//   >(CREATE_INSTAGRAM_COMMENT_TASK, {
//     refetchQueries: [{ query: GET_ME }],
//   });
// };

// export const useTakeInstagramCommentTask = () => {
//   return useMutation<TakeInstagramCommentTask, TakeInstagramCommentTaskVariables>(
//     TAKE_INSTAGRAM_COMMENT_TASK,
//     {
//       refetchQueries: [{ query: GET_ACCOUNT_TASKS }],
//       // refetchQueries: [{ query: GET_AVAILABLE_TASKS }],
//       // todo: remove taken task from available tasks
//     },
//   );
// };
