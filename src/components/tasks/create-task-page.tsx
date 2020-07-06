import React, { FC, useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import { useTaskTypes, useMe } from 'gql';
import { TaskTypeData } from 'gql/types/TaskTypeData';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { Loading } from 'components/loading';
import { Modal } from 'components/modal';
import { CreateTask } from './create-task';

export interface CreateTaskPageProps extends RouteComponentProps {}

export const CreateTaskPage: FC<CreateTaskPageProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const {
    taskTypes,
    loading: loadingTaskTypes,
    error: loadingTaskTypesError,
  } = useTaskTypes();

  const { me, loading: loadingMe } = useMe();
  const createdTasks = me?.createdTasks || [];

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

  if (loadingTaskTypes || loadingMe) {
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
          {taskTypes?.map((type) => (
            <Box
              className={c.taskType}
              onClick={() => handleTaskTypeSelect(type)}
              key={type.id}
            >
              <Typography className={c.taskTypeTitle}>{type.title}</Typography>
              <Typography className={c.taskTypeDescription}>
                {type.description}
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

      <Box>
        <Typography variant='h3' gutterBottom={createdTasks.length > 0}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <span>Размещенные задания</span>
            <span className={c.tasksCount}>{createdTasks.length || ''}</span>
          </Box>
        </Typography>
        {createdTasks.length > 0 ? (
          <Box mt={1}>
            <Divider className={c.divider} />
            <Box className={c.tasks}>
              {createdTasks.map((task) => (
                <Box key={task.id} className={c.task}>
                  {/* <CreatedTask {...task} /> */}
                  <Typography>{task.taskType?.title}</Typography>
                  <Typography
                    variant='caption'
                    color='textSecondary'
                    display='block'
                    gutterBottom
                  >
                    {task.instagramCommentTask?.postUrl}
                  </Typography>
                  <Typography display='inline'>
                    $ {task.currentBudget} / {task.totalBudget}
                  </Typography>
                  <Typography
                    display='inline'
                    variant='caption'
                    style={{ marginLeft: 16 }}
                  >
                    Чай {task.bonusRate}%
                  </Typography>
                  <Typography
                    display='inline'
                    variant='caption'
                    style={{ marginLeft: 16 }}
                  >
                    До {new Date(task.expireAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
            <Typography>Нет опубликованных заданий</Typography>
          </Box>
        )}
      </Box>
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

    tasksCount: {
      color: theme.palette.grey[500],
    },
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(4),
        display: 'block',
      },
    },
    tasks: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 560,
        overflowY: 'scroll',
      },
    },
    task: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2.5, 2, 2),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      marginTop: theme.spacing(1),
    },
  }),
);
