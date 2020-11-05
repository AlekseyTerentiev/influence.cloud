import React, { FC, useEffect, useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountTasks /*, useAccountTask */ } from 'gql/account-tasks';
import { useStartImplementation } from 'gql/account-tasks';
import { useVerifyInstagramCommentAccountTask } from 'gql/instagram-comment-task';
import { useVerifyInstagramStoryAccountTask } from 'gql/instagram-story-task';
import {
  Container,
  Box,
  Typography,
  Link,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
// import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { MediaInput } from 'components/common/input/media-input';
import { PostDescription } from 'components/common/post-description';
import { Currency } from 'components/billing/currency';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CheckOutlined } from '@ant-design/icons';
import Timer from 'react-compound-timer';
import clsx from 'clsx';

import { useStyles } from './account-task.s';

export interface AccountTaskProps {
  accountId: number;
  accountTaskId: number;
}

export const AccountTask: FC<AccountTaskProps> = ({ accountId, accountTaskId }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { accountTasks, refetch } = useAccountTasks({
    accountId,
  });

  const task = accountTasks?.find((task) => task.id === accountTaskId);
  // const { accountTask } = useAccountTask({ accountTaskId });

  const [resultStoryLink, setResultStoryLink] = useState('');
  const [resultStoryScreenshotLink, setResultStoryScreenshotLink] = useState('');
  const [
    resultStoryScreenshotUploading,
    setResultStoryScreenshotUploading,
  ] = useState(false);

  const [
    startImplementation,
    { loading: startImplementationLoading, error: startImplementationError },
  ] = useStartImplementation();
  const handleStartImplementation = () => {
    startImplementation({
      variables: {
        accountTaskId,
      },
    });
  };

  const [
    verifyInstagramCommentAccountTask,
    { loading: verifyingCommentTask, error: verifyCommentTaskError },
  ] = useVerifyInstagramCommentAccountTask();

  const [
    verifyInstagramStoryAccountTask,
    { loading: verifyingStoryTask, error: verifyStoryTaskError },
  ] = useVerifyInstagramStoryAccountTask();

  const verifying = verifyingCommentTask || verifyingStoryTask;
  const verifyError = verifyCommentTaskError || verifyStoryTaskError;

  const verifySubmitDisabled =
    verifying ||
    !task ||
    (task.taskType.type === 'instagram_story' &&
      (!resultStoryLink ||
        !resultStoryScreenshotLink ||
        resultStoryScreenshotUploading));

  const handleVerifySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!task) {
      return;
    }
    if (task.__typename === 'InstagramCommentAccountTask') {
      await verifyInstagramCommentAccountTask({ variables: { accountTaskId } });
    } else if (task.__typename === 'InstagramStoryAccountTask') {
      await verifyInstagramStoryAccountTask({
        variables: {
          accountTaskId,
          storyUrl: resultStoryLink,
          storyScreenshotMediaLink: resultStoryScreenshotLink,
        },
      });
    }
    (window as any).gtag('event', 'task-complete', {
      type: task.taskType.type,
    });
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

  if (!task) {
    return null;
  }

  const taskRequirement =
    task.__typename === 'InstagramCommentAccountTask'
      ? `${t('Join discussion')} (${t('minimum 4 words')})`
      : task.__typename === 'InstagramStoryAccountTask'
      ? `${t('Publish story with')} ${
          task.websiteUrl && !task.accountUsername
            ? t('destination link')
            : !task.websiteUrl && task.accountUsername
            ? t('mention account')
            : t('destination link and account username')
        }`
      : '';

  return (
    <>
      {task.status === 'waiting' && (
        <Box className={clsx(c.statusAlert, c.statusConfirmationAlert)}>
          <Container>
            <Typography>{t('Awaiting confirmation')}</Typography>
            <Box mt={0.5} />
            <Typography color='textSecondary'>
              {t('You will receive an email after the customer has confirmed.')}
            </Typography>
          </Container>
        </Box>
      )}

      {task.status === 'approved' && (
        <div className={clsx(c.statusAlert, c.statusInProgressAlert)}>
          <Container>
            <Typography>{t('Task approved')}</Typography>
            <Box mt={0.5} />
            <Typography color='textSecondary'>
              {t('Now you can start the task')}
            </Typography>
            <Box mt={1} />
            <Button
              color='primary'
              variant='contained'
              size='large'
              fullWidth
              disabled={startImplementationLoading}
              onClick={handleStartImplementation}
            >
              {t('Start Implementation')}
            </Button>
            {startImplementationError && <Error error={startImplementationError} />}
          </Container>
        </div>
      )}

      {task.status === 'inProgress' && (
        <form
          className={clsx(c.statusAlert, c.statusInProgressAlert)}
          onSubmit={handleVerifySubmit}
        >
          <Container>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography>{t('Task accepted')}</Typography>
              <Typography className={c.timer}>
                <Timer
                  lastUnit='h'
                  formatValue={(v) => `${v < 10 ? `0${v}` : v}`}
                  initialTime={
                    new Date(task.accountTaskExpiredAt).getTime() - Date.now()
                  }
                  direction='backward'
                >
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Timer>
              </Typography>
            </Box>
            <Box mt={0.5} />
            <Typography color='textSecondary'>
              {task.__typename === 'InstagramCommentAccountTask'
                ? t('Leave unique and relevant comment.')
                : task.__typename === 'InstagramStoryAccountTask' &&
                  t('Create and post promo story.')}{' '}
              {t('The following requirements must also be considered.')}{' '}
              {t('You have limited time to complete this task.')}
            </Typography>

            {verifyError && <Error error={verifyError} />}

            {task.__typename === 'InstagramStoryAccountTask' && (
              <>
                <Box mt={1.5}>
                  <Typography className={c.label}>{t('Link to story')}</Typography>
                  <TextField
                    required
                    type='url'
                    placeholder='https://www.instagram.com/stories/visitsouthamerica.co/2413646525949733573'
                    value={resultStoryLink}
                    onChange={(e) => setResultStoryLink(e.target.value)}
                    variant='outlined'
                    inputProps={{ className: c.verifyInput }}
                    fullWidth
                  />
                </Box>
                <Box mt={1.5}>
                  <Typography className={c.label}>
                    {t('Story screenshot')}
                  </Typography>
                  <MediaInput
                    required
                    color='success'
                    label={t('Upload Screenshot')}
                    onChange={(urls) => setResultStoryScreenshotLink(urls[0])}
                    onLoading={(loading) =>
                      setResultStoryScreenshotUploading(loading)
                    }
                  />
                </Box>
              </>
            )}

            <Box mt={1.5} />

            <Button
              type='submit'
              color='primary'
              variant='contained'
              size='large'
              fullWidth
              className={c.verifyButton}
              disabled={verifySubmitDisabled}
            >
              {verifying ? (
                <CircularProgress style={{ width: 28, height: 28 }} />
              ) : (
                t('Mark as Complete')
              )}
            </Button>
          </Container>
        </form>
      )}

      {task.status === 'preCompleted' && (
        <Box className={clsx(c.statusAlert, c.statusCompletedAlert)}>
          <Container>
            <Typography>{t('Task completed!')}</Typography>
            <Box mt={0.5} />
            <Typography>
              <Typography color='textSecondary'>
                {t('Reward')} <Currency value={task.reward} /> {t('and')} {t('Tip')}{' '}
                <Currency value={Math.round(task.bonus)} />{' '}
                {t('will be transferred within 24 hours.')}
              </Typography>
            </Typography>
          </Container>
        </Box>
      )}

      {task.status === 'completed' && (
        <Box className={clsx(c.statusAlert, c.statusCompletedAlert)}>
          <Container>
            <Typography>{t('Task completed!')}</Typography>
            <Box mt={0.5} />
            <Typography>
              <Typography color='textSecondary'>
                <Currency value={task.reward} />{' '}
                {t('has been transferred to your balance')}.{' '}
                {task.bonusStatus === 'approved' ? (
                  <>
                    {t('Tip')} <Currency value={Math.round(task.bonus)} />{' '}
                    {t('has also been transferred')}.
                  </>
                ) : (
                  <>
                    {t('Tip')} <Currency value={Math.round(task.bonus)} />{' '}
                    {t(
                      'will be translated a little later if the customer likes the result',
                    )}
                    .
                  </>
                )}
              </Typography>
            </Typography>
          </Container>
        </Box>
      )}

      {task.status === 'notApproved' && (
        <Box className={clsx(c.statusAlert, c.statusNotApprovedAlert)}>
          <Container>
            <Typography>{t('The task was not approved')}</Typography>
            <Box mt={0.5} />
            <Typography color='textSecondary'>
              {t('Please take another task')}
            </Typography>
          </Container>
        </Box>
      )}

      {task.status === 'expired' && (
        <Box className={clsx(c.statusAlert, c.statusExpiredAlert)}>
          <Container>
            <Typography>{t('The task has expired')}</Typography>
            <Box mt={0.5} />
            <Typography color='textSecondary'>
              {t('Please take another task')}
            </Typography>
          </Container>
        </Box>
      )}

      <Container>
        <Typography className={c.label}>{t('Task info')}</Typography>
        <Typography className={c.type}>
          {t(task.taskType?.name)} #{task.id}
        </Typography>

        <Box mt={1.5}>
          <Typography className={c.label}>{t('Payment Info')}</Typography>
          <Box display='flex' alignItems='baseline' flexWrap='wrap'>
            <Typography className={c.reward}>
              <Currency value={task.reward + Math.round(task.bonus)} />
            </Typography>
            <Typography className={c.rewardDetailed}>
              <Currency value={task.reward} /> + {t('tip')}{' '}
              <Currency value={Math.round(task.bonus)} />
            </Typography>
            <Box ml='auto' />
            <Typography className={c.payout}>
              {t('Payout')}: {t(task.taskType.payoutType)}
            </Typography>
          </Box>
        </Box>

        {task.__typename === 'InstagramCommentAccountTask' && (
          <Box mt={1.5} mb={2}>
            <Typography className={c.label} style={{ marginBottom: 8 }}>
              {t('Target Post')}
            </Typography>
            <PostDescription post={task.post} />
          </Box>
        )}

        {task.__typename === 'InstagramStoryAccountTask' &&
          task.layoutMediaUrls.length > 0 && (
            <Box mt={1.5} mb={2}>
              <Typography className={c.label}>{t('Attached Files')}</Typography>
              {task.layoutMediaUrls.map((url) => (
                <img key={url} src={url} className={c.layoutMedia} alt='' />
              ))}
            </Box>
          )}

        {task.__typename === 'InstagramStoryAccountTask' && task.websiteUrl && (
          <Box mt={1.5}>
            <Typography className={c.label}>{t('Destination Link')}</Typography>
            <Box className={c.linkContainer}>
              <Link className={c.link} href={task.websiteUrl} target='_blank'>
                {task.websiteUrl}
              </Link>
              <CopyToClipboard text={task.websiteUrl}>
                <Button
                  className={c.copyButton}
                  data-clipboard-text={task.websiteUrl}
                  aria-label={t('Copy Link')}
                >
                  {t('Copy Link')}
                </Button>
              </CopyToClipboard>
            </Box>
          </Box>
        )}

        {task.__typename === 'InstagramStoryAccountTask' && task.accountUsername && (
          <Box mt={1.5}>
            <Typography className={c.label}>{t('Mention Account')}</Typography>
            <Box className={c.linkContainer}>
              <Link
                className={c.link}
                href={'https://www.instagram.com/' + task.accountUsername}
                target='_blank'
                noWrap
              >
                @{task.accountUsername}
              </Link>
              <CopyToClipboard text={task.accountUsername}>
                <Button
                  className={c.copyButton}
                  data-clipboard-text={task.accountUsername}
                  aria-label={t('Copy Username')}
                >
                  {t('Copy Username')}
                </Button>
              </CopyToClipboard>
            </Box>
          </Box>
        )}

        <Box mt={1.5}>
          <Typography className={c.label}>{t('Requirements')}</Typography>
          <Box display='flex' alignItems='baseline'>
            {task.description && <CheckOutlined className={c.checkIcon} />}
            <Typography>{taskRequirement}</Typography>
          </Box>

          {task.description && (
            <Box display='flex' alignItems='baseline' mt={0.25}>
              <CheckOutlined className={c.checkIcon} />
              <Typography>{task.description}</Typography>
            </Box>
          )}
        </Box>

        {task.__typename === 'InstagramCommentAccountTask' && (
          <Box mt={2}>
            <Button
              target='_blank'
              href={('post' in task && task.post.url) || ''}
              color='primary'
              variant='outlined'
              fullWidth
              style={{ marginRight: 8 }}
            >
              {t('Open post')}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};
