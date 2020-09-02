import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAvailableTasks } from 'gql/tasks';
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
  Button,
} from '@material-ui/core';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Currency } from 'components/billing/currency';

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

  useEffect(() => {
    if (!smDown) {
      return;
    }
    window.addEventListener('scroll', handleBodyScroll);
    return () => window.removeEventListener('scroll', handleBodyScroll);
  });

  const handleBodyScroll = () => {
    const bottom =
      window.pageYOffset + window.innerHeight === document.body.scrollHeight;
    if (bottom) {
      fetchMoreTasks();
    }
  };

  const handleTasksScroll = (e: any) => {
    if (smDown) {
      return;
    }
    const target = e.target;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      fetchMoreTasks();
    }
  };

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
        <Box className={c.tasks} onScroll={handleTasksScroll}>
          {availableTasks.map((task) => (
            <Link
              key={task.taskId}
              className={c.task}
              to={availableTaskRoute(accountId, task.taskId)}
            >
              <img
                alt='preview'
                className={c.preview}
                src={task.instagramCommentTask?.post?.smallPreviewUrl || ''}
              />

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
            <Box className={c.loadingBox}>
              {loading ? (
                <Loading dense />
              ) : (
                <Button
                  variant='text'
                  color='primary'
                  style={{ opacity: 0.7 }}
                  onClick={fetchMoreTasks}
                >
                  {t('Load more')}
                </Button>
              )}
            </Box>
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
        marginTop: t.spacing(1.5),
      },
    },
    preview: {
      borderRadius: 4,
      height: t.spacing(7),
      width: t.spacing(7),
      objectFit: 'cover',
      marginRight: t.spacing(1.75),
    },
    infoContainer: {
      flex: 1,
      display: 'grid',
      grid: 'auto auto / auto auto',
      gridRowGap: t.spacing(0.75),
      '& > *': {
        lineHeight: 1,
        margin: 'auto 0',
      },
    },
    taskType: {
      fontSize: t.typography.fontSize,
      letterSpacing: 0.5,
    },
    reward: {
      fontSize: '1.5rem',
      fontWeight: t.typography.fontWeightMedium,
      textAlign: 'right',
    },
    approval: {
      color: t.palette.text.hint,
      fontSize: t.typography.body2.fontSize,
    },
    payout: {
      color: t.palette.text.hint,
      fontSize: t.typography.body2.fontSize,
      textAlign: 'right',
    },
    loadingBox: {
      height: t.spacing(11),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
