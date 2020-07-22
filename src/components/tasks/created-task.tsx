import React, { FC } from 'react';
import { GetMe_me_createdTasks } from 'gql/types/GetMe';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { Currency } from 'components/billing/currency';
import { PostDescription } from 'components/post-description';

export interface CreatedTaskProps {
  task: GetMe_me_createdTasks;
}

export const CreatedTask: FC<CreatedTaskProps> = ({ task }) => {
  const c = useStyles();

  return (
    <Box className={c.root}>
      {task.instagramCommentTask?.post && (
        <PostDescription post={task.instagramCommentTask.post} />
      )}

      <Box my={1.5}>
        <Divider />
      </Box>

      <Box mt={1} display='flex' justifyContent='space-between'>
        <Box>
          <Typography variant='h6'>
            <Currency value={Math.round(task.currentBudget)} /> /{' '}
            <Currency value={task.totalBudget} sign={false} />
          </Typography>
          <Typography variant='body2'>Чай {task.bonusRate}%</Typography>
        </Box>

        <Box>
          <Typography variant='body2' gutterBottom>
            {task.taskType?.name} #{task.id}
          </Typography>
          <Typography variant='body2'>
            До {new Date(task.expiredAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {task.description && (
        <Box mt={1.5}>
          <Typography variant='subtitle2'>Дополнительные пожелания:</Typography>
          <Typography variant='body2' color='textSecondary'>
            {task.description}
          </Typography>
        </Box>
      )}

      <Box mt={1.5} display='flex'>
        <Button color='secondary' variant='contained' fullWidth disabled>
          Отменить
        </Button>
        <Button
          href={task.instagramCommentTask?.postUrl || ''}
          target='_blank'
          color='primary'
          style={{ marginLeft: 8 }}
          variant='contained'
          fullWidth
        >
          Открыть пост
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
