import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAvailableTasks } from 'gql/tasks';
import { useTakeInstagramCommentTask } from 'gql/tasks';
import { navigate } from '@reach/router';
import { accountTaskRoute } from 'routes';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { Modal } from 'components/modal';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { Currency } from 'components/billing/currency';
import { PostDescription } from 'components/post-description';

export interface AvailableTaskProps extends RouteComponentProps {
  accountId?: string;
  taskId?: string;
  onClose: () => void;
}

export const AvailableTask: FC<AvailableTaskProps> = ({
  accountId,
  taskId,
  onClose,
}) => {
  // const c = useStyles();

  const { availableTasks, loading, error } = useAvailableTasks({
    accountId: Number(accountId),
  });

  const [
    takeInstagramCommentTask,
    { loading: taking, error: takingError },
  ] = useTakeInstagramCommentTask(Number(accountId));

  async function handleTakeTask() {
    const takenTask = await takeInstagramCommentTask({
      variables: {
        accountId: Number(accountId),
        taskId: Number(taskId),
      },
    });

    const takenTaskId = takenTask.data?.takeInstagramCommentTask?.accountTaskId;
    if (takenTaskId) {
      navigate(accountTaskRoute(Number(accountId), takenTaskId));
    }
  }

  const task = availableTasks?.find((task) => task.taskId === Number(taskId));

  return (
    <Modal open={true} maxWidth='sm' onClose={onClose}>
      {!accountId || !taskId ? (
        <Error name='Bad request' />
      ) : loading ? (
        <Loading />
      ) : error ? (
        <Error name='Ошибка загрузки заданий' error={error} />
      ) : !task ? (
        <Error name='Задание не найдено' />
      ) : (
        <>
          {task.instagramCommentTask?.post && (
            <PostDescription post={task.instagramCommentTask.post} />
          )}

          <Box mt={2} display='flex' justifyContent='space-between'>
            <Box>
              <Typography variant='h6'>
                <Currency
                  value={
                    task.reward + Math.round((task.reward * task.bonusRate) / 100)
                  }
                />
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                (<Currency value={task.reward} /> + чай{' '}
                <Currency value={Math.round((task.reward * task.bonusRate) / 100)} />
                )
              </Typography>
            </Box>
            <Box>
              <Typography variant='body2' gutterBottom>
                {task.taskType?.name} #{task.taskId}
              </Typography>
              <Typography variant='body2'>Выплата: сразу</Typography>
            </Box>
          </Box>

          <Box mt={1.5}>
            <Typography variant='subtitle2'>Описание задания:</Typography>
            {/* <Typography variant='subtitle2'>Заданиe:</Typography> */}
            <Typography variant='body2' color='textSecondary'>
              Необходимо принять участие в дискуссии на тему публикации <br />
              (минимум 4 слова)
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

          {takingError && <Error error={takingError} />}

          <Box mt={2} display='flex'>
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
              onClick={handleTakeTask}
            >
              Принять
            </Button>
          </Box>
        </>
      )}
    </Modal>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);
