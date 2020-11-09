import React, { FC } from 'react';
import { GetMe_me_accounts } from 'gql/types/GetMe';
import { useTranslation } from 'react-i18next';
import { useAvailableTasks } from 'gql/available-tasks';
import { Link } from '@reach/router';
import { availableTaskRoute } from 'routes';
import { Box, Typography } from '@material-ui/core';
import { Error } from 'components/common/error';
import { Currency } from 'components/billing/currency';
import { useFetchOnScroll } from 'components/common/fetch-on-scroll/useFetchOnScroll';
import { FetchMore } from 'components/common/fetch-on-scroll/fetch-more';
import { TaskPreview } from 'components/common/task-preview';
import { TaskType } from 'components/common/task-type';

import { useStyles } from './available-tasks.s';

export interface AvailableTasksProps {
  account: GetMe_me_accounts;
  withHeader?: boolean;
}

export const AvailableTasks: FC<AvailableTasksProps> = ({
  account,
  withHeader = false,
}) => {
  const { t } = useTranslation();
  const c = useStyles();

  const { availableTasks, pageInfo, loading, error, fetchMore } = useAvailableTasks({
    accountId: account.id,
  });

  const fetchMoreTasks = () => {
    if (loading || !pageInfo?.afterCursor) {
      return;
    }
    fetchMore({
      variables: { afterCursor: pageInfo?.afterCursor },
      updateQuery: ({ availableTasks }: any, { fetchMoreResult }: any) => {
        return {
          availableTasks: {
            ...availableTasks,
            tasks: [
              ...availableTasks.tasks,
              ...fetchMoreResult.availableTasks.tasks,
            ],
            pageInfo: {
              ...fetchMoreResult.availableTasks.pageInfo,
              afterCursor: fetchMoreResult.availableTasks.pageInfo.afterCursor,
            },
          },
        };
      },
    });
  };

  const { handleScroll } = useFetchOnScroll({
    onFetchMore: fetchMoreTasks,
  });

  if (error) {
    return <Error name={t('Loading Error')} error={error} />;
  }

  return (
    <Box className={c.root}>
      {withHeader && (
        <div className={c.header}>
          <Typography variant='h6'>{t('Available Tasks')}</Typography>
          <Typography variant='h6' className={c.tasksCount}>
            {pageInfo?.totalRecords || 0}
          </Typography>
        </div>
      )}

      {availableTasks && availableTasks.length > 0 ? (
        <Box className={c.tasks} onScroll={handleScroll}>
          {availableTasks.map((task) => (
            <Link
              key={task.id}
              className={c.task}
              to={availableTaskRoute(account.id, task.id)}
            >
              <TaskPreview task={task} />

              <Box className={c.infoContainer}>
                <Box className={c.row}>
                  <Typography className={c.title}>
                    {task.__typename === 'AvailableInstagramCommentTask' &&
                      task.post.ownerUsername}
                    {task.__typename === 'AvailableInstagramStoryTask' &&
                      (task.accountUsername || task.websiteUrl)}
                  </Typography>
                  {task.__typename === 'AvailableInstagramStoryTask' &&
                  !account?.statisticDataVerified &&
                  'costTo' in task ? (
                    <Typography style={{ whiteSpace: 'nowrap' }}>
                      {t('up to')}{' '}
                      <Currency value={task.costTo} className={c.reward} />
                    </Typography>
                  ) : (
                    <Currency
                      className={c.reward}
                      value={
                        task.reward +
                        Math.round((task.reward * task.bonusRate) / 100)
                      }
                    />
                  )}
                </Box>

                <Box className={c.row}>
                  <Box className={c.type}>
                    <TaskType task={task} />
                  </Box>
                  <Typography className={c.approval}>
                    {t('Approval')}:{' '}
                    {'needApprove' in task && task.needApprove
                      ? t('yes')
                      : t('auto')}
                  </Typography>
                </Box>
              </Box>
            </Link>
          ))}
          {pageInfo?.afterCursor && (
            <FetchMore loading={loading} onFetchMore={fetchMoreTasks} />
          )}
        </Box>
      ) : (
        <Typography className={c.noTasksHint}>{t('No available tasks')}</Typography>
      )}
    </Box>
  );
};

export interface AddAccountStatsProps {
  account: GetMe_me_accounts;
}
