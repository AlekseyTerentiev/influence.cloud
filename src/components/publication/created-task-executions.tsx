import React, {
  FC,
  HTMLAttributes,
  useState,
  MouseEvent,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { GetTaskAccountTasks_taskAccountTasks } from 'gql/types/GetTaskAccountTasks';
import { AccountTaskRating, FeedBackType } from 'gql/types/globalTypes';
import {
  useTaskAccountTasks,
  useApproveAccountTask,
  useRateAccountTask,
} from 'gql/task-account-tasks';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  SnackbarContent,
  CircularProgress,
} from '@material-ui/core';
import { AccountTaskStatus } from 'components/execution/account-task-status';
import { Rating } from '@material-ui/lab';
import { Modal } from 'components/common/modal';
import { Error } from 'components/common/error';
import { EllipsisOutlined as EllipsisIcon } from '@ant-design/icons';
import { TaskData } from 'gql/types/TaskData';
import moment from 'moment';
import { Currency } from 'components/billing/currency';

export interface CreatedTaskExecutorsProps extends HTMLAttributes<HTMLDivElement> {
  task: TaskData;
}

export const CreatedTaskExecutions: FC<CreatedTaskExecutorsProps> = ({
  task,
  ...otherProps
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { taskAccountTasks } = useTaskAccountTasks({ taskId: task.id });

  const [
    approveAccountTask,
    { loading: approving, error: approvingError },
  ] = useApproveAccountTask(task);

  const handleApprove = (accountTaskId: number, approved: boolean) => {
    approveAccountTask({
      variables: {
        accountTaskId,
        approved,
      },
    });
  };

  return (
    <Box {...otherProps}>
      <Box className={c.header}>
        <Typography className={c.title}>{t('Executors')}</Typography>
        <Typography className={c.executorsCount}>
          {taskAccountTasks?.length || ''}
        </Typography>
      </Box>

      {taskAccountTasks && taskAccountTasks.length > 0 ? (
        taskAccountTasks.map((executor) => (
          <Box className={c.executor} key={executor.id}>
            <Box className={c.head}>
              <a
                className={c.avatar}
                href={`https://www.instagram.com/${executor.username}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Avatar src={executor.profilePic} />
              </a>

              <Box flex={1}>
                <Box className={c.headLine}>
                  <span className={c.username}>
                    <a
                      href={`https://www.instagram.com/${executor.username}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {executor.username}
                    </a>
                  </span>

                  <ExecutorMenu executor={executor} />
                </Box>

                <Box className={c.headLine}>
                  <Box className={c.info}>
                    {executor.statisticData.country}{' '}
                    {executor.statisticData.language}{' '}
                    {t(executor.statisticData.ownerGender)}{' '}
                    {moment().diff(executor.statisticData.ownerBirthDate, 'years')}{' '}
                    {t('years')}
                  </Box>

                  <AccountTaskStatus
                    className={c.status}
                    status={executor.status}
                    taskCompletedAt={executor.completedAt}
                  />
                </Box>
              </Box>
            </Box>

            {executor.status === 'waiting' && (
              <ExecutorStatistics executor={executor} />
            )}

            {(executor.status === 'completed' ||
              executor.status === 'preCompleted') && (
              <Box className={c.execution}>
                {executor.__typename === 'InstagramCommentTaskAccountTask' && (
                  <Typography className={c.commentText}>
                    {executor.commentText || '-'}
                  </Typography>
                )}
                {executor.__typename === 'InstagramStoryTaskAccountTask' && (
                  <a
                    href={executor.storyUrl || ''}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src={executor.storyScreenshotMediaLink || ''}
                      className={c.storyImage}
                      alt=''
                    ></img>
                  </a>
                )}
              </Box>
            )}

            {executor.status === 'waiting' && (
              <Box display='flex' mt={1}>
                <Button
                  variant='contained'
                  color='secondary'
                  fullWidth
                  size='small'
                  onClick={() => handleApprove(executor.id, false)}
                  disabled={approving}
                >
                  {t('Reject')}
                </Button>
                <Box ml={1} />
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={() => handleApprove(executor.id, true)}
                  disabled={approving}
                  size='small'
                >
                  {t('Approve')}
                </Button>
              </Box>
            )}

            {approvingError && <Error error={approvingError} />}
          </Box>
        ))
      ) : (
        <Typography className={c.noExecutorsHint}>{t('No executors')}</Typography>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    header: {
      marginBottom: t.spacing(0.5),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: 'rgba(193, 194, 208, 1)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '18px',
      letterSpacing: 0.8,
    },
    executorsCount: {
      color: t.palette.text.hint,
      fontWeight: t.typography.fontWeightBold,
    },
    executor: {
      padding: t.spacing(1.25, 0),
      borderTop: '1px solid ' + t.palette.divider,
    },
    head: {
      display: 'flex',
    },
    headLine: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gridGap: t.spacing(0.5),
    },
    info: {
      letterSpacing: -0.3,
      textTransform: 'capitalize',
      color: t.palette.text.secondary,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    avatar: {
      padding: t.spacing(0.5, 1.2, 0, 0),
    },
    username: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontSize: t.typography.body1.fontSize,
    },
    statisctics: {
      marginTop: t.spacing(1),
      fontSize: t.typography.body2.fontSize,
      letterSpacing: -0.2,
    },
    statiscticsRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    execution: {
      marginTop: t.spacing(0.8),
    },
    commentText: {
      fontSize: 15,
    },
    storyImage: {
      display: 'block',
      marginTop: t.spacing(0.5),
      borderRadius: t.shape.borderRadius * 3,
      width: '100%',
    },
    status: {
      letterSpacing: -0.1,
    },
    noExecutorsHint: {
      color: t.palette.text.hint,
    },
  }),
);

/** EXECUTION STATISTICS **/

export interface ExecutorStatisticsProps {
  executor: GetTaskAccountTasks_taskAccountTasks;
  column?: boolean;
}

export const ExecutorStatistics: FC<ExecutorStatisticsProps> = ({
  executor,
  column = false,
}) => {
  const c = useExecutorStatisticsStyles({ column });
  const { t } = useTranslation();

  return (
    <Box className={c.root}>
      <Box className={c.column}>
        <div>
          {t('Cost')}: <Currency value={executor.reward} />
        </div>
        <div>
          {t('Followers')}: {executor.statisticData.followersAmount}
        </div>
        <div>
          {t('Pofile visits')}: {executor.statisticData.profileVisits}
        </div>
      </Box>

      <Box className={c.column}>
        <div>
          {t('Impressions')}: {executor.statisticData.impressions}
        </div>
        <div>
          {t('Story Impressions')}: {executor.statisticData.impressionsStory}
        </div>
      </Box>
    </Box>
  );
};

export const useExecutorStatisticsStyles = makeStyles((t: Theme) =>
  createStyles({
    root: ({ column }: { column: boolean }) => ({
      marginTop: t.spacing(1),
      fontSize: column ? t.typography.body1.fontSize : t.typography.body2.fontSize,
      lineHeight: column
        ? t.typography.body1.lineHeight
        : t.typography.body2.lineHeight,
      letterSpacing: -0.2,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: column ? 'column' : 'row',
    }),
    column: ({ column }: { column: boolean }) => ({
      '&:last-child': {
        textAlign: column ? 'left' : 'right',
      },
    }),
  }),
);

/** EXECUTION MENU **/

export interface ExecutorMenuProps {
  executor: GetTaskAccountTasks_taskAccountTasks;
}

export const ExecutorMenu: FC<ExecutorMenuProps> = ({ executor }) => {
  const c = useExecutorMenuStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenInstagramClick = () => {
    window.open(`https://www.instagram.com/${executor.username}`, '_blank');
    handleClose();
  };

  const [statisticsOpen, setStatisticsOpen] = useState(false);
  const handleShowStatisticsClick = () => {
    setStatisticsOpen(true);
    handleClose();
  };

  const [openRateModal, setOpenRateModal] = useState(false);
  const handleRateClick = async () => {
    setOpenRateModal(true);
    handleClose();
  };
  const handleRateModalClose = () => {
    setOpenRateModal(false);
  };
  const handleRate = () => {
    setOpenRateModal(false);
    setOpenRateSuccessAlert(true);
  };
  const [openRateSuccessAlert, setOpenRateSuccessAlert] = useState(false);

  return (
    <>
      <IconButton
        edge='end'
        size='small'
        aria-controls={`executor-${executor.id}-menu`}
        aria-haspopup='true'
        onClick={handleOpen}
        title=''
      >
        <EllipsisIcon />
      </IconButton>

      <Menu
        id={`executor-${executor.id}-menu`}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenInstagramClick}>
          <Typography>{t('Open Instagram')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleShowStatisticsClick}>
          <Typography>{t('Show Statistics')}</Typography>
        </MenuItem>
        {(executor.status === 'preCompleted' || executor.status === 'completed') && (
          <MenuItem onClick={handleRateClick}>
            <Typography>
              {executor.rating ? t('Show Rating') : t('Rate Execution')}
            </Typography>
          </MenuItem>
        )}
      </Menu>

      {statisticsOpen && (
        <Modal
          open={statisticsOpen}
          onClose={() => setStatisticsOpen(false)}
          fullWidthOnMobile={false}
          fullWidth={false}
        >
          <Typography variant='h6'>@{executor.username}</Typography>
          <ExecutorStatistics executor={executor} column />
        </Modal>
      )}

      {openRateModal && (
        <Modal
          open={openRateModal}
          onClose={handleRateModalClose}
          fullWidthOnMobile={false}
          fullWidth={false}
        >
          <ExecutionRate execution={executor} onRate={handleRate} />
        </Modal>
      )}

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openRateSuccessAlert}
        autoHideDuration={2500}
        onClose={() => setOpenRateSuccessAlert(false)}
      >
        <SnackbarContent
          className={c.successAlert}
          message={t('Your review has been accepted!')}
        />
      </Snackbar>
    </>
  );
};

