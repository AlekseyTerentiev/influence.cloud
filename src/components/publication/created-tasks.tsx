import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreatedTasks } from 'gql/created-tasks';
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
import { Error } from 'components/common/error';
import { CreatedTaskStatus } from 'components/publication/created-task-status';
import { UserOutlined as UserIcon /*, PlusOutline */ } from '@ant-design/icons';
import { Currency } from 'components/billing/currency';
import { useFetchOnScroll } from 'components/common/fetch-on-scroll/useFetchOnScroll';
import { FetchMore } from 'components/common/fetch-on-scroll/fetch-more';

export interface CreatedTasksProps {}

export const CreatedTasks: FC<CreatedTasksProps> = () => {
  const { t } = useTranslation();
  const c = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { createdTasks, pageInfo, loading, error, fetchMore } = useCreatedTasks();

  const fetchMoreTasks = () => {
    if (loading || !pageInfo?.afterCursor) {
      return;
    }
    fetchMore({
      variables: { afterCursor: pageInfo?.afterCursor },
      updateQuery: ({ createdTasks }: any, { fetchMoreResult }: any) => {
        return {
          createdTasks: {
            ...createdTasks,
            tasks: [...createdTasks.tasks, ...fetchMoreResult.createdTasks.tasks],
            pageInfo: {
              ...fetchMoreResult.createdTasks.pageInfo,
              afterCursor: fetchMoreResult.createdTasks.pageInfo.afterCursor,
            },
          },
        };
      },
    });
  };

  const { handleScroll } = useFetchOnScroll({
    bodyScroll: smDown,
    onFetchMore: fetchMoreTasks,
  });

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  if (smDown && createdTasks?.length === 0) {
    return null;
  }

  return (
    <Box className={c.root}>
      <Typography className={c.header}>
        <span>{t('Published tasks')}</span>
        <span className={c.tasksCount}>{pageInfo?.totalRecords || ''}</span>
      </Typography>

      {createdTasks && createdTasks.length > 0 ? (
        <Box className={c.tasks} onScroll={handleScroll}>
          {createdTasks.map((task) => (
            <Link key={task.id} to={createdTaskRoute(task.id)} className={c.task}>
              <img
                className={c.preview}
                src={('post' in task && task.post.smallPreviewUrl) || ''}
                alt='preview'
              />
              <Box className={c.infoContainer}>
                <Typography className={c.taskType}>
                  {t(task.taskType?.name || '')}
                </Typography>
                <Box className={c.executions}>
                  <UserIcon className={c.executionsIcon} />
                  <Typography className={c.executionsCount}>
                    {
                      task.accountTasks.filter((t) => t.status === 'completed')
                        .length
                    }
                  </Typography>
                </Box>
                <CreatedTaskStatus className={c.status} status={task.status} />
                <Typography className={c.spent}>
                  <span className={c.spentLabel}>{t('Spent')}: </span>
                  <Currency
                    className={c.spentNumber}
                    value={Math.round(task.totalBudget - task.currentBudget)}
                  />
                </Typography>
              </Box>
            </Link>
          ))}
          {pageInfo?.afterCursor && (
            <FetchMore loading={loading} onFetchMore={fetchMoreTasks} />
          )}
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
        background: t.palette.grey[100],
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
        margin: 'auto 0',
      },
    },
    taskType: {
      color: t.palette.text.secondary,
      fontSize: t.typography.body2.fontSize,
      letterSpacing: 0.5,
    },
    executions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    executionsIcon: {
      color: t.palette.text.hint,
      marginRight: 4,
      fontSize: '0.9rem',
    },
    executionsCount: {
      color: t.palette.text.secondary,
      fontSize: 19,
      lineHeight: 1,
    },
    status: {
      fontSize: t.typography.body2.fontSize,
    },
    spent: {
      color: t.palette.text.secondary,
      textAlign: 'right',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 19,
    },
    spentLabel: {
      textTransform: 'lowercase',
      letterSpacing: 0.2,
      color: t.palette.text.hint,
      fontSize: t.typography.body2.fontSize,
      marginRight: 6,
    },
    spentNumber: {
      lineHeight: 1,
    },
    noTasksHint: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
    },
  }),
);
