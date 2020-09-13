import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { INSTAGRAM_ACCOUNT_DATA } from './instagram-accounts';
import { GetMe } from './types/GetMe';
import { UpsertUser, UpsertUserVariables } from './types/UpsertUser';
import { UpdateUser, UpdateUserVariables } from './types/UpdateUser';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const USER_DATA = gql`
  fragment UserData on User {
    id
    email
    avatarUrl
    nickname
    givenName
    familyName
    gender
    birthDate
    phone
    language
    locale
    country
    city
    region
    timezone
    balance {
      id
      balance
    }
    completedTasks
    accounts {
      id
      username
      verified
      rating
      instagramAccount {
        ...InstagramAccountData
      }
    }
  }
  ${INSTAGRAM_ACCOUNT_DATA}
`;

/*------------------------------------------------------------------------------*/
/*   QUERIES                                                                    */
/*------------------------------------------------------------------------------*/

export const GET_ME = gql`
  query GetMe {
    me {
      ...UserData
    }
  }
  ${USER_DATA}
`;

export const useMe = () => {
  const q = useQuery<GetMe>(GET_ME);
  return { me: q.data?.me, ...q };
};

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const UPSERT_USER = gql`
  mutation UpsertUser(
    $nickname: String!
    $givenName: String
    $familyName: String
    $gender: String
    $birthDate: Date
    $phone: String!
    $language: String
    $locale: String
    $country: String
    $city: String
    $region: String
    $timezone: String
  ) {
    upsertUser(
      data: {
        nickname: $nickname
        givenName: $givenName
        familyName: $familyName
        gender: $gender
        birthDate: $birthDate
        phone: $phone
        language: $language
        locale: $locale
        country: $country
        city: $city
        region: $region
        timezone: $timezone
      }
    ) {
      ...UserData
    }
  }
  ${USER_DATA}
`;

export const useUpsertUser = () => {
  return useMutation<UpsertUser, UpsertUserVariables>(UPSERT_USER, {
    refetchQueries: [{ query: GET_ME }],
  });
};

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $nickname: String
    $givenName: String
    $familyName: String
    $gender: String
    $birthDate: Date
    $phone: String
    $language: String
    $locale: String
    $country: String
    $city: String
    $region: String
    $timezone: String
  ) {
    updateUser(
      data: {
        nickname: $nickname
        givenName: $givenName
        familyName: $familyName
        gender: $gender
        birthDate: $birthDate
        phone: $phone
        language: $language
        locale: $locale
        country: $country
        city: $city
        region: $region
        timezone: $timezone
      }
    ) {
      ...UserData
    }
  }
  ${USER_DATA}
`;

export const useUpdateUser = () => {
  return useMutation<UpdateUser, UpdateUserVariables>(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });
};