export const useExecutorMenuStyles = makeStyles((t: Theme) =>
  createStyles({
    successAlert: {
      background: t.palette.success.main,
    },
  }),
);

/** EXECUTION RATE **/

export interface ExecutionRateProps {
  execution: GetTaskAccountTasks_taskAccountTasks;
  onRate?: () => void;
}

export const ExecutionRate: FC<ExecutionRateProps> = ({ execution, onRate }) => {
  const { t } = useTranslation();

  const [rating, setRating] = useState<number | null>();
  const handleRatingChange = (e: ChangeEvent<{}>, rating: number | null) => {
    setRating(rating);
  };
  const [feedback, setFeedback] = useState<FeedBackType>(
    FeedBackType.commentNotApplyToTopic,
  );
  const handleFeedbackChange = (e: ChangeEvent<{ value: unknown }>) => {
    setFeedback(e.target.value as FeedBackType);
  };

  const [
    rateAccountTask,
    { loading: rateProcessing, error: rateError },
  ] = useRateAccountTask(execution.taskId);

  const handleRateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rating) {
      return;
    }
    await rateAccountTask({
      variables: {
        accountTaskId: execution.id,
        rating:
          AccountTaskRating[
            Object.keys(AccountTaskRating).reverse()[
              rating - 1
            ] as keyof typeof AccountTaskRating
          ],
        feedback: rating <= 3 ? feedback : null,
      },
    });
    if (onRate) {
      onRate();
    }
  };

  return (
    <form onSubmit={handleRateSubmit}>
      <Typography align='center' variant='h6' gutterBottom>
        {execution.rating ? t('Rating') + ':' : t('Rate execution')}
      </Typography>

      <Box display='flex' justifyContent='center'>
        <Rating
          disabled={!!execution.rating}
          name='rating'
          size='large'
          max={Object.keys(AccountTaskRating).length}
          value={
            execution.rating
              ? Object.keys(AccountTaskRating).reverse().indexOf(execution.rating) +
                1
              : rating
          }
          onChange={execution.rating ? () => {} : handleRatingChange}
        />
      </Box>

      <Box mt={1.5} />

      {((rating && rating <= 3) || execution.feedback) && (
        <FormControl fullWidth variant='outlined' style={{ marginTop: 2 }}>
          <InputLabel id={`execution-${execution.id}-feedback`}>
            {t('Feedback')}
          </InputLabel>
          <Select
            labelId={`execution-${execution.id}-feedback`}
            name={`execution-${execution.id}-feedback`}
            value={execution.feedback ? execution.feedback : feedback}
            disabled={!!execution.feedback}
            onChange={execution.feedback ? () => {} : handleFeedbackChange}
          >
            {Object.keys(FeedBackType).map((feedback) => (
              <MenuItem key={feedback} value={feedback}>
                {t(feedback)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {rateError && <Error error={rateError} />}

      {!execution.rating && (
        <Box mt={2}>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            size='large'
            fullWidth
            disabled={!rating || rateProcessing}
          >
            {rateProcessing ? (
              <CircularProgress style={{ width: 28, height: 28 }} />
            ) : (
              t('Submit')
            )}
          </Button>
        </Box>
      )}
    </form>
  );
};
