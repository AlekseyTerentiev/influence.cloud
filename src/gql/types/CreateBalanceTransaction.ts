/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBalanceTransaction
// ====================================================

export interface CreateBalanceTransaction_createBalanceTransaction {
  __typename: "BalanceTransaction";
  clientSecret: string;
}

export interface CreateBalanceTransaction {
  createBalanceTransaction: CreateBalanceTransaction_createBalanceTransaction;
}

export interface CreateBalanceTransactionVariables {
  amount: number;
}
