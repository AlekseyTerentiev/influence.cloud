/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateRefillTransaction
// ====================================================

export interface CreateRefillTransaction_createRefillTransaction {
  __typename: "RefillTransaction";
  clientSecret: string;
}

export interface CreateRefillTransaction {
  createRefillTransaction: CreateRefillTransaction_createRefillTransaction;
}

export interface CreateRefillTransactionVariables {
  amount: number;
}
