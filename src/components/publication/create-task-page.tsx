import React, { FC, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { makeStyles, createStyles, Theme, Box, Typography } from '@material-ui/core';
import { useTaskTypes } from 'gql/task-types';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Modal } from 'components/common/modal';
import { TaskTypes } from './task-types';
import { CreateInstagramCommentTask } from './create-instagram-comment-task';
import { CreateInstagramStoryTask } from './create-instagram-story-task';
import { CreatedTasks } from './created-tasks';
import { FilesUpload } from 'components/common/files-upload';

export interface CreateTaskPageProps extends RouteComponentProps {
  children?: ReactNode;
}

export const CreateTaskPage: FC<CreateTaskPageProps> = ({ children }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const {
    taskTypes,
    loading: loadingTaskTypes,
    error: loadingTaskTypesError,
  } = useTaskTypes();

  const [
    selectedTaskType,
    setSelectedTaskType,
  ] = useState<GetTaskTypes_taskTypes | null>();

  const handleCreateTaskClick = (taskType: GetTaskTypes_taskTypes) => {
    setSelectedTaskType(taskType);
  };

  const handleCreateTaskFormClose = () => {
    setSelectedTaskType(null);
  };

  if (loadingTaskTypes) {
    return <Loading />;
  }

  if (!taskTypes || loadingTaskTypesError) {
    return <Error name={t('Loading error')} error={loadingTaskTypesError} />;
  }

  return (
    <Box className={c.root}>
      <Box>
        <FilesUpload onUpload={(urls) => alert('uploaded files:' + urls.join())} />

        <Typography className={c.header}>
          {t('Create task for our Influencers')}
        </Typography>

        <TaskTypes onCreateTaskClick={handleCreateTaskClick} types={taskTypes} />

        <Modal open={!!selectedTaskType} onClose={handleCreateTaskFormClose}>
          {selectedTaskType?.type === 'instagram_discussion' && (
            <CreateInstagramCommentTask
              taskType={selectedTaskType}
              onCreate={handleCreateTaskFormClose}
            />
          )}
          {selectedTaskType?.type === 'instagram_story' && (
            <CreateInstagramStoryTask
              taskType={selectedTaskType}
              onCreate={handleCreateTaskFormClose}
            />
          )}
        </Modal>
      </Box>

      <CreatedTasks />

      {children}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: t.spacing(4),
      paddingTop: t.spacing(3),
      paddingBottom: t.spacing(3),
      [t.breakpoints.up('sm')]: {
        gridGap: t.spacing(5),
        paddingTop: t.spacing(4.5),
        paddingBottom: t.spacing(4.5),
      },
      [t.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
        gridGap: t.spacing(8),
        paddingTop: t.spacing(8),
        paddingBottom: t.spacing(8),
      },
      [t.breakpoints.up('lg')]: {
        gridGap: '9vw',
        paddingTop: t.spacing(9),
        paddingBottom: t.spacing(9),
      },
      [t.breakpoints.up('xl')]: {
        gridGap: t.spacing(14),
      },
    },
    header: {
      fontSize: t.typography.h6.fontSize,
      fontWeight: t.typography.h6.fontWeight,
      marginBottom: t.spacing(1.25),
    },
  }),
);
