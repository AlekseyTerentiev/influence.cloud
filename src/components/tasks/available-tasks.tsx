import React, { FC } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { useAvailableTasks } from 'gql';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { Currency } from 'components/billing/currency';

export interface AvailableTasksProps {
  accountId: number;
}

export const AvailableTasks: FC<AvailableTasksProps> = ({ accountId }) => {
  const c = useStyles();

  const { availableTasks, loading, error } = useAvailableTasks({ accountId });

  if (loading) {
    return <Loading />;
  }

  if (!availableTasks || error) {
    return (
      <Error header={'Ошибка загрузки доступных заданий'} error={error?.message} />
    );
  }

  return (
    <Box className={c.root}>
      <Typography variant='h3' gutterBottom={availableTasks.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>Доступные задания</span>
          <span className={c.tasksCount}>{availableTasks.length || ''}</span>
        </Box>
      </Typography>

      {availableTasks.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.tasks}>
            {availableTasks.map((task) => (
              <Box key={task.id} className={c.task}>
                <Typography>{task.taskType?.title}</Typography>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  gutterBottom
                  noWrap
                >
                  {task.instagramCommentTask?.postUrl}
                </Typography>
                {task.description && (
                  <Typography color='textSecondary' style={{ marginTop: 6 }}>
                    {task.description}
                  </Typography>
                )}
                <Box
                  mt={1}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h6'>
                    <Currency value={task.instagramCommentTask?.cost || 0} />
                  </Typography>
                  <Typography variant='body2'>Чай: {task.bonusRate}%</Typography>
                  {/* <Typography variant='body2'>Одобрение: авто</Typography> */}
                  <Typography variant='body2'>Выплата: сразу</Typography>
                  {/* <Button
                    style={{ float: 'right' }}
                    color='primary'
                    variant='contained'
                    size='small'
                    // onClick={}
                  >
                    Взять
                  </Button> */}
                </Box>
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
    tasksCount: {
      color: theme.palette.grey[500],
    },
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(4),
        display: 'block',
      },
    },
    tasks: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 560,
        overflowY: 'scroll',
      },
    },
    task: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2.5, 2, 1.6),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      marginTop: theme.spacing(1),
    },
  }),
);
