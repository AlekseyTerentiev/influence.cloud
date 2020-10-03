import React, { FC, useState } from 'react';
import { useStyles } from './created-task.s';
import { useTranslation } from 'react-i18next';
import { useCreatedTasks } from 'gql/created-tasks';
import { useCancelTask, useTaskAccountTasks } from 'gql/created-tasks';
import { Box, Typography, Button } from '@material-ui/core';
import { Modal } from 'components/common/modal';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { PostDescription } from 'components/common/post-description';
import { Currency } from 'components/billing/currency';
import { CreatedTaskStatus } from 'components/publication/created-task-status';
import { CreatedTaskExecutions } from './created-task-executions';

export interface CreatedTaskProps {
  taskId: number;
}

export const CreatedTask: FC<CreatedTaskProps> = ({ taskId }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { createdTasks, loading, error } = useCreatedTasks();

  const task = createdTasks?.find((task) => task.id === taskId);

  const { taskAccountTasks } = useTaskAccountTasks({ taskId });

  const [
    cancelTask,
    { loading: cancelProcessing, error: cancelError },
  ] = useCancelTask();

  const [cancelTaskDialogOpen, setCancelTaskDialogOpen] = useState(false);
  const handleCancelTaskClick = () => {
    setCancelTaskDialogOpen(true);
  };
  const handleCancelTaskDialogClose = () => {
    setCancelTaskDialogOpen(false);
  };
  const handleCancelTaskSubmit = () => {
    cancelTask({ variables: { taskId } });
    handleCancelTaskDialogClose();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  if (!task) {
    return null;
  }

  return (
    <Box className={c.root}>
      {'post' in task && <PostDescription post={task.post} />}

      <Box mt={2.5} display='flex' justifyContent='space-between'>
        <Box>
          <Typography className={c.spent}>
            {t('Spent') + ': '}
            <Currency value={Math.round(task.totalBudget - task.currentBudget)} />
          </Typography>
          <Typography className={c.budget}>
            {t('Budget')}: <Currency value={task.totalBudget} />
          </Typography>
          <Typography className={c.tip}>
            {t('Tip')} {task.bonusRate}%
          </Typography>
        </Box>

        <Box mt={0.5} textAlign='right'>
          <Typography className={c.taskType}>
            {t(task.taskType?.name || '')} #{task.id}
          </Typography>

          <CreatedTaskStatus
            className={c.status}
            status={task.status}
            taskExpiredAt={task.expiredAt}
          />

          {task.status === 'inProgress' && (
            <>
              <Button
                color='secondary'
                variant='text'
                // fullWidth
                onClick={handleCancelTaskClick}
                size='small'
                className={c.cancelTaskButton}
              >
                {t('cancel task')}
              </Button>
              <Modal
                open={cancelTaskDialogOpen}
                onClose={handleCancelTaskDialogClose}
                fullWidthOnMobile={false}
              >
                <Typography variant='h5' gutterBottom>
                  {t('Remove the task from publication')}?
                </Typography>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={handleCancelTaskSubmit}
                  disabled={cancelProcessing}
                  style={{ margin: 'auto' }}
                >
                  {t('Remove from publication')}
                </Button>
              </Modal>
            </>
          )}
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant='body2' style={{ marginBottom: 1 }}>
          {t('Task description')}:
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {/* {t(task.taskType?.description || '')} */}
          {t(
            'Increase activity on your post with relevant questions from members of our community',
          )}
        </Typography>
      </Box>

      {task.description && (
        <Box mt={1.5}>
          <Typography variant='body2' style={{ marginBottom: 1 }}>
            {t('Additional wishes')}:
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {task.description}
          </Typography>
        </Box>
      )}

      {cancelError && <Error error={cancelError} />}

      {taskAccountTasks && taskAccountTasks.length > 0 && (
        <CreatedTaskExecutions
          className={c.executions}
          executions={taskAccountTasks}
        />
      )}
    </Box>
  );
};
