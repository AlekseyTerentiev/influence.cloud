import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountTasks } from 'gql/account-tasks';
import { Link } from '@reach/router';
import { accountTaskRoute } from 'routes';
import { makeStyles, createStyles, Theme, Box, Typography } from '@material-ui/core';
// import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Currency } from 'components/billing/currency';
import { AccountTaskStatus } from 'components/execution/account-task-status';

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

  const { accountTasks, /*loading,*/ error } = useAccountTasks({ accountId });

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
        <Typography className={c.header}>
          <span>{t('Accepted tasks')}</span>
          <span className={c.tasksCount}>{accountTasks.length || ''}</span>
        </Typography>
      )}

      {accountTasks.length > 0 ? (
        <Box className={c.tasks}>
          {accountTasks.map((task) => (
            <Link
              key={task.id}
              className={c.task}
              to={accountTaskRoute(accountId, task.id)}
            >
              <img
                className={c.preview}
                src={('post' in task && task.post.smallPreviewUrl) || ''}
                alt='preview'
              />

              <Box className={c.infoContainer}>
                <Typography className={c.taskType}>
                  {t(task.taskType?.name || '')}
                </Typography>
                <Currency
                  className={c.reward}
                  value={task.reward + Math.round(task.bonus)}
                />
                <AccountTaskStatus className={c.status} status={task.status} />
                <Typography className={c.payout}>
                  {t('Payout')}: {t('immediately')}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      ) : (
        <Typography className={c.noTasksHint}>{t('No accepted tasks')}</Typography>
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
        marginTop: t.spacing(1),
      },
    },
    preview: {
      borderRadius: t.shape.borderRadius,
      height: t.spacing(7),
      width: t.spacing(7),
      objectFit: 'cover',
      marginRight: t.spacing(1.75),
    },
    infoContainer: {
      flex: 1,
      display: 'grid',
      grid: 'auto auto / auto auto',
      gridRowGap: t.spacing(1),
      '& > *': {
        lineHeight: 1,
        // margin: 'auto 0',
      },
    },
    taskType: {
      color: t.palette.text.secondary,
      marginTop: t.spacing(0.75),
      fontSize: t.typography.fontSize,
      letterSpacing: 0.5,
    },
    reward: {
      marginTop: 2,
      fontSize: '1.5rem',
      fontWeight: t.typography.fontWeightMedium,
      textAlign: 'right',
    },
    status: {
      fontSize: t.typography.body2.fontSize,
    },
    payout: {
      color: t.palette.text.hint,
      fontSize: t.typography.body2.fontSize,
      textAlign: 'right',
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
