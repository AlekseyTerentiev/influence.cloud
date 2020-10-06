import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountTasks } from 'gql/account-tasks';
import { Link } from '@reach/router';
import { accountTaskRoute } from 'routes';
import { Box, Typography } from '@material-ui/core';
import { Error } from 'components/common/error';
import { TaskPreview } from 'components/common/task-preview';
import { Currency } from 'components/billing/currency';
import { AccountTaskStatus } from 'components/execution/account-task-status';

import { useStyles } from './account-tasks.s';

export interface AccountTasksProps {
  accountId: number;
  withHeader?: boolean;
}

export const AccountTasks: FC<AccountTasksProps> = ({
  accountId,
  withHeader = false,
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { accountTasks, error } = useAccountTasks({ accountId });

  if (!accountTasks) {
    return null;
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  return (
    <Box className={c.root}>
      {withHeader && (
        <Typography className={c.header}>
          <span>{t('Accepted tasks')}</span>
          <span className={c.tasksCount}>{accountTasks.length || 0}</span>
        </Typography>
      )}

      {accountTasks.length > 0 ? (
        <Box className={c.tasks}>
          {accountTasks.map((task) => (
            <Link
              key={task.id}
              className={c.task}
              to={accountTaskRoute(accountId, task.id)}
            >
              <TaskPreview task={task} />

              <Box className={c.infoContainer}>
                <Typography className={c.taskType}>
                  {t(task.taskType?.name || '')}
                </Typography>
                <Currency
                  className={c.reward}
                  value={task.reward + Math.round(task.bonus)}
                />
                <AccountTaskStatus className={c.status} status={task.status} />
                <Typography className={c.payout}>
                  {t('Payout')}: {t('instant')}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      ) : (
        <Typography className={c.noTasksHint}>{t('No accepted tasks')}</Typography>
      )}
    </Box>
  );
};
