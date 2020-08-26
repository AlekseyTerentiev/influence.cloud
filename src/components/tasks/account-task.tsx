import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountTasks, useVerifyInstagramCommentAccountTask } from 'gql/tasks';
import { RouteComponentProps } from '@reach/router';
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
import { Modal } from 'components/modal';
// import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { PostDescription } from 'components/post-description';
import { Currency } from 'components/billing/currency';
import Timer from 'react-compound-timer';

export interface AccountTaskProps extends RouteComponentProps {
  accountId?: string;
  accountTaskId?: string;
  onClose: () => void;
}

export const AccountTask: FC<AccountTaskProps> = ({
  accountId,
  accountTaskId,
  onClose,
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { accountTasks, refetch, loading, error } = useAccountTasks({
    accountId: Number(accountId),
  });

  const task = accountTasks?.find((task) => task.id === Number(accountTaskId));

  const [
    verifyInstagramCommentAccountTask,
    { loading: verifying, error: verifyingError },
  ] = useVerifyInstagramCommentAccountTask();

  const handleVerifyTask = async () => {
    await verifyInstagramCommentAccountTask({
      variables: {
        accountTaskId: Number(accountTaskId),
      },
    });
    (window as any).gtag('event', 'task-complete');
  };

  useEffect(() => {
    // Refetch when task expired (todo: refetch one current task, not all)
    if (!task) return;
    const expiredAt = new Date(task.accountTaskExpiredAt);
    let timeout: number;
    if (expiredAt.getTime() > Date.now()) {
      timeout = window.setTimeout(() => {
        refetch();
      }, expiredAt.getTime() - Date.now());
    } else if (task.status === 'inProgress') {
      refetch();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [task]);

  return (
    <Modal open={true} maxWidth='sm' onClose={onClose}>
      {!accountId || !accountTaskId ? (
        <Error name='Bad request' />
      ) : // ) : loading ? (
      //   <Loading />
      error ? (
        <Error name={t('Loading error')} error={error} />
      ) : !task ? (
        <Error name={t('Task not found')} />
      ) : (
        <>
          {task.instagramCommentTask?.post && (
            <PostDescription post={task.instagramCommentTask.post} />
          )}

          <Box mt={2.5} display='flex' justifyContent='space-between'>
            <Box>
              <Typography variant='h6'>
                <Currency value={task.reward + Math.round(task.bonus)} />
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                <Currency value={task.reward} /> + {t('tip')}{' '}
                <Currency value={Math.round(task.bonus)} />
              </Typography>
            </Box>

            <Box mt={0.5} textAlign='right'>
              <Typography variant='body2' gutterBottom>
                {t(task.taskType?.name || '')} #{task.id}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {t('Payout')}: {t('immediately')}
              </Typography>
            </Box>
          </Box>

          <Box mt={1.5}>
            <Typography variant='subtitle2'>{t('Task description')}:</Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              style={{ marginBottom: 2 }}
            >
              {t('Join discussion')} ({t('minimum 4 words')})
            </Typography>
            {/* <Typography variant='body2'>({t('minimum 4 words')})</Typography> */}
          </Box>

          {task.description && (
            <Box mt={1.5}>
              <Typography variant='subtitle2'>{t('Customer wishes')}:</Typography>
              <Typography variant='body2' color='textSecondary'>
                {task.description}
              </Typography>
            </Box>
          )}

          <Box mt={2} mb={2.5}>
            <Divider />
          </Box>

          {task.status === 'inProgress' && (
            <>
              <Box mt={1.5} className={c.timer}>
                {t('Time left')}:{' '}
                <Timer
                  initialTime={
                    new Date(task.accountTaskExpiredAt).getTime() - Date.now()
                  }
                  direction='backward'
                >
                  {() => (
                    <>
                      <Timer.Minutes /> {t('minutes')} <Timer.Seconds />{' '}
                      {t('seconds')}
                    </>
                  )}
                </Timer>
              </Box>

              {verifyingError && <Error error={verifyingError} />}

              <Box mt={2} display='flex'>
                <Button
                  target='_blank'
                  href={task.instagramCommentTask.postUrl}
                  color='primary'
                  variant='outlined'
                  fullWidth
                >
                  {t('Open post')}
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
                    <CircularProgress style={{ width: 28, height: 28 }} />
                  ) : (
                    t('Verify')
                  )}
                </Button>
              </Box>
            </>
          )}

          {task.status === 'completed' && (
            <>
              <Typography
                style={{ color: '#32b336' }}
                align='center'
                variant='body2'
              >
                {t('The task was successfully completed!')} <br />
                <Currency value={task.reward} />{' '}
                {t('has been transferred to your balance')}. <br />
                {(task.bonusStatus === 'hold' || task.bonusStatus === 'pending') && (
                  <>
                    {t('Tip')} <Currency value={Math.round(task.bonus)} />{' '}
                    {t('will be translated a little later')}, <br />
                    {t('if the customer likes the result')}.
                  </>
                )}
                {task.bonusStatus === 'approved' && (
                  <>
                    {t('Tip')} <Currency value={Math.round(task.bonus)} />{' '}
                    {t('has also been transferred')}.
                  </>
                )}
              </Typography>
            </>
          )}

          {task.status === 'expired' && (
            <Typography color='secondary' align='center' variant='body2'>
              {t('The task has expired')}. <br /> {t('Please take another task')}.
            </Typography>
          )}
        </>
      )}
    </Modal>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timer: {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.info.main,
      fontSize: '1rem',
      textAlign: 'center',
      width: '100%',
    },
  }),
);
