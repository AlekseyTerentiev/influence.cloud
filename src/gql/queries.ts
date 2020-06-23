import { gql } from 'apollo-boost';

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
  }
`;

export const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      ...UserData
    }
  }
  ${USER_DATA}
`;

export const UPSERT_USER = gql`
  mutation UpsertUser(
    $nickname: String!
    $givenName: String!
    $familyName: String!
    $gender: String!
    $birthDate: Date!
    $phone: String!
    $language: String!
    $locale: String!
  ) {
    upsertUser(
      upsertUserInput: {
        nickname: $nickname
        givenName: $givenName
        familyName: $familyName
        gender: $gender
        birthDate: $birthDate
        phone: $phone
        language: $language
        locale: $locale
      }
    ) {
      ...UserData
    }
  }
  ${USER_DATA}
`;

export const INSTAGRAM_ACCOUNT_DATA = gql`
  fragment InstagramAccountData on InstagramAccount {
    id
    instagramId
    username
    profilePic
    postsAmount
    followersAmount
    accountType
  }
`;

export const GET_USER_SOCIAL_ACCOUNTS = gql`
  query GetUserSocialAccounts($userId: String!) {
    getUserSocialAccounts(userId: $userId) {
      id
      platformId
      username
      verified
      instagramAccount {
        ...InstagramAccountData
      }
    }
  }
  ${INSTAGRAM_ACCOUNT_DATA}
`;

export const UPSERT_INSTAGRAM_ACCOUNT = gql`
  mutation UpsertInstagramAccount($username: String!) {
    upsertInstagramAccount(upsertInstagramAccountInput: { username: $username }) {
      username
      emojis
    }
  }
`;

export const VERIFY_INSTAGRAM_ACCOUNT = gql`
  mutation VerifyInstagramAccount($username: String!, $emojis: String!) {
    verifyInstagramAccount(
      verifyInstagramAccountInput: { username: $username, emojis: $emojis }
    ) {
      id
      username
    }
  }
`;

export const UPDATE_INSTAGRAM_ACCOUNT = gql`
  mutation UpdateInstagramAccount($username: String!, $accountType: AccountType) {
    updateInstagramAccount(
      updateInstagramAccountInput: { username: $username, accountType: $accountType }
    ) {
      ...InstagramAccountData
    }
  }
  ${INSTAGRAM_ACCOUNT_DATA}
`;

export const DELETE_INSTAGRAM_ACCOUNT = gql`
  mutation DeleteInstagramAccount($id: Int!) {
    deleteInstagramAccount(deleteInstagramAccountInput: { id: $id })
  }
`;
