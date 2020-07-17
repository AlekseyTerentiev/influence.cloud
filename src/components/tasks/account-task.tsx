import React, { FC } from 'react';
import { useAccountTasks } from 'gql/tasks';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { PostDescription } from 'components/post-description';
import { Currency } from 'components/billing/currency';

export interface AccountTaskProps {
  accountId: number;
  taskId: number;
  onTake?: () => void;
}

export const AccountTask: FC<AccountTaskProps> = ({ accountId, taskId, onTake }) => {
  const c = useStyles();

  const { accountTasks } = useAccountTasks({ accountId });
  const task = accountTasks?.find((task) => task.id === taskId);

  if (!task) {
    return null;
  }

  return (
    <Box className={c.root}>
      {task.instagramCommentTask?.post && (
        <PostDescription post={task.instagramCommentTask.post} />
      )}

      <Box my={2}>
        <Divider />
      </Box>

      <Box mt={1} display='flex' justifyContent='space-between'>
        <Typography variant='h6'>
          <Currency value={task.reward + Math.round(task.bonus)} />
          <Typography variant='body2' color='textSecondary'>
            (<Currency value={task.reward} /> + чай{' '}
            <Currency value={Math.round(task.bonus)} />)
          </Typography>
        </Typography>
        <Typography>
          {task.taskType?.name}{' '}
          <Typography variant='caption' color='textSecondary'>
            #{task.id}
          </Typography>
          <Typography variant='body2'>Выплата: сразу</Typography>
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

      <Box my={2}>
        <Divider />
      </Box>

      <Box textAlign='center'>
        <Typography variant='body2' gutterBottom>
          Вам необходимо принять участие в дискуссии на тему публикации.
        </Typography>
        <Typography variant='body2' gutterBottom>
          <b>Минимальные требования: 4 слова по теме публикации. </b>
        </Typography>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          Заказчик может повысить чаевые за качественное участие или запретить вам
          выполнять новые задания в обратном случае.
        </Typography>
      </Box>

      <Box mt={1.5} className={c.timer}>
        До завершения: 5 минут 56 секунд
      </Box>

      {/* {verifyingError && (
          <Typography color='error' style={{ marginTop: 14 }}>
            {verifyingError && verifyingError.message}
          </Typography>
        )} */}

      <Box mt={1.5} display='flex'>
        <Button
          target='_blank'
          href={task.instagramCommentTask.postUrl}
          color='secondary'
          style={{ backgroundColor: '#32b336' }}
          variant='contained'
          fullWidth
        >
          Открыть пост
        </Button>
        <Button
          href={task.instagramCommentTask.postUrl}
          color='primary'
          style={{ marginLeft: 8 }}
          variant='contained'
          fullWidth
        >
          Проверить
        </Button>
      </Box>
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    timer: {
      background: theme.palette.secondary.dark,
      // background: 'black',
      color: 'white',
      fontSize: '0.9rem',
      textAlign: 'center',
      padding: theme.spacing(1),
      width: '100%',
    },
  }),
);
