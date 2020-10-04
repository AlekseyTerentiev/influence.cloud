import React, { FC, useState } from 'react';
import { useStyles } from './created-task.s';
import { useTranslation } from 'react-i18next';
import { useCreatedTasks } from 'gql/created-tasks';
import { useCancelTask } from 'gql/created-tasks';
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
      <Typography className={c.label}>Task info</Typography>
      <Box display='flex' alignItems='center'>
        <Typography className={c.type}>
          {t(task.taskType?.name)} #{task.id}
        </Typography>
        <Typography className={c.status}>
          <CreatedTaskStatus status={task.status} taskExpiredAt={task.expiredAt} />
        </Typography>
        {task.status === 'inProgress' && (
          <>
            <Button
              variant='text'
              onClick={handleCancelTaskClick}
              size='small'
              className={c.cancelButton}
            >
              {t('Cancel')}
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

      {cancelError && <Error error={cancelError} textAlign='left' />}

      <Box mt={1.5}>
        <Typography className={c.label}>Budget Info</Typography>
        <Typography className={c.spent}>
          {t('Spent')}:{' '}
          <Currency value={Math.round(task.totalBudget - task.currentBudget)} />
        </Typography>

        <Typography className={c.budget}>
          {t('Budget')}: <Currency value={task.totalBudget} />
        </Typography>

        <Typography className={c.tip}>
          {t('Tip')}: {task.bonusRate}%
        </Typography>
      </Box>

      <Box mt={1.5}>
        <Typography className={c.label}>Description</Typography>
        <Typography className={task.description ? '' : c.hint}>
          {task.description || 'No description'}
        </Typography>
      </Box>

      {'post' in task && (
        <Box mt={1.5} mb={2.5}>
          <Typography className={c.label} style={{ marginBottom: 6 }}>
            Target Post
          </Typography>
          <PostDescription post={task.post} />
        </Box>
      )}

      <Box mt={1.5}>
        <CreatedTaskExecutions taskId={taskId} />
      </Box>
    </Box>
  );
};
