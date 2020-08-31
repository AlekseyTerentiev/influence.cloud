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
  Hidden,
} from '@material-ui/core';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { CreatedTaskStatus } from 'components/tasks/task-status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
    <Hidden smDown={createdTasks.length === 0}>
      <Box className={c.root}>
        <Typography variant='h4' gutterBottom={createdTasks.length > 0}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <span>{t('Published tasks')}</span>
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
                  <img
                    className={c.taskImg}
                    src={task.instagramCommentTask?.post?.smallPreviewUrl || ''}
                    alt='Preview'
                  />

                  <Box className={c.column}>
                    <Typography variant='body2'>
                      {t(task.taskType?.name || '')}
                    </Typography>

                    <Typography variant='caption'>
                      <CreatedTaskStatus
                        status={task.status}
                        taskExpiredAt={task.expiredAt}
                      />
                    </Typography>
                  </Box>

                  <Box ml='auto' className={c.column} textAlign='right'>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='flex-end'
                    >
                      {/* <span role='img' style={{ marginRight: 3, fontSize: '1rem', }}>
                      👤
                    </span> */}
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{
                          marginRight: 5,
                          fontSize: '0.85rem',
                          color: '#9eb6c5',
                        }}
                      />
                      <Typography>
                        {
                          task.accountTasks.filter(
                            (task) => task.status === 'completed',
                          ).length
                        }
                      </Typography>
                    </Box>
                    <Typography>
                      <Currency
                        value={Math.round(task.totalBudget - task.currentBudget)}
                      />
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
            <Typography>{t('No published tasks')}</Typography>
          </Box>
        )}
      </Box>
    </Hidden>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    divider: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
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
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      marginTop: theme.spacing(1),
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
  }),
);
