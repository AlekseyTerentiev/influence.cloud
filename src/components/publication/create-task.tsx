import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import { useTaskTypes } from 'gql/task-types';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { navigate } from '@reach/router';
import { createdTaskRoute } from 'routes';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Modal } from 'components/common/modal';
import { TaskTypes } from 'components/publication/task-types';
import { CreateInstagramCommentTask } from 'components/publication/create-instagram-comment-task';
import { CreateInstagramStoryTask } from 'components/publication/create-instagram-story-task';

import { useStyles } from './create-task.c';

export interface CreateTaskProps {
  onCreate?: () => void;
}

export const CreateTask: FC<CreateTaskProps> = ({ onCreate }) => {
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
    if (onCreate) {
      onCreate();
    }
  };

  if (loadingTaskTypes) {
    return <Loading />;
  }

  if (!sortedTaskTypes || loadingTaskTypesError) {
    return <Error name={t('Loading error')} error={loadingTaskTypesError} />;
  }

  return (
    <Box className={c.root}>
      <Typography className={c.header}>
        {t('Create task for our Influencers')}
      </Typography>

      <TaskTypes onCreateTaskClick={handleTaskTypeSelect} types={sortedTaskTypes} />

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
  );
};
