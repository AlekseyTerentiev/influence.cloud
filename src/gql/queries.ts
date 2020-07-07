import { gql } from 'apollo-boost';

/*=== INSTAGRAM_ACCOUNTS ===*/

export const DETAILED_INSTAGRAM_ACCOUNT_DATA = gql`
  fragment DetailedInstagramAccountData on DetailedInstagramAccount {
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

export const UPSERT_INSTAGRAM_ACCOUNT = gql`
  mutation UpsertInstagramAccount($username: String!) {
    upsertInstagramAccount(data: { username: $username }) {
      id
      username
      emojis
    }
  }
`;

export const VERIFY_INSTAGRAM_ACCOUNT = gql`
  mutation VerifyInstagramAccount($username: String!, $emojis: String!) {
    verifyInstagramAccount(data: { username: $username, emojis: $emojis }) {
      ...DetailedInstagramAccountData
    }
  }
  ${DETAILED_INSTAGRAM_ACCOUNT_DATA}
`;

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
      ...DetailedInstagramAccountData
    }
  }
  ${DETAILED_INSTAGRAM_ACCOUNT_DATA}
`;

export const DELETE_INSTAGRAM_ACCOUNT = gql`
  mutation DeleteInstagramAccount($id: Int!) {
    deleteInstagramAccount(data: { id: $id })
  }
`;

/*=== TASK_TYPES ===*/

export const TASK_TYPE_DATA = gql`
  fragment TaskTypeData on TaskType {
    id
    name
    title
    description
    averageCost
  }
`;

export const GET_TASK_TYPES = gql`
  query GetTaskTypes {
    taskTypes {
      ...TaskTypeData
    }
  }
  ${TASK_TYPE_DATA}
`;

/*=== TASKS ===*/

export const TASK_DATA = gql`
  fragment TaskData on Task {
    id
    description
    verified
    expireAt
    totalBudget
    currentBudget
    bonusRate
    taskType {
      ...TaskTypeData
    }
    instagramCommentTask {
      postUrl
    }
  }
  ${TASK_TYPE_DATA}
`;

export const GET_AVAILABLE_TASKS = gql`
  query GetAvailableTasks($accountId: Int!) {
    availableTasks(accountId: $accountId) {
      id
      description
      verified
      expireAt
      bonusRate
      taskType {
        ...TaskTypeData
      }
      instagramCommentTask {
        postUrl
        cost # todo: rename to reward
      }
    }
  }
  ${TASK_TYPE_DATA}
`;

export const CREATE_INSTAGRAM_COMMENT_TASK = gql`
  mutation CreateInstagramCommentTask(
    $taskTypeId: Int!
    $postUrl: String!
    $description: String!
    $expireAt: Date!
    $totalBudget: Int!
    $bonusRate: Int!
  ) {
    createInstagramCommentTask(
      data: {
        taskTypeId: $taskTypeId
        postUrl: $postUrl
        description: $description
        expireAt: $expireAt
        totalBudget: $totalBudget
        bonusRate: $bonusRate
      }
    ) {
      id
      postUrl
      description
      verified
      expireAt
      totalBudget
      currentBudget
      bonusRate
      taskType {
        ...TaskTypeData
      }
    }
  }
  ${TASK_TYPE_DATA}
`;

/*=== USER ===*/

export const DETAILED_USER_DATA = gql`
  fragment DetailedUserData on DetailedUser {
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
    balance {
      id
      balance
    }
    completedTasks
    accounts {
      id
      username
      verified
      instagramAccount {
        ...DetailedInstagramAccountData
      }
    }
    createdTasks {
      ...TaskData
    }
  }
  ${DETAILED_INSTAGRAM_ACCOUNT_DATA}
  ${TASK_DATA}
`;

export const GET_ME = gql`
  query GetMe {
    me {
      ...DetailedUserData
    }
  }
  ${DETAILED_USER_DATA}
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
      data: {
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
      ...DetailedUserData
    }
  }
  ${DETAILED_USER_DATA}
`;
