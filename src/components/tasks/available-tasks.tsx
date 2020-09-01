import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAvailableTasks } from 'gql/tasks';
import { navigate } from '@reach/router';
import { availableTaskRoute } from 'routes';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Divider,
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
  const c = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { availableTasks, pageInfo, loading, error, fetchMore } = useAvailableTasks({
    accountId,
  });

  function handleTaskClick(taskId: number) {
    navigate(availableTaskRoute(accountId, taskId));
  }

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

  function fetchMoreTasks() {
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
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  return (
    <Box className={c.root}>
      {withHeader && (
        <Typography variant='h4' gutterBottom={Number(pageInfo?.totalRecords) > 0}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <span>{t('Available tasks')}</span>
            <Box color='text.hint'>{pageInfo?.totalRecords || ''}</Box>
          </Box>
        </Typography>
      )}

      {availableTasks && availableTasks.length > 0 ? (
        <Box>
          <Divider className={c.divider} />
          <Box className={c.tasks} onScroll={handleTasksScroll}>
            {availableTasks.map((task) => (
              <Box
                key={task.taskId}
                className={c.task}
                onClick={() => handleTaskClick(task.taskId)}
              >
                <img
                  alt='preview'
                  className={c.taskImg}
                  src={task.instagramCommentTask?.post?.smallPreviewUrl || ''}
                />

                <Box className={c.column}>
                  <Typography variant='body2' style={{ marginTop: 2 }}>
                    {t(task.taskType?.name || '')}
                  </Typography>

                  <Typography variant='body2' className={c.hint}>
                    {t('Approval')}: {t('auto')}
                  </Typography>
                </Box>

                <Box className={c.column} ml='auto' textAlign='right'>
                  <Typography className={c.reward}>
                    <Currency
                      value={
                        task.reward +
                        Math.round((task.reward * task.bonusRate) / 100)
                      }
                    />
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    className={c.hint}
                  >
                    {t('Payout')}: {t('immediately')}
                  </Typography>
                </Box>

                {/* {task.description && (
                  <Typography
                    color='textSecondary'
                    variant='body2'
                    style={{ marginTop: 10 }}
                  >
                    {task.description || task.taskType?.description}
                  </Typography>
                )} */}
              </Box>
            ))}
            {pageInfo?.afterCursor && (
              <Box
                style={{ height: 88 }}
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                {loading ? (
                  <Loading dense />
                ) : (
                  <Button
                    variant='text'
                    color='primary'
                    style={{ opacity: 0.75 }}
                    onClick={fetchMoreTasks}
                  >
                    load more
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box className={c.emptyHint}>
          <Typography>{t('No available tasks')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'initial',
    },
    divider: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    tasks: {
      [theme.breakpoints.up('md')]: {
        maxHeight: 560,
        overflowY: 'scroll',
      },
    },
    task: {
      display: 'flex',
      background: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      [theme.breakpoints.up('sm')]: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(1.5),
      },
    },
    taskImg: {
      borderRadius: 4,
      height: theme.spacing(7),
      width: theme.spacing(7),
      objectFit: 'cover',
      marginRight: theme.spacing(1.75),
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    reward: {
      fontSize: '1.5rem',
      fontWeight: theme.typography.fontWeightMedium,
    },
    hint: {
      color: theme.palette.text.hint,
    },
    emptyHint: {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.hint,
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2.5),
        marginLeft: theme.spacing(3),
      },
    },
  }),
);
