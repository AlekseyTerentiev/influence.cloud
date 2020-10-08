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
} from 'gql/created-tasks';
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

export interface CreatedTaskExecutorsProps extends HTMLAttributes<HTMLDivElement> {
  taskId: number;
}

export const CreatedTaskExecutions: FC<CreatedTaskExecutorsProps> = ({
  taskId,
  ...otherProps
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { taskAccountTasks } = useTaskAccountTasks({ taskId });

  const [approveAccountTask, { loading: approving }] = useApproveAccountTask(taskId);

  const handleApprove = (approved: boolean) => {
    approveAccountTask({
      variables: {
        accountTaskId: taskId,
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
          <Box className={c.executor} key={executor.accountTaskId}>
            <a
              className={c.avatar}
              href={`https://www.instagram.com/${executor.username}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Avatar src={executor.profilePic} />
            </a>

            <Box className={c.middle}>
              <a
                href={`https://www.instagram.com/${executor.username}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Typography>{executor.username}</Typography>
              </a>

              {executor.status === 'completed' && (
                <>
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
                </>
              )}

              {executor.status === 'expired' && (
                <Typography color='textSecondary'>-</Typography>
              )}
            </Box>

            {executor.status === 'waiting' && (
              <Box className={c.approvingButtons}>
                <Button
                  variant='contained'
                  color='secondary'
                  fullWidth
                  size='small'
                  onClick={() => handleApprove(false)}
                  disabled={approving}
                >
                  Reject
                </Button>
                <Box ml={1} />
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={() => handleApprove(true)}
                  disabled={approving}
                  size='small'
                >
                  Approve
                </Button>
              </Box>
            )}

            {executor.status !== 'waiting' && (
              <Box className={c.rightSide}>
                <AccountTaskStatus
                  className={c.status}
                  status={executor.status}
                  taskCompletedAt={executor.completedAt}
                />
                {executor.status === 'completed' && (
                  <Box ml={1.5}>
                    <ExecutorMenu executor={executor} />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Typography className={c.noExecutorsHint}>No executors</Typography>
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
      display: 'flex',
      padding: t.spacing(1.25, 0),
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid ' + t.palette.divider,
    },
    avatar: {
      margin: t.spacing(0.5, 1.25, 0, 0),
    },
    middle: {
      alignSelf: 'center',
      overflowY: 'scroll',
    },
    commentText: {
      fontSize: 15,
      color: t.palette.text.secondary,
    },
    storyImage: {
      display: 'block',
      marginTop: t.spacing(0.5),
      borderRadius: t.shape.borderRadius * 3,
      width: '100%',
    },
    approvingButtons: {
      maxWidth: 180,
      flex: 1,
      marginLeft: 'auto',
      paddingLeft: t.spacing(1),
      display: 'flex',
      alignItems: 'center',
    },
    rightSide: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: t.spacing(1.25),
      right: 0,
      background: t.palette.background.paper,
    },
    status: {
      fontSize: t.typography.body2.fontSize,
      paddingLeft: t.spacing(1),
      marginLeft: t.spacing(1),
    },
    noExecutorsHint: {
      color: t.palette.text.hint,
    },
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
        aria-controls={`executor-${executor.accountTaskId}-menu`}
        aria-haspopup='true'
        onClick={handleOpen}
        title=''
      >
        <EllipsisIcon />
      </IconButton>

      <Menu
        id={`executor-${executor.accountTaskId}-menu`}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRateClick}>
          <Typography>
            {executor.rating ? t('See rating') : t('Rate execution')}
          </Typography>
        </MenuItem>
      </Menu>

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
        accountTaskId: execution.accountTaskId,
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
          <InputLabel id={`execution-${execution.accountTaskId}-feedback`}>
            {t('Feedback')}
          </InputLabel>
          <Select
            labelId={`execution-${execution.accountTaskId}-feedback`}
            name={`execution-${execution.accountTaskId}-feedback`}
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
