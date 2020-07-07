import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import { useMe } from 'gql';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { Currency } from 'components/billing/currency';

export interface CreatedTasksProps {}

export const CreatedTasks: FC<CreatedTasksProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error header={'Ошибка загрузки размещенных заданий'} error={error?.message} />
    );
  }

  return (
    <Box className={c.root}>
      <Typography variant='h3' gutterBottom={createdTasks.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>Размещенные задания</span>
          <span className={c.tasksCount}>{createdTasks.length || ''}</span>
        </Box>
      </Typography>

      {createdTasks.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.tasks}>
            {createdTasks.map((task) => (
              <Box key={task.id} className={c.task}>
                <Typography>{t(task.taskType?.title || '')}</Typography>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  display='block'
                  gutterBottom
                  noWrap
                >
                  {task.instagramCommentTask?.postUrl}
                </Typography>
                <Typography display='inline'>
                  <Currency value={task.currentBudget} /> /{' '}
                  <Currency value={task.totalBudget} sign={false} />
                </Typography>
                <Typography
                  display='inline'
                  variant='caption'
                  style={{ marginLeft: 16 }}
                >
                  Чай {task.bonusRate}%
                </Typography>
                <Typography
                  display='inline'
                  variant='caption'
                  style={{ marginLeft: 16 }}
                >
                  До {new Date(task.expireAt).toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>Нет опубликованных заданий</Typography>
        </Box>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
      padding: theme.spacing(2.5, 2, 2),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      marginTop: theme.spacing(1),
    },
  }),
);
