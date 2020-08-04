import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { navigate } from '@reach/router';
import { createdTaskRoute } from 'routes';
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

export interface CreatedTasksProps {}

export const CreatedTasks: FC<CreatedTasksProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];

  function handleTaskClick(taskId: number) {
    navigate(createdTaskRoute(taskId));
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  return (
    <Box className={c.root}>
      <Typography variant='h4' gutterBottom={createdTasks.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>{t('Posted tasks')}</span>
          <Box color='text.hint'>{createdTasks.length || ''}</Box>
        </Box>
      </Typography>

      {createdTasks.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.tasks}>
            {createdTasks.map((task) => (
              <Box
                key={task.id}
                className={c.task}
                onClick={() => handleTaskClick(task.id)}
              >
                <Typography variant='subtitle1' style={{ marginBottom: 4 }}>
                  {t(task.taskType?.title || '')}
                </Typography>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  display='block'
                  gutterBottom
                  noWrap
                >
                  {task.instagramCommentTask?.postUrl}
                </Typography>

                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography>
                    <Currency value={Math.round(task.currentBudget)} /> /{' '}
                    <Currency value={task.totalBudget} sign={false} />
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {t('Tip')} {task.bonusRate}%
                  </Typography>
                  <Typography variant='body2'>
                    <Box
                      display='inline'
                      color={
                        task.status === 'completed'
                          ? 'success.main'
                          : task.status === 'expired' || task.status === 'canceled'
                          ? 'error.main'
                          : 'info.main'
                      }
                    >
                      {task.status === 'inProgress'
                        ? `${t('Until')} ${new Date(
                            task.expiredAt,
                          ).toLocaleDateString()}`
                        : t(task.status)}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>{t('No posted tasks')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(3),
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
