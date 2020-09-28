import React, { FC, ReactNode, useState } from 'react';
import { useCreatedTasks } from 'gql/created-tasks';
import { useStyles } from './publication-page.s';
import { useTranslation } from 'react-i18next';
import { Link } from '@reach/router';
import { createdTaskRoute } from 'routes';
import { RouteComponentProps } from '@reach/router';
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Hidden,
  IconButton,
} from '@material-ui/core';
import { ReactComponent as PlusIcon } from 'img/plus.svg';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Modal } from 'components/common/modal';
import { CreateTask } from 'components/publication/create-task/create-task';
import { TaskPreview } from 'components/common/task-preview';
import { ReactComponent as CommentIcon } from 'img/comment.svg';
import { ReactComponent as UserIcon } from 'img/user.svg';
import { CreatedTaskStatus } from 'components/publication/created-task-status';
import { Currency } from 'components/billing/currency';
import { useFetchOnScroll } from 'components/common/fetch-on-scroll/useFetchOnScroll';
import { FetchMore } from 'components/common/fetch-on-scroll/fetch-more';
import clsx from 'clsx';

export interface PublicationPageProps extends RouteComponentProps {
  children?: ReactNode;
}

export const PublicationPage: FC<PublicationPageProps> = ({ children }) => {
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

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  const handleAddTaskClick = () => {
    setAddTaskModalOpen(true);
  };

  if (loading && !createdTasks) {
    return <Loading />;
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  return (
    <>
      <Box className={clsx(c.root, { [c.rootDesktop]: !smDown })}>
        <Hidden smDown={smDown && createdTasks?.length !== 0}>
          <CreateTask />
        </Hidden>

        <Hidden smDown={smDown && createdTasks?.length === 0}>
          <Box className={c.createdTasks}>
            <Typography className={c.header}>
              <span>{t('Published tasks')}</span>
              {smDown ? (
                <IconButton
                  onClick={handleAddTaskClick}
                  color='primary'
                  size='small'
                  edge='end'
                >
                  <PlusIcon />
                </IconButton>
              ) : (
                <span className={c.tasksCount}>{pageInfo?.totalRecords || ''}</span>
              )}
            </Typography>

            {createdTasks && createdTasks.length > 0 ? (
              <Box className={c.tasks} onScroll={handleScroll}>
                {createdTasks.map((task) => (
                  <Link
                    key={task.id}
                    to={createdTaskRoute(task.id)}
                    className={c.task}
                  >
                    <TaskPreview task={task} />

                    <Box className={c.infoContainer}>
                      <Typography className={c.taskType}>
                        {t(task.taskType?.name || '')}
                      </Typography>
                      <Box className={c.executions}>
                        <span>
                          {
                            task.accountTasks.filter((t) => t.status === 'completed')
                              .length
                          }
                        </span>
                        {task.taskType.type === 'instagram_discussion' && (
                          <CommentIcon className={c.executionsIcon} />
                        )}
                        {task.taskType.type === 'instagram_story' && (
                          <UserIcon className={c.executionsIcon} />
                        )}
                      </Box>
                      <CreatedTaskStatus className={c.status} status={task.status} />

                      <Currency
                        className={c.spent}
                        value={Math.round(task.totalBudget - task.currentBudget)}
                      />
                    </Box>
                  </Link>
                ))}
                {pageInfo?.afterCursor && (
                  <FetchMore loading={loading} onFetchMore={fetchMoreTasks} />
                )}
              </Box>
            ) : (
              <Typography className={c.noTasksHint}>
                {t('No published tasks')}
              </Typography>
            )}
          </Box>
        </Hidden>

        <Modal open={addTaskModalOpen} onClose={() => setAddTaskModalOpen(false)}>
          <CreateTask />
        </Modal>
      </Box>

      {children}
    </>
  );
};
