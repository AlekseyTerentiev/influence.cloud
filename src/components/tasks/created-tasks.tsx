import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { Link } from '@reach/router';
import { createdTaskRoute } from 'routes';
import {
  useTheme,
  useMediaQuery,
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
} from '@material-ui/core';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { CreatedTaskStatus } from 'components/tasks/created-task-status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Currency } from 'components/billing/currency';

export interface CreatedTasksProps {}

export const CreatedTasks: FC<CreatedTasksProps> = () => {
  const { t } = useTranslation();
  const c = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  if (smDown && createdTasks.length === 0) {
    return null;
  }

  return (
    <Box className={c.root}>
      <Typography className={c.header}>
        <span>{t('Published tasks')}</span>
        <span className={c.tasksCount}>{createdTasks.length || ''}</span>
      </Typography>

      {createdTasks.length > 0 ? (
        <Box className={c.tasks}>
          {createdTasks.map((task) => (
            <Link key={task.id} to={createdTaskRoute(task.id)} className={c.task}>
              <img
                className={c.preview}
                src={task.instagramCommentTask?.post?.smallPreviewUrl || ''}
                alt='preview'
              />
              <Box className={c.infoContainer}>
                <Typography className={c.taskType}>
                  {t(task.taskType?.name || '')}
                </Typography>
                <Box className={c.executions}>
                  <FontAwesomeIcon icon={faUser} className={c.executionsIcon} />
                  <Typography className={c.executionsCount}>
                    {
                      task.accountTasks.filter((t) => t.status === 'completed')
                        .length
                    }
                  </Typography>
                </Box>
                <CreatedTaskStatus className={c.status} status={task.status} />
                <Currency
                  className={c.spent}
                  value={Math.round(task.totalBudget - task.currentBudget)}
                />
              </Box>
            </Link>
          ))}
        </Box>
      ) : (
        <Typography className={c.noTasksHint}>{t('No published tasks')}</Typography>
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
      border: `1px solid ${t.palette.divider}`,
      borderRadius: t.shape.borderRadius,
      cursor: 'pointer',
      padding: t.spacing(2),
      marginTop: t.spacing(1),
      '&:hover': {
        background: t.palette.grey['100'],
      },
    },
    preview: {
      borderRadius: 4,
      height: t.spacing(7),
      width: t.spacing(7),
      objectFit: 'cover',
      marginRight: t.spacing(1.75),
    },
    infoContainer: {
      flex: 1,
      display: 'grid',
      grid: 'auto auto / auto auto',
      gridRowGap: t.spacing(1.5),
      '& > *': {
        lineHeight: 1,
        margin: 'auto 0',
      },
    },
    taskType: {
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
      letterSpacing: 0.5,
    },
    executions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'relative',
      top: 2,
    },
    executionsIcon: {
      color: '#9eb6c5',
      marginRight: 6,
      height: '0.95em',
    },
    executionsCount: {
      color: t.palette.text.secondary,
      fontWeight: t.typography.fontWeightMedium,
      fontSize: 20,
      lineHeight: 1,
    },
    status: {
      fontSize: t.typography.body2.fontSize,
    },
    spent: {
      color: t.palette.text.hint,
      fontWeight: t.typography.fontWeightMedium,
      fontSize: 20,
      textAlign: 'right',
      position: 'relative',
      top: 2,
    },
    noTasksHint: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
    },
  }),
);
