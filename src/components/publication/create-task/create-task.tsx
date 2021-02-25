import React, { FC, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { TASK_CATEGORY, TaskCategories } from './task-categories/task-categories';
import { useTaskTypes } from 'gql/task-types';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { navigate } from '@reach/router';
import { createdTaskRoute } from 'routes';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Modal } from 'components/common/modal';
import { TaskTypes } from './task-types';
import { CreateInstagramCommentTask } from './create-instagram-comment-task';
import { CreateInstagramStoryTask } from './create-instagram-story-task';
import _ from 'lodash';

import { useStyles } from './create-task.c';

export interface CreateTaskProps {
  withPopup?: boolean;
  onCreate?: () => void;
}

export const CreateTask: FC<CreateTaskProps> = ({ withPopup, onCreate }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const {
    taskTypes,
    loading: loadingTaskTypes,
    error: loadingTaskTypesError,
  } = useTaskTypes();

  const [category, setCategory] = useState<TASK_CATEGORY | null>(null);
  function handleCategoryClick(category: TASK_CATEGORY) {
    setCategory(category);
  }
  function resetCategory() {
    setCategory(null);
  }

  const currentCategoryTaskTypes = useMemo<GetTaskTypes_taskTypes[]>(() => {
    return category && taskTypes
      ? category.taskTypesIds.reduce(
          (types: any, typeId) => [...types, _.find(taskTypes, { id: typeId })],
          [],
        )
      : [];
  }, [category, taskTypes]);

  const [taskType, setTaskType] = useState<GetTaskTypes_taskTypes>();
  useEffect(() => {
    setTaskType(currentCategoryTaskTypes?.[0]);
  }, [currentCategoryTaskTypes]);

  const handleTaskTypeSelect = (taskType: GetTaskTypes_taskTypes) => {
    setTaskType(taskType);
  };

  const onCreateTask = (taskId: number) => {
    resetCategory();
    navigate(createdTaskRoute(taskId));
    if (onCreate) {
      onCreate();
    }
  };

  if (loadingTaskTypes) {
    return <Loading />;
  }

  if (loadingTaskTypesError || !taskTypes) {
    return <Error name={t('Loading Error')} error={loadingTaskTypesError} />;
  }

  const taskTypeSelector = (
    <TaskTypes
      onChange={handleTaskTypeSelect}
      types={currentCategoryTaskTypes}
      selectedType={taskType}
    />
  );

  const createTaskForm = (
    <>
      <Typography variant='h6' className={c.header}>
        {t('Create task')}
      </Typography>

      {taskType?.type === 'instagram_story' && (
        <CreateInstagramStoryTask
          taskType={taskType}
          taskTypeSelector={taskTypeSelector}
          onCreate={onCreateTask}
          onCancel={withPopup ? undefined : resetCategory}
        />
      )}

      {taskType?.type === 'instagram_discussion' && (
        <CreateInstagramCommentTask
          taskType={taskType}
          taskTypeSelector={taskTypeSelector}
          onCreate={onCreateTask}
          onCancel={withPopup ? undefined : resetCategory}
        />
      )}
    </>
  );

  return withPopup ? (
    <div>
      <TaskCategories onCategoryClick={handleCategoryClick} />
      <Modal open={!!category} onClose={resetCategory}>
        {createTaskForm}
      </Modal>
    </div>
  ) : (
    <div>
      {!category && <TaskCategories onCategoryClick={handleCategoryClick} />}
      {category && createTaskForm}
    </div>
  );
};
