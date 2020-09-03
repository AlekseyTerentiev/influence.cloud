/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateWithdrawalTransaction
// ====================================================

export interface CreateWithdrawalTransaction_createWithdrawalTransaction {
  __typename: "WithdrawalTransaction";
  id: string;
}

export interface CreateWithdrawalTransaction {
  createWithdrawalTransaction: CreateWithdrawalTransaction_createWithdrawalTransaction;
}

export interface CreateWithdrawalTransactionVariables {
  amount: number;
  token: string;
  ip: string;
  paymentMethodId: string;
}
