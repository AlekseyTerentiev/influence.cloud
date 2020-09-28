import React, { FC, useState, ReactNode } from 'react';
import { useStyles } from './publication-page.s';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { Box, Typography } from '@material-ui/core';
import { useTaskTypes } from 'gql/task-types';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { navigate } from '@reach/router';
import { createdTaskRoute } from 'routes';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Modal } from 'components/common/modal';
import { TaskTypes } from '../task-types/task-types';
import { CreateInstagramCommentTask } from '../create-instagram-comment-task';
import { CreateInstagramStoryTask } from '../create-instagram-story-task/create-instagram-story-task';
import { CreatedTasks } from '../created-tasks';

export interface PublicationPageProps extends RouteComponentProps {
  children?: ReactNode;
}

export const PublicationPage: FC<PublicationPageProps> = ({ children }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const {
    taskTypes,
    loading: loadingTaskTypes,
    error: loadingTaskTypesError,
  } = useTaskTypes();

  const sortedTaskTypes = taskTypes
    ?.slice()
    .sort((a, b) => (a.type === 'instagram_story' ? -1 : 0))
    .sort((a, b) => (a.type === 'instagram_discussion' ? -1 : 0));

  const [
    selectedTaskType,
    setSelectedTaskType,
  ] = useState<GetTaskTypes_taskTypes | null>();

  // React.useEffect(() => {
  //   setSelectedTaskType(taskTypes?.find((t) => t.type === 'instagram_story'));
  // }, [taskTypes]);

  const handleTaskTypeSelect = (taskType: GetTaskTypes_taskTypes) => {
    setSelectedTaskType(taskType);
  };

  const handleCreateTaskFormClose = () => {
    setSelectedTaskType(null);
  };

  const onCreateTask = (taskId: number) => {
    handleCreateTaskFormClose();
    navigate(createdTaskRoute(taskId));
  };

  if (loadingTaskTypes) {
    return <Loading />;
  }

  if (!sortedTaskTypes || loadingTaskTypesError) {
    return <Error name={t('Loading error')} error={loadingTaskTypesError} />;
  }

  return (
    <Box className={c.root}>
      <Box>
        <Typography className={c.header}>
          {t('Create task for our Influencers')}
        </Typography>

        <TaskTypes
          onCreateTaskClick={handleTaskTypeSelect}
          types={sortedTaskTypes}
        />

        <Modal open={!!selectedTaskType} onClose={handleCreateTaskFormClose}>
          {selectedTaskType?.type === 'instagram_discussion' && (
            <CreateInstagramCommentTask
              taskType={selectedTaskType}
              onCreate={onCreateTask}
            />
          )}
          {selectedTaskType?.type === 'instagram_story' && (
            <CreateInstagramStoryTask
              taskType={selectedTaskType}
              onCreate={onCreateTask}
            />
          )}
        </Modal>
      </Box>

      <CreatedTasks />

      {children}
    </Box>
  );
};
