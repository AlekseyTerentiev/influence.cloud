export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';
export const SIGNUP_CALLBACK_ROUTE = `${SIGNUP_ROUTE}/callback`;
export const SIGNUP_COMPLETE_ROUTE = `${SIGNUP_ROUTE}/complete`;

// TASKS PAGE
export const EXECUTION_ROUTE = '/execution';
export const ACCOUNT_TASK_ROUTE = `/account/:accountId/:accountTaskId`;
export const accountTaskRoute = (accountId: number, accountTaskId: number) =>
  `${EXECUTION_ROUTE}/account/${accountId}/${accountTaskId}`;

export const AVAILABLE_TASK_ROUTE = `/available/:accountId/:taskId`;
export const availableTaskRoute = (accountId: number, taskId: number) =>
  `${EXECUTION_ROUTE}/available/${accountId}/${taskId}`;

// PUBLICATION PAGE
export const PUBLICATION_ROUTE = '/publication';
export const CREATED_TASK_ROUTE = '/task/:taskId';
export const createdTaskRoute = (taskId: number) =>
  `${PUBLICATION_ROUTE}/task/${taskId}`;

// ACCOUNT PAGE
export const ACCOUNT_ROUTE = '/account';

// BILLING PAGE
export const BILLING_ROUTE = '/balance';
