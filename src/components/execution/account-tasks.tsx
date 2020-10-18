import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountTasks } from 'gql/account-tasks';
import { Link } from '@reach/router';
import { accountTaskRoute } from 'routes';
import { Box, Typography } from '@material-ui/core';
import { Error } from 'components/common/error';
import { TaskPreview } from 'components/common/task-preview';
import { TaskType } from 'components/common/task-type';
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
    return <Error name={t('Loading Error')} error={error} />;
  }

  return (
    <Box className={c.root}>
      {withHeader && (
        <div className={c.header}>
          <Typography variant='h6'>{t('Accepted Tasks')}</Typography>
          <Typography variant='h6' className={c.tasksCount}>
            {accountTasks.length || 0}
          </Typography>
        </div>
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
                <Box className={c.row}>
                  <Typography className={c.title}>
                    {task.__typename === 'InstagramCommentAccountTask' &&
                      task.post.ownerUsername}
                    {task.__typename === 'InstagramStoryAccountTask' &&
                      (task.accountUsername || task.websiteUrl)}
                  </Typography>
                  <Currency
                    className={c.reward}
                    value={task.reward + Math.round(task.bonus)}
                  />
                </Box>

                <Box className={c.row}>
                  <Box className={c.typeAndStatus}>
                    <TaskType task={task} onlyIcon />
                    <AccountTaskStatus className={c.status} status={task.status} />
                  </Box>

                  <Typography className={c.payout}>
                    Payout: {task.taskType.payoutType}
                  </Typography>
                </Box>
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
