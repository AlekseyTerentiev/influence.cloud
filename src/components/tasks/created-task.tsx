import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useMe } from 'gql/user';
import { useTaskAccountTasks, useRateAccountTask } from 'gql/tasks';
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
} from '@material-ui/core';
import { Modal } from 'components/modal';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { PostDescription } from 'components/post-description';
import { Currency } from 'components/billing/currency';
import AntdIcon from '@ant-design/icons-react';
import { EllipsisOutline as EllipsisIcon } from '@ant-design/icons';

export interface CreatedTaskProps extends RouteComponentProps {
  taskId?: string;
  onClose: () => void;
}

export const CreatedTask: FC<CreatedTaskProps> = ({ taskId = '', onClose }) => {
  const c = useStyles();

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];
  const task = createdTasks?.find((task) => task.id === Number(taskId));
  const { taskAccountTasks } = useTaskAccountTasks({ taskId: Number(taskId) });
  const [rateAccountTask] = useRateAccountTask();

  const [openTaskRateAlert, setOpenTaskRateAlert] = useState(false);

  const [
    accountTaskMenuBtnEl,
    setTaskAccountMenuBtnEl,
  ] = useState<null | HTMLElement>(null);
  const handleTaskAccountMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setTaskAccountMenuBtnEl(event.currentTarget);
  };
  const handleTaskAccountMenuClose = () => {
    setTaskAccountMenuBtnEl(null);
  };
  const handleAccountTaskRate = async (accountTaskId: number, rating: number) => {
    handleTaskAccountMenuClose();
    await rateAccountTask({
      variables: { taskId: Number(taskId), accountTaskId, rating },
    });
    setOpenTaskRateAlert(true);
  };

  return (
    <Modal open={true} maxWidth='sm' onClose={onClose}>
      {!taskId ? (
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

          <Box mt={2.5} display='flex' justifyContent='space-between'>
            <Box>
              <Typography variant='h6'>
                <Currency value={Math.round(task.currentBudget)} /> /{' '}
                <Currency value={task.totalBudget} sign={false} />
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Чай {task.bonusRate}%
              </Typography>
            </Box>

            <Box mt={0.5}>
              <Typography variant='body2' gutterBottom>
                {task.taskType?.name} #{task.id}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {new Date(task.expiredAt) > new Date()
                  ? `До ${new Date(task.expiredAt).toLocaleDateString()}`
                  : 'Завершен'}
              </Typography>
            </Box>
          </Box>

          <Box mt={1.5}>
            <Typography variant='subtitle2'>Описание задания:</Typography>
            <Typography variant='body2' color='textSecondary'>
              {task.taskType?.description}
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

          <Box mt={2} display='flex'>
            {/* <Button color='secondary' variant='contained' fullWidth disabled>
              Отменить
            </Button> */}
            <Button color='default' variant='outlined' fullWidth onClick={onClose}>
              Закрыть
            </Button>
            <Button
              href={task.instagramCommentTask?.postUrl || ''}
              target='_blank'
              color='primary'
              style={{ marginLeft: 8 }}
              variant='contained'
              fullWidth
            >
              Открыть пост
            </Button>
          </Box>

          {taskAccountTasks && taskAccountTasks.length > 0 && (
            <Box mt={3}>
              <Box
                mb={0.75}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography variant='subtitle2'>Исполнители</Typography>
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
                          ? new Date(task.completedAt).toLocaleTimeString()
                          : task.status === 'inProgress'
                          ? 'In progress'
                          : task.status}
                      </Box>

                      <IconButton
                        edge='end'
                        size='small'
                        aria-controls='task-account-menu'
                        aria-haspopup='true'
                        onClick={handleTaskAccountMenuClick}
                      >
                        <AntdIcon type={EllipsisIcon} />
                      </IconButton>
                      <Menu
                        id='task-account-menu'
                        anchorEl={accountTaskMenuBtnEl}
                        keepMounted
                        open={Boolean(accountTaskMenuBtnEl)}
                        onClose={handleTaskAccountMenuClose}
                      >
                        <MenuItem
                          onClick={() =>
                            handleAccountTaskRate(task.accountTaskId, 1)
                          }
                        >
                          <Typography variant='body2'>Пожаловаться</Typography>
                        </MenuItem>
                      </Menu>
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openTaskRateAlert}
        autoHideDuration={2000}
        onClose={() => setOpenTaskRateAlert(false)}
      >
        <SnackbarContent className={c.taskRateAlert} message='Ваша оценка принята' />
      </Snackbar>
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
    taskRateAlert: {
      background: theme.palette.info.dark,
    },
  }),
);
