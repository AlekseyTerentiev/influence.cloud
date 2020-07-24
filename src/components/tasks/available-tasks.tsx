import React, { FC } from 'react';
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
}

export const AvailableTasks: FC<AvailableTasksProps> = ({ accountId }) => {
  const c = useStyles();

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
    return <Error name={'Ошибка загрузки доступных заданий'} error={error} />;
  }

  return (
    <Box className={c.root}>
      <Typography variant='h4' gutterBottom={Number(pageInfo?.totalRecords) > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>Доступные задания</span>
          <Box color='text.hint'>{pageInfo?.totalRecords || ''}</Box>
        </Box>
      </Typography>

      {availableTasks.length > 0 ? (
        <Box mt={1}>
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
                  <Typography variant='h6'>
                    <Currency
                      value={
                        task.reward +
                        Math.round((task.reward * task.bonusRate) / 100)
                      }
                    />
                  </Typography>
                  <Typography variant='subtitle2'>{task.taskType?.name}</Typography>
                </Box>

                <Box
                  mt={0.65}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body2'>Выплата: сразу</Typography>
                  <Typography variant='body2'>Одобрение: авто</Typography>
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
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>Нет доступных заданий</Typography>
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
      [theme.breakpoints.up('lg')]: {
        display: 'block',
        marginBottom: theme.spacing(1.5),
      },
    },
    tasks: {
      maxHeight: 560,
      overflowY: 'scroll',
    },
    task: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2.5, 2, 2),
      cursor: 'pointer',
      '&:not(:first-child)': {
        marginTop: theme.spacing(1.5),
      },
      '&:hover': {
        background: theme.palette.grey['100'],
      },
    },
  }),
);
