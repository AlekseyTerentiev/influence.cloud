import React, { FC, useState } from 'react';
import { useTakeInstagramCommentTask } from 'gql/tasks';
import { useAccountTasks } from 'gql/tasks';
import { GetAvailableTasks_availableTasks_tasks } from 'gql/types/GetAvailableTasks';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { Currency } from 'components/billing/currency';
import { AccountTask } from './account-task';
import { PostDescription } from 'components/post-description';

export interface AvailableTaskProps {
  accountId: number;
  task: GetAvailableTasks_availableTasks_tasks;
  onTake?: () => void;
}

export const AvailableTask: FC<AvailableTaskProps> = ({
  accountId,
  task,
  onTake,
}) => {
  const c = useStyles();

  const [takenTaskId, setTakenTaskId] = useState<number | null>();

  const [
    takeInstagramCommentTask,
    { loading: taking, error: takingError },
  ] = useTakeInstagramCommentTask();

  const { refetch: refetchAccountTasks } = useAccountTasks({ accountId });

  async function handleTaskTake() {
    const takenTask = await takeInstagramCommentTask({
      variables: {
        accountId,
        taskId: task.taskId,
      },
    });

    setTakenTaskId(takenTask.data?.takeInstagramCommentTask?.accountTaskId);
    refetchAccountTasks(); // todo?: move this updating logic from here into gql/

    // if (onTake) {
    //   onTake();
    // }
  }

  if (takenTaskId) {
    return <AccountTask accountId={accountId} accountTaskId={takenTaskId} />;
  }

  return (
    <Box className={c.root}>
      {task.instagramCommentTask?.post && (
        <PostDescription post={task.instagramCommentTask.post} />
      )}

      <Box mt={2} display='flex' justifyContent='space-between'>
        <Box>
          <Typography variant='h6'>
            <Currency
              value={task.reward + Math.round((task.reward * task.bonusRate) / 100)}
            />
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            (<Currency value={task.reward} /> + чай{' '}
            <Currency value={Math.round((task.reward * task.bonusRate) / 100)} />)
          </Typography>
        </Box>
        <Box>
          <Typography variant='body2' gutterBottom>
            {task.taskType?.name} #{task.taskId}
          </Typography>
          <Typography variant='body2'>Выплата: сразу</Typography>
        </Box>
      </Box>

      <Box mt={1.75}>
        <Typography>Описание задания:</Typography>
        <Typography variant='body2' color='textSecondary'>
          Необходимо принять участие в дискуссии на тему публикации
        </Typography>
      </Box>

      {task.description && (
        <Box mt={1.5}>
          <Typography variant='subtitle2'>Дополнительные пожелания:</Typography>
          <Typography variant='body2' color='textSecondary'>
            {task.description}
          </Typography>
        </Box>
      )}

      {takingError && (
        <Typography color='error' style={{ marginTop: 14 }}>
          {takingError && takingError.message}
        </Typography>
      )}

      <Box mt={1.5} display='flex'>
        <Button
          target='_blank'
          href={task.instagramCommentTask?.postUrl || ''}
          color='secondary'
          style={{ backgroundColor: '#32b336' }}
          variant='contained'
          fullWidth
        >
          Открыть пост
        </Button>

        <Button
          color='primary'
          variant='contained'
          fullWidth
          style={{ marginLeft: 8 }}
          disabled={taking}
          onClick={handleTaskTake}
        >
          Принять
        </Button>
      </Box>
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);
