import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { useMe } from 'gql/user';
import { useCancelTask, useTaskAccountTasks } from 'gql/tasks';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { Modal } from 'components/common/modal';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { PostDescription } from 'components/common/post-description';
import { Currency } from 'components/billing/currency';
import { CreatedTaskStatus } from 'components/tasks/created-task-status';
import { CreatedTaskExecutions } from 'components/tasks/created-task-executions';

export interface CreatedTaskProps extends RouteComponentProps {
  taskId?: string;
  onClose: () => void;
}

export const CreatedTask: FC<CreatedTaskProps> = ({ taskId = '', onClose }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];
  const task = createdTasks?.find((task) => task.id === Number(taskId));
  const { taskAccountTasks } = useTaskAccountTasks({ taskId: Number(taskId) });
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
    cancelTask({ variables: { taskId: Number(taskId) } });
    handleCancelTaskDialogClose();
  };

  return (
    <Modal open={true} maxWidth='sm' onClose={onClose}>
      {!taskId ? (
        <Error name='Bad request' />
      ) : loading ? (
        <Loading />
      ) : error ? (
        <Error name={t('Loading error')} error={error} />
      ) : !task ? (
        <>{/* <Error name={t('Task not found')} /> */}</>
      ) : (
        <>
          {task.instagramCommentTask?.post && (
            <PostDescription post={task.instagramCommentTask.post} />
          )}

          <Box mt={2.5} display='flex' justifyContent='space-between'>
            <Box>
              <Typography style={{ fontSize: '1.3rem', marginBottom: 2 }}>
                {t('Spent')}
                {': '}
                <Currency
                  value={Math.round(task.totalBudget - task.currentBudget)}
                />
              </Typography>
              <Typography color='textSecondary' style={{ marginBottom: 4 }}>
                {t('Budget')}: <Currency value={task.totalBudget} />
              </Typography>
              <Typography className={c.tip}>
                {t('Tip')} {task.bonusRate}%
              </Typography>
            </Box>

            <Box mt={0.5}>
              <Typography
                variant='body2'
                display='block'
                // color='textSecondary'
                align='right'
                style={{ marginBottom: 3 }}
              >
                {t(task.taskType?.name || '')} #{task.id}
              </Typography>
              <Typography variant='body2' align='right'>
                <CreatedTaskStatus
                  status={task.status}
                  taskExpiredAt={task.expiredAt}
                />
              </Typography>
              {task.status === 'inProgress' && (
                <>
                  <Button
                    color='secondary'
                    variant='text'
                    // fullWidth
                    onClick={handleCancelTaskClick}
                    style={{ padding: '3px 0', float: 'right' }}
                    size='small'
                  >
                    {t('Cancel task')}
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
            <Typography variant='subtitle2'>{t('Task description')}:</Typography>
            <Typography color='textSecondary' variant='body2'>
              {/* {t(task.taskType?.description || '')} */}
              {t(
                'Increase activity on your post with relevant questions from members of our community',
              )}
            </Typography>
          </Box>

          {task.description && (
            <Box mt={1.5}>
              <Typography variant='subtitle2'>{t('Additional wishes')}:</Typography>
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
        </>
      )}
    </Modal>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    tip: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.hint,
    },
    executions: {
      marginTop: theme.spacing(2.5),
    },
  }),
);
