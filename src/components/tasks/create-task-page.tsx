import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { makeStyles, createStyles, Theme, Box, Typography } from '@material-ui/core';
import { useTaskTypes } from 'gql';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { Loading } from 'components/loading';
import { Currency } from 'components/billing/currency';
import { Modal } from 'components/modal';
import { CreateTask } from './create-task';
import { CreatedTasks } from './created-tasks';

export interface CreateTaskPageProps extends RouteComponentProps {}

export const CreateTaskPage: FC<CreateTaskPageProps> = () => {
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

  function handleCreate() {
    setSelectedTaskType(null);
  }

  if (loadingTaskTypes) {
    return <Loading />;
  }

  if (loadingTaskTypesError) {
    return <Typography color='error'>{loadingTaskTypesError.message}</Typography>;
  }

  return (
    <Box className={c.root}>
      <Box>
        <Typography variant='h3' gutterBottom>
          Добавить задание
        </Typography>

        <Box className={c.taskTypes}>
          {taskTypes?.map((taskType) => (
            <Box
              className={c.taskType}
              onClick={() => handleTaskTypeSelect(taskType)}
              key={taskType.id}
            >
              <Typography style={{ marginBottom: 3 }}>
                {t(taskType.title)}
              </Typography>
              <Typography variant='body2' color='textSecondary' gutterBottom>
                {t(taskType.description)}
              </Typography>
              <Typography variant='body2'>
                Ср. цена: <Currency value={taskType.averageCost} />
              </Typography>
            </Box>
          ))}
          <Modal open={!!selectedTaskType} onClose={handleCreateTaskFormClose}>
            {selectedTaskType && (
              <CreateTask taskType={selectedTaskType} onCreate={handleCreate} />
            )}
          </Modal>
        </Box>
      </Box>

      <CreatedTasks />
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: theme.spacing(5),
      paddingTop: theme.spacing(4.5),
      paddingBottom: theme.spacing(4.5),
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(8),
        paddingTop: theme.spacing(7.5),
        paddingBottom: theme.spacing(7.5),
      },
      [theme.breakpoints.up('md')]: {
        gridGap: theme.spacing(10),
        paddingTop: theme.spacing(8.5),
        paddingBottom: theme.spacing(8.5),
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'minmax(auto, 480px) minmax(auto, auto)',
        gridGap: '9vw',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(16),
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
      padding: theme.spacing(2.5, 2, 2),
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
