export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';
export const SIGNUP_CALLBACK_ROUTE = `${SIGNUP_ROUTE}/callback`;
export const SIGNUP_COMPLETE_ROUTE = `${SIGNUP_ROUTE}/complete`;

// TASKS PAGE
export const TASKS_ROUTE = '/tasks';
export const ACCOUNT_TASK_ROUTE = `/account/:accountId/:accountTaskId`;
export const accountTaskRoute = (accountId: number, accountTaskId: number) =>
  `${TASKS_ROUTE}/account/${accountId}/${accountTaskId}`;

export const AVAILABLE_TASK_ROUTE = `/available/:accountId/:taskId`;
export const availableTaskRoute = (accountId: number, taskId: number) =>
  `${TASKS_ROUTE}/available/${accountId}/${taskId}`;

// CREATE TASK PAGE
export const CREATE_TASK_ROUTE = '/create-tasks';
export const CREATED_TASK_ROUTE = '/created/:taskId';
export const createdTaskRoute = (taskId: number) =>
  `${CREATE_TASK_ROUTE}/created/${taskId}`;

// ACCOUNT PAGE
export const ACCOUNT_ROUTE = '/account';

// BILLING PAGE
export const BILLING_ROUTE = '/balance';
