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

  const postDesc = task.instagramCommentTask?.post?.description;
  const postDescShort = postDesc?.slice(0, 55);
  const [postDescExpanded, setPostDescExpanded] = useState(false);
  function handlePostDescExpandedChange() {
    setPostDescExpanded(!postDescExpanded);
  }

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
    return <AccountTask accountId={accountId} taskId={takenTaskId} />;
  }

  return (
    <Box className={c.root}>
      {task.instagramCommentTask?.post && (
        <PostDescription post={task.instagramCommentTask.post} />
      )}

      <Box my={1.5}>
        <Divider />
      </Box>

      <Box mt={1} display='flex' justifyContent='space-between'>
        <Typography variant='h6'>
          <Currency
            value={task.reward + Math.round((task.reward * task.bonusRate) / 100)}
          />
          <Typography variant='body2' color='textSecondary'>
            (<Currency value={task.reward} /> + чай{' '}
            <Currency value={Math.round((task.reward * task.bonusRate) / 100)} />)
          </Typography>
        </Typography>
        <Typography>
          {task.taskType?.name}{' '}
          <Typography variant='caption' color='textSecondary'>
            #{task.taskId}
          </Typography>
          <Typography variant='body2'>Выплата: сразу</Typography>
        </Typography>
      </Box>

      {task.description && (
        <Box mt={2}>
          <Typography>Дополнительные пожелания:</Typography>
          <Typography variant='body2' color='textSecondary'>
            {task.description}
          </Typography>
        </Box>
      )}

      <Button
        style={{ marginTop: 10 }}
        color='primary'
        variant='contained'
        // size='small'
        fullWidth
        disabled={taking}
        onClick={handleTaskTake}
      >
        Принять
      </Button>

      {takingError && (
        <Typography color='error' style={{ marginTop: 14 }}>
          {takingError && takingError.message}
        </Typography>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    preview: {
      maxWidth: '100%',
      display: 'block',
    },
  }),
);
