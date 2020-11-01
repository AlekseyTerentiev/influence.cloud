import { gql, useMutation } from '@apollo/client';
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
  CreateManualTransaction,
  CreateManualTransactionVariables,
} from './types/CreateManualTransaction';
import {
  CheckBalanceTransaction,
  CheckBalanceTransactionVariables,
} from './types/CheckBalanceTransaction';

/*------------------------------------------------------------------------------*/
/*   MUTATIONS                                                                  */
/*------------------------------------------------------------------------------*/

export const CREATE_REFILL_TRANSACTION = gql`
  mutation CreateRefillTransaction($amount: Float!) {
    createRefillTransaction(amount: $amount) {
      clientSecret
    }
  }
`;

export const useCreateRefillTransaction = () => {
  return useMutation<CreateRefillTransaction, CreateRefillTransactionVariables>(
    CREATE_REFILL_TRANSACTION,
  );
};

export const CREATE_WITHDRAWAL_TRANSACTION = gql`
  mutation CreateWithdrawalTransaction(
    $amount: Float!
    $token: String!
    $ip: String!
    $paymentMethodId: String!
  ) {
    createWithdrawalTransaction(
      amount: $amount
      token: $token
      ip: $ip
      paymentMethodId: $paymentMethodId
    ) {
      id
    }
  }
`;

export const useCreateWithdrawalTransaction = () => {
  return useMutation<
    CreateWithdrawalTransaction,
    CreateWithdrawalTransactionVariables
  >(CREATE_WITHDRAWAL_TRANSACTION);
};

export const CREATE_MANUAL_TRANSACTION = gql`
  mutation CreateManualTransaction(
    $amount: Float!
    $cardNumber: String!
    $fullName: String!
  ) {
    createManualTransaction(
      amount: $amount
      cardNumber: $cardNumber
      fullName: $fullName
    )
  }
`;

export const useCreateManualTransaction = () => {
  return useMutation<CreateManualTransaction, CreateManualTransactionVariables>(
    CREATE_MANUAL_TRANSACTION,
  );
};

export const CHECK_BALANCE_TRANSACTION = gql`
  mutation CheckBalanceTransaction($paymentId: String!, $type: TransactionType!) {
    checkBalanceTransaction(paymentId: $paymentId, type: $type)
  }
`;

export const useCheckBalanceTransaction = () => {
  return useMutation<CheckBalanceTransaction, CheckBalanceTransactionVariables>(
    CHECK_BALANCE_TRANSACTION,
    { refetchQueries: [{ query: GET_ME }] },
  );
};
