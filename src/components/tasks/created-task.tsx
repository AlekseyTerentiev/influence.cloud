import React, { FC, useState, MouseEvent, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { useMe } from 'gql/user';
import { useCancelTask, useTaskAccountTasks, useRateAccountTask } from 'gql/tasks';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  SnackbarContent,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from '@material-ui/core';
import { Modal } from 'components/modal';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { PostDescription } from 'components/post-description';
import { Currency } from 'components/billing/currency';
import AntdIcon from '@ant-design/icons-react';
import { EllipsisOutline as EllipsisIcon } from '@ant-design/icons';
import { AccountTaskRating, FeedBackType } from 'gql/types/globalTypes';

export interface CreatedTaskProps extends RouteComponentProps {
  taskId?: string;
  onClose: () => void;
}

export const CreatedTask: FC<CreatedTaskProps> = ({ taskId = '', onClose }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];
  const task = createdTasks?.find((task) => task.id === Number(taskId));
  const { taskAccountTasks } = useTaskAccountTasks({ taskId: Number(taskId) });
  const [
    cancelTask,
    { loading: cancelProcessing, error: cancelError },
  ] = useCancelTask();

  const [cancelTaskDialogOpen, setCancelTaskDialogOpen] = useState(false);
  const handleCancelTaskClick = () => {
    setCancelTaskDialogOpen(true);
  };
  const handleCancelTaskDialogClose = () => {
    setCancelTaskDialogOpen(false);
  };
  const handleCancelTaskSubmit = () => {
    cancelTask({ variables: { taskId: Number(taskId) } });
    handleCancelTaskDialogClose();
  };

  return (
    <Modal open={true} maxWidth='sm' onClose={onClose}>
      {!taskId ? (
        <Error name='Bad request' />
      ) : loading ? (
        <Loading />
      ) : error ? (
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
                <Currency value={Math.round(task.currentBudget)} /> /{' '}
                <Currency value={task.totalBudget} sign={false} />
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {t('Tip')} {task.bonusRate}%
              </Typography>
            </Box>

            <Box mt={0.5}>
              <Typography variant='body2' gutterBottom>
                {t(task.taskType?.name || '')} #{task.id}
              </Typography>
              <Typography variant='body2'>
                <Box
                  display='inline'
                  color={
                    task.status === 'completed'
                      ? 'success.main'
                      : task.status === 'expired' || task.status === 'canceled'
                      ? 'error.main'
                      : task.status === 'inProgress'
                      ? 'text.secondary'
                      : 'info.main'
                  }
                >
                  {task.status === 'inProgress'
                    ? `${t('Until')} ${new Date(
                        task.expiredAt,
                      ).toLocaleDateString()}`
                    : t(task.status)}
                </Box>
              </Typography>
            </Box>
          </Box>

          <Box mt={1.5}>
            <Typography variant='subtitle2'>{t('Task description')}:</Typography>
            <Typography variant='body2' color='textSecondary'>
              {t(task.taskType?.description || '')}
            </Typography>
          </Box>

          {task.description && (
            <Box mt={1.5}>
              <Typography variant='subtitle2'>{t('Additional wishes')}:</Typography>
              <Typography variant='body2' color='textSecondary'>
                {task.description}
              </Typography>
            </Box>
          )}

          {cancelError && <Error error={cancelError} />}

          <Box mt={2} display='flex'>
            <Button
              href={task.instagramCommentTask?.postUrl || ''}
              target='_blank'
              variant='outlined'
              fullWidth={task.status === 'inProgress'}
              size='small'
            >
              {t('Open post')}
            </Button>
            {task.status === 'inProgress' && (
              <>
                <Button
                  color='secondary'
                  variant='contained'
                  fullWidth
                  onClick={handleCancelTaskClick}
                  style={{ marginLeft: 8 }}
                  size='small'
                >
                  {t('Cancel task')}
                </Button>
                <Modal
                  open={cancelTaskDialogOpen}
                  onClose={handleCancelTaskDialogClose}
                  fullWidthOnMobile={false}
                >
                  <Typography variant='h5' gutterBottom>
                    {t('Remove the task from publication')}?
                  </Typography>
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={handleCancelTaskSubmit}
                    disabled={cancelProcessing}
                    style={{ margin: 'auto' }}
                  >
                    {t('Remove from publication')}
                  </Button>
                </Modal>
              </>
            )}
          </Box>

          {taskAccountTasks && taskAccountTasks.length > 0 && (
            <Box mt={3}>
              <Box
                mb={0.75}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography variant='subtitle2'>{t('Performers')}</Typography>
                <Box color='text.hint' fontWeight='fontWeightBold'>
                  {taskAccountTasks.length}
                </Box>
              </Box>

              {taskAccountTasks.map((task) => (
                <Box className={c.accountTask}>
                  <Avatar src={task.profilePic} style={{ margin: '6px 10px 0 0' }} />
                  <Box flex={1}>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='space-between'
                      style={{ marginBottom: 2 }}
                    >
                      <Typography variant='subtitle2'>{task.username}</Typography>
                      <Box
                        display='inline'
                        color={
                          task.status === 'completed'
                            ? 'success.main'
                            : task.status === 'expired'
                            ? 'error.main'
                            : 'info.main'
                        }
                      >
                        {task.status === 'completed'
                          ? new Date(task.completedAt).toLocaleString()
                          : t(task.status)}
                      </Box>

                      <AccountTaskMenu accountTaskId={task.accountTaskId} />
                    </Box>

                    <Typography variant='body2' color='textSecondary'>
                      {task.commentText || '-'}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Modal>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accountTask: {
      padding: theme.spacing(1.25, 0),
      borderTop: '1px solid ' + theme.palette.divider,
      display: 'flex',
    },
  }),
);

export interface AccountTaskMenuProps {
  accountTaskId: number;
}

export const AccountTaskMenu: FC<AccountTaskMenuProps> = ({ accountTaskId }) => {
  const c = useTaskAccountMenuStyles();
  const { t } = useTranslation();

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const [openRateModal, setOpenRateModal] = useState(false);
  const [rating, setRating] = useState<AccountTaskRating>(AccountTaskRating.good);
  const [feedback, setFeedback] = useState<FeedBackType>(FeedBackType.wellDone);
  const [openRateSuccessAlert, setOpenRateSuccessAlert] = useState(false);
  const [
    rateAccountTask,
    { loading: rateProcessing, error: rateError },
  ] = useRateAccountTask();

  const handleRateClick = async () => {
    handleMenuClose();
    setOpenRateModal(true);
  };

  const handleRatingChange = (e: ChangeEvent<{ value: unknown }>) => {
    setRating(e.target.value as AccountTaskRating);
  };

  const handleFeedbackChange = (e: ChangeEvent<{ value: unknown }>) => {
    setFeedback(e.target.value as FeedBackType);
  };

  const handleRateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await rateAccountTask({
      variables: { accountTaskId, rating, feedback },
    });
    setOpenRateSuccessAlert(true);
    setOpenRateModal(false);
  };

  return (
    <>
      <IconButton
        edge='end'
        size='small'
        aria-controls='account-taks-menu'
        aria-haspopup='true'
        onClick={handleMenuOpen}
      >
        <AntdIcon type={EllipsisIcon} />
      </IconButton>
      <Menu
        id='account-taks-menu'
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRateClick}>
          <Typography>{t('Rate')}</Typography>
        </MenuItem>
      </Menu>

      <Modal
        open={openRateModal}
        onClose={() => setOpenRateModal(false)}
        fullWidthOnMobile={false}
      >
        <form onSubmit={handleRateSubmit}>
          <Typography align='center' variant='h6' gutterBottom>
            {t('Rating')}
          </Typography>

          <FormControl fullWidth variant='outlined'>
            <InputLabel id='account-task-rating'>{t('Rating')}</InputLabel>
            <Select
              labelId='account-task-rating'
              name='account-task-rating'
              value={rating}
              onChange={handleRatingChange}
              style={{ textTransform: 'capitalize' }}
            >
              {Object.keys(AccountTaskRating).map((rating) => (
                <MenuItem
                  key={rating}
                  value={rating}
                  style={{ textTransform: 'capitalize' }}
                >
                  {t(rating)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={1.5} />

          <FormControl fullWidth variant='outlined'>
            <InputLabel id='account-task-feedback'>{t('Feedback')}</InputLabel>
            <Select
              labelId='account-task-feedback'
              name='account-task-feedback'
              value={feedback}
              onChange={handleFeedbackChange}
              style={{ textTransform: 'capitalize' }}
            >
              {Object.keys(FeedBackType).map((feedback) => (
                <MenuItem
                  key={feedback}
                  value={feedback}
                  style={{ textTransform: 'capitalize' }}
                >
                  {t(feedback)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {rateError && <Error error={rateError} />}

          <Box mt={1.5} />

          <Button
            type='submit'
            color='primary'
            variant='contained'
            size='large'
            fullWidth
            disabled={rateProcessing}
          >
            {rateProcessing ? (
              <CircularProgress style={{ width: 24, height: 24 }} />
            ) : (
              t('Submit')
            )}
          </Button>
        </form>
      </Modal>

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
          className={c.successRateAlert}
          message={t('Your review has been accepted!')}
        />
      </Snackbar>
    </>
  );
};

export const useTaskAccountMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    successRateAlert: {
      background: theme.palette.success.main,
    },
  }),
);
