import React, { FC, useState } from 'react';
import { useCreatedTasks } from 'gql/created-tasks';
import { useTranslation } from 'react-i18next';
import { Link } from '@reach/router';
import { RouteComponentProps, useMatch, navigate } from '@reach/router';
import { createdTaskRoute, CREATED_TASK_ROUTE, PUBLICATION_ROUTE } from 'routes';
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
import { CreateTask } from './create-task/create-task';
import { TaskPreview } from 'components/common/task-preview';
import { TaskType } from 'components/common/task-type';
import { ReactComponent as CommentIcon } from 'img/comment.svg';
import { ReactComponent as UserIcon } from 'img/user.svg';
import { CreatedTaskStatus } from 'components/publication/created-task-status';
import { Currency } from 'components/billing/currency';
import { useFetchOnScroll } from 'components/common/fetch-on-scroll/useFetchOnScroll';
import { FetchMore } from 'components/common/fetch-on-scroll/fetch-more';
import clsx from 'clsx';
import { CreatedTask } from 'components/publication/created-task';

import { useStyles } from './publication-page.s';

export interface PublicationPageProps extends RouteComponentProps {}

export const PublicationPage: FC<PublicationPageProps> = () => {
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
    onFetchMore: fetchMoreTasks,
  });

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  const handleAddTaskClick = () => {
    setAddTaskModalOpen(true);
  };

  const handleAddTaskModalClose = () => {
    setAddTaskModalOpen(false);
  };

  const detailedTaskRouteMatch = useMatch(PUBLICATION_ROUTE + CREATED_TASK_ROUTE);

  if (loading && !createdTasks) {
    return <Loading />;
  }

  if (error) {
    return <Error name={t('Loading Error')} error={error} />;
  }

  return (
    <Box className={clsx(c.root, { [c.rootDesktop]: !smDown })}>
      <Hidden smDown={smDown && createdTasks?.length !== 0}>
        <CreateTask withPopup />
      </Hidden>

      <Hidden smDown={smDown && createdTasks?.length === 0}>
        <div className={c.createdTasks}>
          <div className={c.header}>
            <Typography variant='h6'>{t('Published Tasks')}</Typography>
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
              <Typography variant='h6' className={c.tasksCount}>
                {pageInfo?.totalRecords || 0}
              </Typography>
            )}
          </div>

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
                    <Box className={c.row}>
                      <Typography className={c.title}>
                        {task.__typename === 'InstagramCommentTask' &&
                          task.post.ownerUsername}
                        {task.__typename === 'InstagramStoryTask' &&
                          (task.accountUsername || task.websiteUrl)}
                      </Typography>

                      <Box className={c.info}>
                        {task.waitingAccountTasks > 0 && (
                          <div className={c.requests}>
                            {task.waitingAccountTasks}
                          </div>
                        )}
                        <Box className={c.executions}>
                          <span>{task.activeAccountTasks}</span>
                          {task.taskType.type === 'instagram_discussion' && (
                            <CommentIcon
                              className={c.executionsIcon}
                              style={{ width: 14, height: 14 }}
                            />
                          )}
                          {task.taskType.type === 'instagram_story' && (
                            <UserIcon
                              className={c.executionsIcon}
                              style={{ width: 13, height: 13 }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <Box className={c.row}>
                      <Box className={c.typeAndStatus}>
                        <TaskType task={task} onlyIcon />
                        <CreatedTaskStatus
                          className={c.status}
                          status={task.status}
                        />
                      </Box>
                      <Currency
                        className={c.spent}
                        value={Math.round(task.totalBudget - task.currentBudget)}
                      />
                    </Box>
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
        </div>
      </Hidden>

      <Modal open={addTaskModalOpen} onClose={handleAddTaskModalClose}>
        <CreateTask onCreate={handleAddTaskModalClose} />
      </Modal>

      <Modal
        open={!!detailedTaskRouteMatch}
        onClose={() => navigate('../')}
        mobileSlideLeft
        keepMounted
      >
        {detailedTaskRouteMatch?.taskId && (
          <CreatedTask taskId={Number(detailedTaskRouteMatch.taskId)} />
        )}
      </Modal>
    </Box>
  );
};
