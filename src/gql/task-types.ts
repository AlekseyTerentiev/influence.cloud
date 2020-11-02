import { useState, useEffect } from 'react';
import { gql, useQuery, useApolloClient, ApolloQueryResult } from '@apollo/client';
import { GetTaskTypes } from './types/GetTaskTypes';
import { GetTaskTypeCost } from './types/GetTaskTypeCost';

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
  query GetTaskTypeCost($id: Int!, $country: String!) {
    taskTypeCost(id: $id, country: $country) {
      id
      country
      cost
    }
  }
`;

export const useTaskTypeCosts = (taskTypeId: number, countries: string[]) => {
  const apolloClient = useApolloClient();
  const [costs, setCosts] = useState<{ country: string; cost: number }[]>();

  useEffect(() => {
    Promise.all(
      countries.map((country) =>
        apolloClient.query({
          query: GET_TASK_TYPE_COST,
          variables: { id: taskTypeId, country: country },
        }),
      ),
    ).then((costs: ApolloQueryResult<GetTaskTypeCost>[]) => {
      setCosts(
        costs.map((cost) => ({
          country: cost.data.taskTypeCost.country,
          cost: cost.data.taskTypeCost.cost,
        })),
      );
    });
  }, [taskTypeId, countries]);

  return costs;
};
