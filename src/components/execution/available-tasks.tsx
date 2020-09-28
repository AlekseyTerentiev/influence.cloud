import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAvailableTasks } from 'gql/available-tasks';
import { Link } from '@reach/router';
import { availableTaskRoute } from 'routes';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
} from '@material-ui/core';
import { Error } from 'components/common/error';
import { Currency } from 'components/billing/currency';
import { useFetchOnScroll } from 'components/common/fetch-on-scroll/useFetchOnScroll';
import { FetchMore } from 'components/common/fetch-on-scroll/fetch-more';
import { TaskPreview } from 'components/common/task-preview';

export interface AvailableTasksProps {
  accountId: number;
  withHeader?: boolean;
}

export const AvailableTasks: FC<AvailableTasksProps> = ({
  accountId,
  withHeader = false,
}) => {
  const { t } = useTranslation();
  const c = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { availableTasks, pageInfo, loading, error, fetchMore } = useAvailableTasks({
    accountId,
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

      {availableTasks && availableTasks.length > 0 ? (
        <Box className={c.tasks} onScroll={handleScroll}>
          {availableTasks.map((task) => (
            <Link
              key={task.id}
              className={c.task}
              to={availableTaskRoute(accountId, task.id)}
            >
              <TaskPreview task={task} className={c.preview} />

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
                  {t('Payout')}: {t('immediately')}
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

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    header: {
      fontSize: t.typography.h6.fontSize,
      fontWeight: t.typography.h6.fontWeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: t.spacing(1.25),
    },
    tasksCount: {
      color: t.palette.text.hint,
    },
    tasks: {
      [t.breakpoints.up('md')]: {
        borderTop: `2px solid ${t.palette.divider}`,
        maxHeight: 560,
        overflowY: 'scroll',
      },
    },
    task: {
      display: 'flex',
      background: t.palette.background.paper,
      borderBottom: `1px solid ${t.palette.divider}`,
      padding: t.spacing(2),
      cursor: 'pointer',
      '&:hover': {
        background: t.palette.grey['100'],
      },
      [t.breakpoints.up('sm')]: {
        border: `1px solid ${t.palette.divider}`,
        borderRadius: t.shape.borderRadius,
        marginTop: t.spacing(1),
      },
    },
    preview: {
      height: t.spacing(7),
      width: t.spacing(7),
      marginRight: t.spacing(1.75),
    },
    infoContainer: {
      flex: 1,
      display: 'grid',
      grid: 'auto auto / auto auto',
      gridRowGap: t.spacing(1),
      '& > *': {
        lineHeight: 1,
        // margin: 'auto 0',
      },
    },
    taskType: {
      marginTop: t.spacing(0.75),
      fontSize: t.typography.fontSize,
      letterSpacing: 0.5,
    },
    reward: {
      marginTop: 2,
      fontSize: '1.45rem',
      fontWeight: t.typography.fontWeightMedium,
      textAlign: 'right',
    },
    approval: {
      color: t.palette.text.hint,
      fontSize: 15,
    },
    payout: {
      color: t.palette.text.hint,
      fontSize: 15,
      textAlign: 'right',
    },
    noTasksHint: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
      marginTop: t.spacing(1),
      [t.breakpoints.down('xs')]: {
        marginTop: t.spacing(2.5),
        marginLeft: t.spacing(3),
      },
    },
  }),
);
