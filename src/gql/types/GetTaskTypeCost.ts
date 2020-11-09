/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTaskTypeCost
// ====================================================

export interface GetTaskTypeCost_taskTypeCost {
  __typename: "TaskTypeCost";
  id: number;
  countries: string[];
  costFrom: number;
  costTo: number;
}

export interface GetTaskTypeCost {
  taskTypeCost: GetTaskTypeCost_taskTypeCost;
}

export interface GetTaskTypeCostVariables {
  id: number;
  countries: string[];
}
