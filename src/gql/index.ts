import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_USER,
  UPSERT_USER,
  GET_USER_SOCIAL_ACCOUNTS,
  GET_MY_INSTAGRAM_ACCOUNTS,
  UPSERT_INSTAGRAM_ACCOUNT,
  VERIFY_INSTAGRAM_ACCOUNT,
  UPDATE_INSTAGRAM_ACCOUNT,
  DELETE_INSTAGRAM_ACCOUNT,
} from './queries';
import { GetUser, GetUserVariables } from './types/GetUser';
import {
  GetUserSocialAccounts,
  GetUserSocialAccountsVariables,
} from './types/GetUserSocialAccounts';
import { GetMyInstagramAccounts } from './types/GetMyInstagramAccounts';
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

/*=== USER ===*/

export const useUser = (id: 'me' | string) => {
  const q = useQuery<GetUser, GetUserVariables>(GET_USER, {
    variables: { id },
  });
  return { user: q.data?.getUser, ...q };
};

export const useUpsertUser = () => {
  return useMutation(UPSERT_USER, {
    refetchQueries: [{ query: GET_USER, variables: { id: 'me' } }],
  });
};

/*=== INSTAGRAM_ACCOUNTS ===*/

export const useMyInstagramAccounts = () => {
  const q = useQuery<GetMyInstagramAccounts>(GET_MY_INSTAGRAM_ACCOUNTS);
  return { myInstagramAccounts: q.data?.getMyInstagramAccounts, ...q };
};

export const useUpsertInstagramAccount = () => {
  return useMutation<UpsertInstagramAccount, UpsertInstagramAccountVariables>(
    UPSERT_INSTAGRAM_ACCOUNT,
    {
      refetchQueries: [{ query: GET_MY_INSTAGRAM_ACCOUNTS }],
    },
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
    {
      refetchQueries: [{ query: GET_MY_INSTAGRAM_ACCOUNTS }],
    },
  );
};

export const useDeleteInstagramAccount = () => {
  return useMutation<DeleteInstagramAccount, DeleteInstagramAccountVariables>(
    DELETE_INSTAGRAM_ACCOUNT,
    {
      refetchQueries: [{ query: GET_MY_INSTAGRAM_ACCOUNTS }],
    },
  );
};

/*=== SOCIAL_ACCOUNTS ===*/

export const useUserSocialAccounts = (userId: 'me' | string) => {
  const q = useQuery<GetUserSocialAccounts, GetUserSocialAccountsVariables>(
    GET_USER_SOCIAL_ACCOUNTS,
    { variables: { userId } },
  );
  return { userSocialAccounts: q.data?.getUserSocialAccounts, ...q };
};
