import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from './user';
import {
  CreateBalanceTransaction,
  CreateBalanceTransactionVariables,
} from './types/CreateBalanceTransaction';
import {
  CheckBalanceTransaction,
  CheckBalanceTransactionVariables,
} from './types/CheckBalanceTransaction';

/*=== QUERIES ===*/

export const CREATE_BALANCE_TRANSACTION = gql`
  mutation CreateBalanceTransaction($amount: Float!) {
    createBalanceTransaction(data: { amount: $amount }) {
      clientSecret
    }
  }
`;

export const CHECK_BALANCE_TRANSACTION = gql`
  mutation CheckBalanceTransaction($paymentId: String!) {
    checkBalanceTransaction(data: { paymentId: $paymentId })
  }
`;

/*=== HOOKS ===*/

export const useCreateBalanceTransaction = () => {
  return useMutation<CreateBalanceTransaction, CreateBalanceTransactionVariables>(
    CREATE_BALANCE_TRANSACTION,
  );
};

export const useCheckBalanceTransaction = () => {
  return useMutation<CheckBalanceTransaction, CheckBalanceTransactionVariables>(
    CHECK_BALANCE_TRANSACTION,
    { refetchQueries: [{ query: GET_ME }] },
  );
};
