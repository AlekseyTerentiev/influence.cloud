import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountTasks } from 'gql/account-tasks';
import { useVerifyInstagramCommentAccountTask } from 'gql/instagram-comment-task';
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
import { Modal } from 'components/common/modal';
// import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { PostDescription } from 'components/common/post-description';
import { Currency } from 'components/billing/currency';
import { CheckOutlined } from '@ant-design/icons';
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

  const { accountTasks, refetch, /*loading,*/ error } = useAccountTasks({
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
  }, [task, refetch]);

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
          {'post' in task && <PostDescription post={task.post} />}

          <Box mt={2.5} display='flex' justifyContent='space-between'>
            <Box>
              <Currency
                className={c.reward}
                value={task.reward + Math.round(task.bonus)}
              />
              <Typography color='textSecondary'>
                <Currency value={task.reward} /> + {t('tip')}{' '}
                <Currency value={Math.round(task.bonus)} />
              </Typography>
            </Box>
            <Box mt={0.5} textAlign='right'>
              <Typography className={c.taskType}>
                {t(task.taskType?.name || '')} #{task.id}
              </Typography>
              <Typography className={c.payout}>
                {t('Payout')}: {t('instant')}
              </Typography>
            </Box>
          </Box>

          <Box mt={2}>
            <Typography className={c.label}>{t('Requirements')}:</Typography>
            <Box display='flex' alignItems='baseline'>
              {task.description && <CheckOutlined className={c.checkIcon} />}
              <Typography>
                {t('Join discussion')} ({t('minimum 4 words')})
              </Typography>
            </Box>

            {task.description && (
              <Box display='flex' alignItems='baseline' mt={0.25}>
                <CheckOutlined className={c.checkIcon} />
                <Typography>{task.description}</Typography>
              </Box>
            )}
          </Box>

          <Box mt={2} mb={2.5}>
            <Divider />
          </Box>

          {task.status === 'inProgress' && (
            <>
              <Box mt={2} className={c.timer}>
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
                  href={('post' in task && task.post.url) || ''}
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

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    reward: {
      fontSize: 28,
      fontWeight: t.typography.fontWeightMedium,
    },
    taskType: {
      fontSize: t.typography.fontSize,
      color: t.palette.text.secondary,
      letterSpacing: 0.5,
      marginBottom: t.spacing(0.4),
    },
    payout: {
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
    },
    label: {
      fontSize: t.typography.fontSize + 1,
      fontWeight: t.typography.fontWeightMedium,
      marginBottom: t.spacing(0.75),
    },
    checkIcon: {
      marginRight: t.spacing(1),
      color: t.palette.grey[700],
    },
    timer: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.info.main,
      fontSize: t.typography.body1.fontSize,
      textAlign: 'center',
      width: '100%',
    },
  }),
);
