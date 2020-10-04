import React, {
  FC,
  HTMLAttributes,
  useState,
  MouseEvent,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { GetTaskAccountTasks_allTaskAccountTasks } from 'gql/types/GetTaskAccountTasks';
import { AccountTaskRating, FeedBackType } from 'gql/types/globalTypes';
import { useRateAccountTask, useTaskAccountTasks } from 'gql/created-tasks';
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

  return (
    <Box {...otherProps}>
      <Box className={c.header}>
        <Typography className={c.title}>{t('executions')}</Typography>
        <Typography className={c.executionsCount}>
          {taskAccountTasks?.length || ''}
        </Typography>
      </Box>

      {taskAccountTasks && taskAccountTasks.length > 0 ? (
        taskAccountTasks.map((execution) => (
          <Box className={c.execution} key={execution.accountTaskId}>
            <Avatar className={c.avatar} src={execution.profilePic} />
            <Box>
              <Typography className={c.username}>{execution.username}</Typography>
              <Typography className={c.commentText}>
                {execution.commentText || '-'}
              </Typography>
            </Box>
            <Box className={c.rightSide}>
              <AccountTaskStatus
                className={c.status}
                status={execution.status}
                taskCompletedAt={execution.completedAt}
              />
              <ExecutionMenu execution={execution} />
            </Box>
          </Box>
        ))
      ) : (
        <Typography className={c.noExecutionsHint}>No executions yet</Typography>
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
    executionsCount: {
      color: t.palette.text.hint,
      fontWeight: t.typography.fontWeightBold,
    },
    execution: {
      display: 'flex',
      padding: t.spacing(1.25, 0),
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid ' + t.palette.divider,
      // '&:last-child': {
      //   borderBottom: '1px solid ' + t.palette.divider,
      // },
    },
    avatar: {
      margin: t.spacing(0.75, 1.25, 0, 0),
    },
    username: {},
    commentText: {
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
    },
    rightSide: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: t.spacing(1),
      right: 0,
      background: t.palette.background.paper,
    },
    status: {
      fontSize: t.typography.body2.fontSize,
      padding: t.spacing(0, 1),
      margin: t.spacing(0, 1),
    },
    noExecutionsHint: {
      color: t.palette.text.hint,
    },
  }),
);

/** EXECUTION MENU **/

export interface ExecutionMenuProps {
  execution: GetTaskAccountTasks_allTaskAccountTasks;
}

export const ExecutionMenu: FC<ExecutionMenuProps> = ({ execution }) => {
  const c = useExecutionMenuStyles();
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
        aria-controls={`execution-${execution.accountTaskId}-menu`}
        aria-haspopup='true'
        onClick={handleOpen}
        title=''
      >
        <EllipsisIcon />
      </IconButton>

      <Menu
        id={`execution-${execution.accountTaskId}-menu`}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRateClick}>
          <Typography>
            {execution.rating ? t('See rating') : t('Rate execution')}
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
          <ExecutionRate execution={execution} onRate={handleRate} />
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

export const useExecutionMenuStyles = makeStyles((t: Theme) =>
  createStyles({
    successAlert: {
      background: t.palette.success.main,
    },
  }),
);

/** EXECUTION RATE **/

export interface ExecutionRateProps {
  execution: GetTaskAccountTasks_allTaskAccountTasks;
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
