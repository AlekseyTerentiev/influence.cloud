/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CheckBalanceTransaction
// ====================================================

export interface CheckBalanceTransaction {
  checkBalanceTransaction: boolean;
}

export interface CheckBalanceTransactionVariables {
  paymentId: string;
  type: TransactionType;
}
