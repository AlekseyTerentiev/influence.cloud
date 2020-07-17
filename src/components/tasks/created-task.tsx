import React, { FC } from 'react';
import { GetMe_me_createdTasks } from 'gql/types/GetMe';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Divider,
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
        <Typography variant='h6'>
          <Currency value={task.currentBudget} /> /{' '}
          <Currency value={task.totalBudget} sign={false} />
          <Typography variant='caption' display='block'>
            Чай {task.bonusRate}%
          </Typography>
        </Typography>

        <Typography>
          {task.taskType?.name}{' '}
          <Typography variant='caption' color='textSecondary'>
            #{task.id}
          </Typography>
          <Typography variant='caption' display='block'>
            До {new Date(task.expiredAt).toLocaleDateString()}
          </Typography>
        </Typography>
      </Box>

      {task.description && (
        <Box mt={1.5}>
          <Typography>Дополнительные пожелания:</Typography>
          <Typography variant='body2' color='textSecondary'>
            {task.description}
          </Typography>
        </Box>
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
