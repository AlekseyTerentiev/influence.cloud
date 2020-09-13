import { gql, useMutation } from '@apollo/client';
import { GET_ME } from './user';
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

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const INSTAGRAM_ACCOUNT_DATA = gql`
  fragment InstagramAccountData on InstagramAccount {
    id
    username
    profilePic
    postsAmount
    followersAmount
    accountType
    country
    region
    city
    language
  }
`;

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const UPSERT_INSTAGRAM_ACCOUNT = gql`
  mutation UpsertInstagramAccount($username: String!) {
    upsertInstagramAccount(data: { username: $username }) {
      id
      username
      emojis
    }
  }
`;

export const useUpsertInstagramAccount = () => {
  return useMutation<UpsertInstagramAccount, UpsertInstagramAccountVariables>(
    UPSERT_INSTAGRAM_ACCOUNT,
    // { refetchQueries: [{ query: GET_ME }] },
  );
};

export const VERIFY_INSTAGRAM_ACCOUNT = gql`
  mutation VerifyInstagramAccount($username: String!, $emojis: String!) {
    verifyInstagramAccount(data: { username: $username, emojis: $emojis }) {
      ...InstagramAccountData
    }
  }
  ${INSTAGRAM_ACCOUNT_DATA}
`;

export const useVerifyInstagramAccount = () => {
  return useMutation<VerifyInstagramAccount, VerifyInstagramAccountVariables>(
    VERIFY_INSTAGRAM_ACCOUNT,
  );
};

export const UPDATE_INSTAGRAM_ACCOUNT = gql`
  mutation UpdateInstagramAccount(
    $id: Int!
    $username: String
    $accountType: AccountType
    $city: String
    $region: String
    $country: String
    $language: String
  ) {
    updateInstagramAccount(
      data: {
        id: $id
        username: $username
        accountType: $accountType
        city: $city
        region: $region
        country: $country
        language: $language
      }
    ) {
      ...InstagramAccountData
    }
  }
  ${INSTAGRAM_ACCOUNT_DATA}
`;

export const useUpdateInstagramAccount = () => {
  return useMutation<UpdateInstagramAccount, UpdateInstagramAccountVariables>(
    UPDATE_INSTAGRAM_ACCOUNT,
    { refetchQueries: [{ query: GET_ME }] },
  );
};

export const DELETE_INSTAGRAM_ACCOUNT = gql`
  mutation DeleteInstagramAccount($id: Int!) {
    deleteInstagramAccount(data: { id: $id })
  }
`;

export const useDeleteInstagramAccount = () => {
  return useMutation<DeleteInstagramAccount, DeleteInstagramAccountVariables>(
    DELETE_INSTAGRAM_ACCOUNT,
    { refetchQueries: [{ query: GET_ME }] },
  );
};
