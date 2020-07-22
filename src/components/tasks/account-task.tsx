import React, { FC } from 'react';
import { useAccountTasks, useVerifyInstagramCommentAccountTask } from 'gql/tasks';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { PostDescription } from 'components/post-description';
import { Currency } from 'components/billing/currency';
import Timer from 'react-compound-timer';
import { Error } from 'components/error';

export interface AccountTaskProps {
  accountId: number;
  accountTaskId: number;
  onVerify?: () => void;
}

export const AccountTask: FC<AccountTaskProps> = ({
  accountId,
  accountTaskId,
  onVerify,
}) => {
  const c = useStyles();

  const { accountTasks } = useAccountTasks({ accountId });
  const task = accountTasks?.find((task) => task.id === accountTaskId);

  const [
    verifyInstagramCommentAccountTask,
    { loading: verifying, error: verifyingError },
  ] = useVerifyInstagramCommentAccountTask();

  async function handleVerifyTask() {
    await verifyInstagramCommentAccountTask({
      variables: {
        accountTaskId,
      },
    });

    if (onVerify) {
      onVerify();
    }
  }

  if (!task) {
    return null;
  }

  return (
    <Box className={c.root}>
      {task.instagramCommentTask?.post && (
        <PostDescription post={task.instagramCommentTask.post} />
      )}

      <Box mt={2} display='flex' justifyContent='space-between'>
        <Box>
          <Typography variant='h6'>
            <Currency value={task.reward + Math.round(task.bonus)} />
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            (<Currency value={task.reward} /> + чай{' '}
            <Currency value={Math.round(task.bonus)} />)
          </Typography>
        </Box>

        <Box>
          <Typography variant='body2' gutterBottom>
            {task.taskType?.name} #{task.id}
          </Typography>
          <Typography variant='body2'>Выплата: сразу</Typography>
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

      <Box mt={2} mb={2.5}>
        <Divider />
      </Box>

      {task.status === 'expired' && (
        <Typography color='secondary' align='center' variant='body2'>
          Срок выполнения задания истек, пожалуйста, возьмите другое задание.
        </Typography>
      )}

      {task.status === 'inProgress' && (
        <>
          <Box textAlign='center'>
            <Typography variant='body2' gutterBottom>
              Вам необходимо принять участие в дискуссии на тему публикации.
            </Typography>
            <Typography variant='caption'>
              <b>
                Минимальные требования: <br /> 4 слова по теме публикации
              </b>
            </Typography>
            {/* <Typography variant='body2' color='textSecondary' gutterBottom>
              Заказчик может повысить чаевые за качественное участие или запретить
              вам выполнять новые задания в обратном случае.
            </Typography> */}
          </Box>

          <Box mt={1.5} className={c.timer}>
            До завершения:{' '}
            <Timer
              initialTime={
                new Date(task.accountTaskExpiredAt).getTime() - Date.now()
              }
              direction='backward'
            >
              {() => (
                <>
                  <Timer.Minutes /> минуты <Timer.Seconds /> секунды
                </>
              )}
            </Timer>
          </Box>

          {verifyingError && <Error error={verifyingError} />}

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
              color='primary'
              style={{ marginLeft: 8 }}
              variant='contained'
              fullWidth
              disabled={verifying}
              onClick={handleVerifyTask}
            >
              {verifying ? (
                <CircularProgress style={{ width: 24, height: 24 }} />
              ) : (
                'Проверить'
              )}
            </Button>
          </Box>
        </>
      )}

      {task.status === 'completed' && (
        <>
          <Typography style={{ color: '#32b336' }} align='center' variant='body2'>
            Задание успешно выполнено! <br />
            <Currency value={task.reward} /> были переведены на ваш счет. <br />
            Чай <Currency value={Math.round(task.bonus)} /> будет переведен чуть
            позже.
          </Typography>
        </>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    timer: {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.info.main,
      fontSize: '1rem',
      textAlign: 'center',
      width: '100%',
    },
  }),
);
