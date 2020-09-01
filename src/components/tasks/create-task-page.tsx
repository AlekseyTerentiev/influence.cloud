import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  // Hidden,
} from '@material-ui/core';
import { useTaskTypes } from 'gql/task-types';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Modal } from 'components/common/modal';
import { CreateTaskForm } from './create-task-form';
import { CreatedTasks } from './created-tasks';
import { TaskTypes } from './task-types';

export interface CreateTaskPageProps extends RouteComponentProps {
  children?: React.ReactNode;
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

  const handleTaskTypeSelect = (taskType: GetTaskTypes_taskTypes) => {
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
        {/* <Hidden xsDown> */}
        <Typography variant='h4' gutterBottom>
          {t('Create task for our Influencers')}
        </Typography>
        {/* </Hidden> */}

        <Box>
          <TaskTypes onCreateTaskClick={handleTaskTypeSelect} types={taskTypes} />

          <Modal open={!!selectedTaskType} onClose={handleCreateTaskFormClose}>
            <Box pt={2}>
              {selectedTaskType && (
                <CreateTaskForm
                  taskType={selectedTaskType}
                  onCreate={handleCreateTaskFormClose}
                />
              )}
            </Box>
          </Modal>
        </Box>
      </Box>

      <CreatedTasks />

      {children}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: theme.spacing(4),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(5),
        paddingTop: theme.spacing(4.5),
        paddingBottom: theme.spacing(4.5),
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
        gridGap: theme.spacing(8),
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      [theme.breakpoints.up('lg')]: {
        gridGap: '9vw',
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(9),
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(14),
      },
    },
  }),
);
