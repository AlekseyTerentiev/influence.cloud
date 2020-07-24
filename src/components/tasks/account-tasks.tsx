import React, { FC } from 'react';
import { useAccountTasks } from 'gql/tasks';
import { navigate } from '@reach/router';
import { accountTaskRoute } from 'routes';
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

export interface AccountTasksProps {
  accountId: number;
}

export const AccountTasks: FC<AccountTasksProps> = ({ accountId }) => {
  const c = useStyles();

  const { accountTasks, loading, error } = useAccountTasks({ accountId });

  function handleTaskClick(taskId: number) {
    navigate(accountTaskRoute(accountId, taskId));
  }

  if (loading) {
    return <Loading />;
  }

  if (!accountTasks || error) {
    return <Error name={'Ошибка загрузки заданий в работе'} error={error} />;
  }

  return (
    <Box className={c.root}>
      <Typography variant='h4' gutterBottom={accountTasks.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>Задания в работе</span>
          <Box color='text.hint'>{accountTasks.length || ''}</Box>
        </Box>
      </Typography>

      {accountTasks.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.tasks}>
            {accountTasks.map((task) => (
              <Box
                key={task.id}
                className={c.task}
                onClick={() => handleTaskClick(task.id)}
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h6'>
                    <Currency value={task.reward + Math.round(task.bonus)} />
                  </Typography>
                  <Typography variant='body2'>{task.taskType?.name}</Typography>
                </Box>

                <Box
                  mt={0.65}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body2'>Выплата: сразу</Typography>
                  <Typography variant='body2'>
                    {/* Статус:{' '} */}
                    <Box
                      display='inline'
                      color={
                        task.status === 'completed'
                          ? 'success.main'
                          : task.status === 'expired'
                          ? 'error.main'
                          : 'info.main'
                      }
                    >
                      {task.status === 'inProgress' ? 'In progress' : task.status}
                    </Box>
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
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>Нет заданий в работе</Typography>
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
      // minHeight: 130, // required for chrome scroll position bug fix on container below
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
