import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from './user';
import {
  CreateRefillTransaction,
  CreateRefillTransactionVariables,
} from './types/CreateRefillTransaction';
import {
  CreateWithdrawalTransaction,
  CreateWithdrawalTransactionVariables,
} from './types/CreateWithdrawalTransaction';
import {
  CheckBalanceTransaction,
  CheckBalanceTransactionVariables,
} from './types/CheckBalanceTransaction';

/*=== QUERIES ===*/

export const CREATE_REFILL_TRANSACTION = gql`
  mutation CreateRefillTransaction($amount: Float!) {
    createRefillTransaction(data: { amount: $amount }) {
      clientSecret
    }
  }
`;

export const CREATE_WITHDRAWAL_TRANSACTION = gql`
  mutation CreateWithdrawalTransaction(
    $amount: Float!
    $token: String!
    $ip: String!
  ) {
    createWithdrawalTransaction(data: { amount: $amount, token: $token, ip: $ip }) {
      id
    }
  }
`;

export const CHECK_BALANCE_TRANSACTION = gql`
  mutation CheckBalanceTransaction($paymentId: String!, $type: TransactionType!) {
    checkBalanceTransaction(data: { paymentId: $paymentId, type: $type })
  }
`;

/*=== HOOKS ===*/

export const useCreateRefillTransaction = () => {
  return useMutation<CreateRefillTransaction, CreateRefillTransactionVariables>(
    CREATE_REFILL_TRANSACTION,
  );
};

export const useCreateWithdrawalTransaction = () => {
  return useMutation<
    CreateWithdrawalTransaction,
    CreateWithdrawalTransactionVariables
  >(CREATE_WITHDRAWAL_TRANSACTION);
};

export const useCheckBalanceTransaction = () => {
  return useMutation<CheckBalanceTransaction, CheckBalanceTransactionVariables>(
    CHECK_BALANCE_TRANSACTION,
    { refetchQueries: [{ query: GET_ME }] },
  );
};
