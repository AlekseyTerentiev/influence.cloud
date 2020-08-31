import { gql } from 'apollo-boost';
import { useQuery /*, useMutation*/ } from '@apollo/react-hooks';
import { GetTaskTypes } from './types/GetTaskTypes';

export const TASK_TYPE_DATA = gql`
  fragment TaskTypeData on TaskType {
    id
    name
    title
    description
    averageCost
    companyCommission
    type
    ready
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

/*=== HOOKS ===*/

export const useTaskTypes = () => {
  const q = useQuery<GetTaskTypes>(GET_TASK_TYPES);
  return { taskTypes: q.data?.taskTypes, ...q };
};
