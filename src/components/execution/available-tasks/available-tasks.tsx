import React, { FC } from 'react';
import { GetMe_me_accounts } from 'gql/types/GetMe';
import { useStyles } from './available-tasks.s';
import { useTranslation } from 'react-i18next';
import { useAvailableTasks } from 'gql/available-tasks';
import { Link } from '@reach/router';
import { availableTaskRoute } from 'routes';
import { useTheme, useMediaQuery, Box, Typography } from '@material-ui/core';
import { Error } from 'components/common/error';
import { Currency } from 'components/billing/currency';
import { useFetchOnScroll } from 'components/common/fetch-on-scroll/useFetchOnScroll';
import { FetchMore } from 'components/common/fetch-on-scroll/fetch-more';
import { TaskPreview } from 'components/common/task-preview';
import { AccountStatsBanner } from 'components/account/account-stats-banner';

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
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
    bodyScroll: smDown,
    onFetchMore: fetchMoreTasks,
  });

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  return (
    <Box className={c.root}>
      {withHeader && (
        <Typography className={c.header}>
          <span>{t('Available tasks')}</span>
          <span className={c.tasksCount}>{pageInfo?.totalRecords || ''}</span>
        </Typography>
      )}

      {(account.impressions === null ||
        account.impressionsStory === null ||
        account.profileVisits === null ||
        account.mediaLinkUrls.length === 0) && (
        <AccountStatsBanner account={account} />
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
                <Typography className={c.taskType}>
                  {t(task.taskType?.name || '')}
                </Typography>
                <Currency
                  className={c.reward}
                  value={
                    task.reward + Math.round((task.reward * task.bonusRate) / 100)
                  }
                />
                <Typography className={c.approval}>
                  {t('Approval')}: {t('auto')}
                </Typography>
                <Typography className={c.payout}>
                  {t('Payout')}: {t('instant')}
                </Typography>
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
