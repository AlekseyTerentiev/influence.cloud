import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useTaskTypes } from 'gql/task-types';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { navigate } from '@reach/router';
import { createdTaskRoute } from 'routes';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { TaskTypes } from './task-types';
import { CreateInstagramCommentTask } from './create-instagram-comment-task';
import { CreateInstagramStoryTask } from './create-instagram-story-task';

import { useStyles } from './create-task.c';

export interface CreateTaskProps {
  onCreate?: () => void;
}

export const CreateTask: FC<CreateTaskProps> = ({ onCreate }) => {
  const c = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [formVisible, setFormVisible] = useState(true);

  const {
    taskTypes,
    loading: loadingTaskTypes,
    error: loadingTaskTypesError,
  } = useTaskTypes();

  const sortedTaskTypes = taskTypes
    ?.slice()
    .sort((a, b) => (a.type === 'instagram_discussion' ? -1 : 0))
    .sort((a, b) => (a.type === 'instagram_story' ? -1 : 0));

  const [taskType, setTaskType] = useState<GetTaskTypes_taskTypes>();
  useEffect(() => {
    setTaskType(sortedTaskTypes?.[0]);
  }, [taskTypes]);

  const handleTaskTypeSelect = (taskType: GetTaskTypes_taskTypes) => {
    setTaskType(taskType);
  };

  const onCreateTask = (taskId: number) => {
    if (mdUp) {
      setFormVisible(false);
    }
    navigate(createdTaskRoute(taskId));
    if (onCreate) {
      onCreate();
    }
  };

  if (loadingTaskTypes) {
    return <Loading />;
  }

  if (loadingTaskTypesError || !sortedTaskTypes) {
    return <Error name={t('Loading Error')} error={loadingTaskTypesError} />;
  }

  return (
    <Box className={c.root}>
      <Typography variant='h6' className={c.header}>
        {t('Create task')}
      </Typography>

      <TaskTypes
        onChange={handleTaskTypeSelect}
        types={sortedTaskTypes}
        selectedType={taskType}
      />

      {formVisible ? (
        taskType?.type === 'instagram_discussion' ? (
          <CreateInstagramCommentTask taskType={taskType} onCreate={onCreateTask} />
        ) : (
          taskType?.type === 'instagram_story' && (
            <CreateInstagramStoryTask taskType={taskType} onCreate={onCreateTask} />
          )
        )
      ) : (
        <Button
          size='large'
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => setFormVisible(true)}
        >
          {t('Add New Task')}
        </Button>
      )}
    </Box>
  );
};
