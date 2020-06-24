import { useQuery, useMutation } from '@apollo/react-hooks';
import { GetUser, GetUserVariables } from './types/GetUser';
import {
  GetUserSocialAccounts,
  GetUserSocialAccountsVariables,
} from './types/GetUserSocialAccounts';
import {
  GET_USER,
  GET_USER_SOCIAL_ACCOUNTS,
  UPSERT_USER,
  UPSERT_INSTAGRAM_ACCOUNT,
  VERIFY_INSTAGRAM_ACCOUNT,
  UPDATE_INSTAGRAM_ACCOUNT,
  DELETE_INSTAGRAM_ACCOUNT,
} from './queries';

/*=== QUERIES ===*/

export const useUser = (id: 'me' | string) => {
  const q = useQuery<GetUser, GetUserVariables>(GET_USER, {
    variables: { id },
  });
  return { user: q.data?.getUser, ...q };
};

export const useUserSocialAccounts = (userId: 'me' | string) => {
  const q = useQuery<GetUserSocialAccounts, GetUserSocialAccountsVariables>(
    GET_USER_SOCIAL_ACCOUNTS,
    { variables: { userId } },
  );
  return { userSocialAccounts: q.data?.getUserSocialAccounts, ...q };
};

/*=== MUTATIONS ===*/

export const useUpsertUser = () => {
  return useMutation(UPSERT_USER, {
    refetchQueries: [{ query: GET_USER, variables: { id: 'me' } }],
  });
};

export const useUpsertInstagramAccount = () => {
  return useMutation(UPSERT_INSTAGRAM_ACCOUNT, {
    refetchQueries: [
      { query: GET_USER_SOCIAL_ACCOUNTS, variables: { userId: 'me' } },
    ],
  });
};

export const useVerifyInstagramAccount = () => {
  return useMutation(VERIFY_INSTAGRAM_ACCOUNT);
};

export const useUpdateInstagramAccount = () => {
  return useMutation(UPDATE_INSTAGRAM_ACCOUNT, {
    refetchQueries: [
      { query: GET_USER_SOCIAL_ACCOUNTS, variables: { userId: 'me' } },
    ],
  });
};

export const useDeleteInstagramAccount = () => {
  return useMutation(DELETE_INSTAGRAM_ACCOUNT, {
    refetchQueries: [
      { query: GET_USER_SOCIAL_ACCOUNTS, variables: { userId: 'me' } },
    ],
  });
};
