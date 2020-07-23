import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useMe } from 'gql/user';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { Modal } from 'components/modal';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { PostDescription } from 'components/post-description';
import { Currency } from 'components/billing/currency';

export interface CreatedTaskProps extends RouteComponentProps {
  taskId?: string;
  onClose: () => void;
}

export const CreatedTask: FC<CreatedTaskProps> = ({ taskId, onClose }) => {
  const c = useStyles();

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];

  if (!taskId) {
    return <Error name='Bad request' />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error name='Ошибка загрузки задания' error={error} />;
  }

  const task = createdTasks?.find((task) => task.id === Number(taskId));

  if (!task) {
    return <Typography>Задание не найдено</Typography>;
  }

  return (
    <Modal open={true} maxWidth='sm' onClose={onClose}>
      {task.instagramCommentTask?.post && (
        <PostDescription post={task.instagramCommentTask.post} />
      )}

      <Box mt={2} display='flex' justifyContent='space-between'>
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

      <Box mt={2} display='flex'>
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
    </Modal>
  );
};

export const useStyles = makeStyles((theme: Theme) => createStyles({}));
