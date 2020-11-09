import { useState, useEffect } from 'react';
import { gql, useQuery, useApolloClient, ApolloQueryResult } from '@apollo/client';
import { GetTaskTypes } from './types/GetTaskTypes';
import { GetTaskTypeCost, GetTaskTypeCostVariables } from './types/GetTaskTypeCost';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const TASK_TYPE_DATA = gql`
  fragment TaskTypeData on TaskType {
    id
    name
    title
    description
    averageCost
    # companyCommission
    type
    ready
    implementationPeriod
    payoutType
  }
`;

/*------------------------------------------------------------------------------*/
/*   QUERIES                                                                    */
/*------------------------------------------------------------------------------*/

export const GET_TASK_TYPES = gql`
  query GetTaskTypes {
    taskTypes {
      ...TaskTypeData
    }
  }
  ${TASK_TYPE_DATA}
`;

export const useTaskTypes = () => {
  const q = useQuery<GetTaskTypes>(GET_TASK_TYPES);
  return { taskTypes: q.data?.taskTypes, ...q };
};

export const GET_TASK_TYPE_COST = gql`
  query GetTaskTypeCost($id: Int!, $countries: [String!]!) {
    taskTypeCost(id: $id, countries: $countries) {
      id
      countries
      costFrom
      costTo
    }
  }
`;

export const useTaskTypeCost = (variables: GetTaskTypeCostVariables) => {
  const q = useQuery<GetTaskTypeCost, GetTaskTypeCostVariables>(GET_TASK_TYPE_COST, {
    variables,
  });
  return { taskTypeCost: q.data?.taskTypeCost, ...q };
};
