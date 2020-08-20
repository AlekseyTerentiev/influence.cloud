import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
// import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { Currency } from 'components/billing/currency';

export interface AccountTasksProps {
  accountId: number;
  withHeader?: boolean;
}

export const AccountTasks: FC<AccountTasksProps> = ({
  accountId,
  withHeader = false,
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { accountTasks, loading, error } = useAccountTasks({ accountId });

  function handleTaskClick(taskId: number) {
    navigate(accountTaskRoute(accountId, taskId));
  }

  // if (loading) {
  //   return <Loading />;
  // }

  if (!accountTasks) {
    return null;
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  return (
    <Box className={c.root}>
      {withHeader && (
        <Typography variant='h4' gutterBottom={accountTasks.length > 0}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <span>{t('Accepted tasks')}</span>
            <Box color='text.hint'>{accountTasks.length || ''}</Box>
          </Box>
        </Typography>
      )}

      {accountTasks.length > 0 ? (
        <Box>
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
                  <Typography className={c.reward}>
                    <Currency value={task.reward + Math.round(task.bonus)} />
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
                  <Typography variant='body2'>
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
                      {t(task.status)}
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
        <Box className={c.emptyHint}>
          <Typography>{t('No accepted tasks')}</Typography>
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
        '-webkit-overflow-scrolling': 'touch',
      },
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
