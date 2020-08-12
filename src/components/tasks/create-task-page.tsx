import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { makeStyles, createStyles, Theme, Box, Typography } from '@material-ui/core';
import { useTaskTypes } from 'gql/task-types';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { Currency } from 'components/billing/currency';
import { Modal } from 'components/modal';
import { CreateTask } from './create-task';
import { CreatedTasks } from './created-tasks';

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

  function handleTaskTypeSelect(taskType: GetTaskTypes_taskTypes) {
    setSelectedTaskType(taskType);
  }

  function handleCreateTaskFormClose() {
    setSelectedTaskType(null);
  }

  if (loadingTaskTypes) {
    return <Loading />;
  }

  if (!taskTypes || loadingTaskTypesError) {
    return <Error name={t('Loading error')} error={loadingTaskTypesError} />;
  }

  return (
    <Box className={c.root}>
      <Box>
        <Typography variant='h4' gutterBottom>
          {t('Add task')}
        </Typography>

        <Box className={c.taskTypes}>
          {taskTypes?.map((taskType) => (
            <Box
              className={c.taskType}
              onClick={() => handleTaskTypeSelect(taskType)}
              key={taskType.id}
            >
              <Typography variant='subtitle1' style={{ marginBottom: 6 }}>
                {t(taskType.title)}
              </Typography>
              <Typography variant='body2' color='textSecondary' gutterBottom>
                {t(taskType.description)}
              </Typography>
              <Typography variant='body2'>
                {t('Average price')}: <Currency value={taskType.averageCost} />
              </Typography>
            </Box>
          ))}
          <Modal open={!!selectedTaskType} onClose={handleCreateTaskFormClose}>
            <Box pt={2}>
              {selectedTaskType && (
                <CreateTask
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
      gridGap: theme.spacing(5),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(7),
        paddingTop: theme.spacing(6.5),
        paddingBottom: theme.spacing(6.5),
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
        gridGap: theme.spacing(9),
        paddingTop: theme.spacing(7.5),
        paddingBottom: theme.spacing(7.5),
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
    taskTypes: {
      display: 'grid',
      gridGap: theme.spacing(1.5),
      maxWidth: 550,
    },
    taskType: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
    },
    taskTypeTitle: {
      marginBottom: theme.spacing(0.5),
      fontSize: theme.typography.fontSize + 2,
    },
    taskTypeDescription: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.fontSize,
    },
  }),
);
