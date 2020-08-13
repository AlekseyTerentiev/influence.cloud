import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAvailableTasks } from 'gql/tasks';
import { navigate } from '@reach/router';
import { availableTaskRoute } from 'routes';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
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

  const { availableTasks, pageInfo, loading, error, fetchMore } = useAvailableTasks({
    accountId,
  });

  function handleTaskClick(taskId: number) {
    navigate(availableTaskRoute(accountId, taskId));
  }

  function handleScroll(e: any) {
    if (!pageInfo?.afterCursor) {
      // if no more content
      return;
    }
    const target = e.target;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
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
  }

  if (loading) {
    return <Loading />;
  }

  if (!availableTasks || error) {
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

      {availableTasks.length > 0 ? (
        <Box>
          <Divider className={c.divider} />
          <Box className={c.tasks} onScroll={handleScroll}>
            {availableTasks.map((task) => (
              <Box
                key={task.taskId}
                className={c.task}
                onClick={() => handleTaskClick(task.taskId)}
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography className={c.reward}>
                    <Currency
                      value={
                        task.reward +
                        Math.round((task.reward * task.bonusRate) / 100)
                      }
                    />
                  </Typography>
                  <Typography variant='body2'>
                    {t(task.taskType?.name || '')}
                  </Typography>
                </Box>

                <Box
                  mt={0.5}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body2' color='textSecondary'>
                    {t('Payout')}: {t('immediately')}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {t('Approval')}: {t('auto')}
                  </Typography>
                </Box>

                {task.description && (
                  <Typography
                    color='textSecondary'
                    variant='body2'
                    style={{ marginTop: 10 }}
                  >
                    {task.description}
                  </Typography>
                )}
              </Box>
            ))}
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
      maxHeight: 560,
      overflowY: 'scroll',
    },
    task: {
      background: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2.25, 2, 2),
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
    reward: {
      fontSize: '1.5rem',
      fontWeight: theme.typography.fontWeightMedium,
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
