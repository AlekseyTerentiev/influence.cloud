import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
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
  }
`;

export const UPSERT_USER = gql`
  mutation UpsertUser(
    $nickname: String
    $givenName: String
    $familyName: String
    $gender: String
    $birthDate: Date
    $phone: String
    $language: String
    $locale: String
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
  }
`;
