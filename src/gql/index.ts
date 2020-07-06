import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_ME,
  UPSERT_USER,
  UPSERT_INSTAGRAM_ACCOUNT,
  VERIFY_INSTAGRAM_ACCOUNT,
  UPDATE_INSTAGRAM_ACCOUNT,
  DELETE_INSTAGRAM_ACCOUNT,
  GET_TASK_TYPES,
  CREATE_INSTAGRAM_COMMENT_TASK,
} from './queries';

import { GetMe } from './types/GetMe';
import { UpsertUser, UpsertUserVariables } from './types/UpsertUser';
import {
  UpsertInstagramAccount,
  UpsertInstagramAccountVariables,
} from './types/UpsertInstagramAccount';
import {
  VerifyInstagramAccount,
  VerifyInstagramAccountVariables,
} from './types/VerifyInstagramAccount';
import {
  UpdateInstagramAccountVariables,
  UpdateInstagramAccount,
} from './types/UpdateInstagramAccount';
import {
  DeleteInstagramAccount,
  DeleteInstagramAccountVariables,
} from './types/DeleteInstagramAccount';
import { GetTaskTypes } from './types/GetTaskTypes';
import {
  CreateInstagramCommentTask,
  CreateInstagramCommentTaskVariables,
} from './types/CreateInstagramCommentTask';

/*=== USER ===*/

export const useMe = () => {
  const q = useQuery<GetMe>(GET_ME);
  return { me: q.data?.me, ...q };
};

export const useUpsertUser = () => {
  return useMutation<UpsertUser, UpsertUserVariables>(UPSERT_USER, {
    refetchQueries: [{ query: GET_ME }],
  });
};

/*=== INSTAGRAM_ACCOUNTS ===*/

export const useUpsertInstagramAccount = () => {
  return useMutation<UpsertInstagramAccount, UpsertInstagramAccountVariables>(
    UPSERT_INSTAGRAM_ACCOUNT,
    { refetchQueries: [{ query: GET_ME }] },
  );
};

export const useVerifyInstagramAccount = () => {
  return useMutation<VerifyInstagramAccount, VerifyInstagramAccountVariables>(
    VERIFY_INSTAGRAM_ACCOUNT,
  );
};

export const useUpdateInstagramAccount = () => {
  return useMutation<UpdateInstagramAccount, UpdateInstagramAccountVariables>(
    UPDATE_INSTAGRAM_ACCOUNT,
    { refetchQueries: [{ query: GET_ME }] },
  );
};

export const useDeleteInstagramAccount = () => {
  return useMutation<DeleteInstagramAccount, DeleteInstagramAccountVariables>(
    DELETE_INSTAGRAM_ACCOUNT,
    { refetchQueries: [{ query: GET_ME }] },
  );
};

/*=== TASKS ===*/

export const useTaskTypes = () => {
  const q = useQuery<GetTaskTypes>(GET_TASK_TYPES);
  return { taskTypes: q.data?.taskTypes, ...q };
};

export const useCreateInstagramCommentTask = () => {
  return useMutation<
    CreateInstagramCommentTask,
    CreateInstagramCommentTaskVariables
  >(CREATE_INSTAGRAM_COMMENT_TASK, {
    refetchQueries: [{ query: GET_ME }],
  });
};
